<template>
  <div id="codexStatusPage">
    <div class="status-shell">
      <div v-if="loading" class="loading">加载中...</div>

      <div v-else-if="errorMsg" class="error-box">
        <div>请求失败：{{ errorMsg }}</div>
        <div class="error-tip">
          纯前端页面会直接请求远端接口，如果浏览器拦截跨域请求，需要接口侧允许 CORS。
        </div>
        <button class="refresh-btn" @click="loadData">重试</button>
      </div>

      <template v-else-if="statusData">
        <div class="status-card">
          <div class="header-row">
            <div>
              <div class="title">Codex 使用情况</div>
              <div class="subtitle">{{ snapshot.email || statusData.email || "—" }}</div>
            </div>
            <div class="header-right">
              <span class="badge badge-info">{{ planType }} 套餐</span>
              <div class="time">当前时间 {{ parseNow(statusData.now) }}</div>
            </div>
          </div>

          <div class="metric-row">
            <div class="metric">
              <div class="label">运行状态</div>
              <div class="value">
                <span class="status-dot" :class="statusData.running ? 'dot-running' : 'dot-stopped'"></span>
                {{ statusData.running ? "运行中" : "已停止" }}
              </div>
            </div>
            <div class="metric">
              <div class="label">上次运行</div>
              <div class="value small-value">{{ utcToBeijing(statusData.last_run_at) }}</div>
            </div>
            <div class="metric">
              <div class="label">下次运行</div>
              <div class="value small-value next-value">{{ utcToBeijing(statusData.next_run_at) }}</div>
            </div>
          </div>
        </div>

        <UsageCard
          title="主要额度"
          :window-minutes="snapshot.primary_window_minutes"
          :used-percent="snapshot.primary_used_percent"
          :remaining-percent="snapshot.primary_remaining_percent"
          :reset-after-minutes="snapshot.primary_reset_after_minutes"
          :reset-at="snapshot.primary_reset_at"
          :utc-to-beijing="utcToBeijing"
          :bar-color="barColor"
        />

        <UsageCard
          title="次要额度"
          suffix="7天"
          :window-minutes="snapshot.secondary_window_minutes"
          :used-percent="snapshot.secondary_used_percent"
          :remaining-percent="snapshot.secondary_remaining_percent"
          :reset-after-minutes="snapshot.secondary_reset_after_minutes"
          :reset-at="snapshot.secondary_reset_at"
          :utc-to-beijing="utcToBeijing"
          :bar-color="barColor"
        />

        <div class="status-card">
          <div class="section-title">时间详情（北京时间）</div>
          <div class="info-row"><span>上次运行</span><strong>{{ utcToBeijing(statusData.last_run_at) }}</strong></div>
          <div class="info-row"><span>下次运行</span><strong>{{ utcToBeijing(statusData.next_run_at) }}</strong></div>
          <div class="info-row"><span>上次成功</span><strong>{{ utcToBeijing(statusData.last_success_at) }}</strong></div>
          <div class="info-row"><span>最后更新</span><strong>{{ utcToBeijing(statusData.last_updated) }}</strong></div>
          <div class="info-row"><span>主要额度重置</span><strong>{{ utcToBeijing(snapshot.primary_reset_at) }}</strong></div>
          <div class="info-row"><span>次要额度重置</span><strong>{{ utcToBeijing(snapshot.secondary_reset_at) }}</strong></div>
        </div>

        <div class="footer-actions">
          <button class="refresh-btn" @click="loadData">刷新数据</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, onMounted, onUnmounted, ref } from "vue";

const API_ENDPOINT = "http://47.82.217.220:18088/api/status";

type Snapshot = {
  email?: string;
  plan_type?: string;
  primary_window_minutes?: number;
  primary_used_percent?: number;
  primary_remaining_percent?: number;
  primary_reset_after_minutes?: number;
  primary_reset_at?: string;
  secondary_window_minutes?: number;
  secondary_used_percent?: number;
  secondary_remaining_percent?: number;
  secondary_reset_after_minutes?: number;
  secondary_reset_at?: string;
};

type StatusData = {
  email?: string;
  running?: boolean;
  now?: string;
  last_run_at?: string;
  next_run_at?: string;
  last_success_at?: string;
  last_updated?: string;
  snapshot?: Snapshot;
};

const UsageCard = defineComponent({
  props: {
    title: { type: String, required: true },
    suffix: { type: String, default: "" },
    windowMinutes: Number,
    usedPercent: Number,
    remainingPercent: Number,
    resetAfterMinutes: Number,
    resetAt: String,
    utcToBeijing: { type: Function, required: true },
    barColor: { type: Function, required: true },
  },
  setup(props) {
    return () => {
      const used = props.usedPercent ?? 0;
      const suffixText = props.suffix ? ` · ${props.suffix}` : "";
      return h("div", { class: "status-card" }, [
        h("div", { class: "section-title" }, `${props.title}（${props.windowMinutes ?? "—"} 分钟窗口${suffixText}）`),
        h("div", { class: "usage-head" }, [
          h("span", `已使用 ${used}%`),
          h("strong", `剩余 ${props.remainingPercent ?? "—"}%`),
        ]),
        h("div", { class: "bar-bg" }, [
          h("div", { class: ["bar-fill", props.barColor(used)], style: { width: `${used}%` } }),
        ]),
        h("div", { class: "usage-foot" }, [
          h("span", `还需 ${props.resetAfterMinutes ?? "—"} 分钟重置`),
          h("span", `重置时间：${props.utcToBeijing(props.resetAt)} 北京`),
        ]),
      ]);
    };
  },
});

const loading = ref(false);
const errorMsg = ref("");
const statusData = ref<StatusData | null>(null);
let timer: number | undefined;

const snapshot = computed(() => statusData.value?.snapshot || {});
const planType = computed(() => (snapshot.value.plan_type || "—").toUpperCase());

const utcToBeijing = (utcStr?: string) => {
  if (!utcStr) return "—";
  const date = new Date(utcStr.replace(" UTC", "Z").replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return utcStr;
  return date
    .toLocaleString("zh-CN", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(/\//g, "-");
};

const parseNow = (nowStr?: string) => {
  if (!nowStr) return "—";
  const date = new Date(nowStr);
  if (Number.isNaN(date.getTime())) return nowStr;
  return date
    .toLocaleString("zh-CN", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/\//g, "-");
};

const barColor = (usedPercent: number) => {
  if (usedPercent >= 90) return "bar-red";
  if (usedPercent >= 60) return "bar-amber";
  return "bar-green";
};

const loadData = async () => {
  loading.value = true;
  errorMsg.value = "";
  try {
    const res = await fetch(API_ENDPOINT, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    statusData.value = await res.json();
  } catch (err: any) {
    errorMsg.value = err?.message || "未知错误";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadData();
  timer = window.setInterval(loadData, 60000);
});

onUnmounted(() => {
  if (timer) {
    window.clearInterval(timer);
  }
});
</script>

<style scoped>
#codexStatusPage {
  min-height: calc(100vh - 180px);
  background: #f5f5f0;
  margin: -24px;
  padding: 32px 16px;
}

.status-shell {
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
}

.status-card,
.metric,
.error-box {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
}

.status-card {
  padding: 16px 20px;
  margin-bottom: 12px;
}

.header-row,
.metric-row,
.usage-head,
.usage-foot,
.info-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.header-row {
  align-items: flex-start;
  margin-bottom: 16px;
}

.title {
  font-size: 16px;
  font-weight: 500;
}

.subtitle,
.time,
.label,
.usage-head,
.usage-foot,
.info-row span {
  color: #666;
}

.subtitle,
.time,
.usage-head,
.usage-foot,
.info-row {
  font-size: 12px;
}

.header-right {
  text-align: right;
}

.badge {
  display: inline-block;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 8px;
  font-weight: 500;
}

.badge-info {
  background: #e6f1fb;
  color: #185fa5;
}

.metric-row {
  margin-bottom: 0;
}

.metric {
  flex: 1;
  background: #f5f5f0;
  padding: 16px;
}

.label {
  font-size: 12px;
  margin-bottom: 4px;
}

.value {
  font-size: 20px;
  font-weight: 500;
}

.small-value {
  font-size: 15px;
}

.next-value {
  color: #185fa5;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}

.dot-running {
  background: #1d9e75;
  box-shadow: 0 0 0 3px rgba(29, 158, 117, 0.2);
}

.dot-stopped {
  background: #aaa;
}

.section-title {
  font-size: 11px;
  font-weight: 500;
  color: #888;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.usage-head {
  align-items: baseline;
  margin-bottom: 4px;
}

.usage-head strong {
  color: #3b6d11;
}

.bar-bg {
  background: #e8e8e4;
  border-radius: 4px;
  height: 8px;
  overflow: hidden;
  margin-top: 6px;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}

.bar-green {
  background: #1d9e75;
}

.bar-amber {
  background: #ef9f27;
}

.bar-red {
  background: #e24b4a;
}

.usage-foot {
  margin-top: 10px;
}

.info-row {
  font-size: 13px;
  padding: 6px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.info-row:last-child {
  border-bottom: none;
}

.info-row strong {
  color: #1a1a1a;
  font-weight: 500;
}

.footer-actions {
  text-align: center;
  padding-top: 4px;
}

.refresh-btn {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
  color: #333;
}

.refresh-btn:hover {
  background: #f0f0eb;
}

.loading {
  text-align: center;
  color: #888;
  font-size: 14px;
  padding: 48px 0;
}

.error-box {
  padding: 20px;
  color: #a32d2d;
  font-size: 14px;
  text-align: center;
}

.error-tip {
  color: #854f0b;
  margin: 10px 0 16px;
}

@media (max-width: 768px) {
  .header-row,
  .metric-row,
  .usage-foot {
    flex-direction: column;
  }

  .header-right {
    text-align: left;
  }
}
</style>
