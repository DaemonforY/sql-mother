<template>
  <div id="niukeLevelsPage">
    <div class="page-header">
      <div>
        <h1 class="page-title">牛客 SQL 题库</h1>
        <p class="page-description">
          共 {{ niukeSqlLevels.length }} 道题，覆盖视频、电商、打车、直播和问答等 SQL 高频场景。
        </p>
      </div>
      <a-radio-group v-model:value="difficultyFilter" button-style="solid">
        <a-radio-button value="all">全部</a-radio-button>
        <a-radio-button value="1">简单</a-radio-button>
        <a-radio-button value="2">中等</a-radio-button>
        <a-radio-button value="3">困难</a-radio-button>
      </a-radio-group>
    </div>

    <div class="level-grid">
      <div
        v-for="(level, index) in filteredLevels"
        :key="level.key"
        class="level-card"
        @click="goToLevel(level.key)"
      >
        <div class="level-number">{{ getLevelNumber(level, index) }}</div>
        <div class="level-content">
          <h3 class="level-title">{{ level.title }}</h3>
          <div class="level-meta">
            <a-tag color="green" size="small">牛客</a-tag>
            <span class="level-difficulty">{{ getDifficultyText(level.difficulty) }}</span>
          </div>
        </div>
        <a-button type="primary" size="small">挑战</a-button>
      </div>
    </div>

    <a-empty
      v-if="filteredLevels.length === 0"
      description="当前难度下暂无题目"
      class="empty-state"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import niukeSqlLevels from "../levels/custom/牛客SQL题库";

const router = useRouter();
const difficultyFilter = ref("all");

const filteredLevels = computed(() => {
  if (difficultyFilter.value === "all") {
    return niukeSqlLevels;
  }
  const difficulty = Number(difficultyFilter.value);
  return niukeSqlLevels.filter((level) => level.difficulty === difficulty);
});

const goToLevel = (levelKey: string) => {
  router.push(`/learn/${levelKey}`);
};

const getLevelNumber = (level: LevelType, index: number) => {
  if (difficultyFilter.value !== "all") {
    return index + 1;
  }
  const levelIndex = niukeSqlLevels.findIndex((item) => item.key === level.key);
  return levelIndex + 1;
};

const getDifficultyText = (difficulty?: number) => {
  switch (difficulty) {
    case 1:
      return "简单";
    case 2:
      return "中等";
    case 3:
      return "困难";
    default:
      return "中等";
  }
};
</script>

<style scoped>
#niukeLevelsPage {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #1f2937;
}

.page-description {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.level-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.level-card {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.level-card:hover {
  border-color: #16a34a;
  box-shadow: 0 4px 8px rgba(22, 163, 74, 0.12);
  transform: translateY(-1px);
}

.level-number {
  width: 36px;
  height: 36px;
  background: #16a34a;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  margin-right: 12px;
  flex-shrink: 0;
}

.level-content {
  flex: 1;
  min-width: 0;
}

.level-title {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 6px;
  color: #1f2937;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.level-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.level-difficulty {
  font-size: 12px;
  color: #6b7280;
}

.empty-state {
  margin-top: 48px;
}

@media (max-width: 900px) {
  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .level-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  #niukeLevelsPage {
    padding: 0 12px;
  }

  .page-title {
    font-size: 24px;
  }

  .level-card {
    padding: 10px 12px;
  }

  .level-number {
    width: 30px;
    height: 30px;
    font-size: 12px;
    margin-right: 10px;
  }

  .level-title {
    font-size: 14px;
  }
}
</style>
