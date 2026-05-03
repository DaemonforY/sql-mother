# 订单转化漏斗

## 背景故事
你在增长团队负责分析用户从访问、加购到支付的转化漏斗。漏斗统计是大数据和数据分析岗位中非常常见的 SQL 面试题。

## 数据说明
用户行为日志表 `user_event_log` 记录了用户事件：

- `user_id`：用户 ID
- `event_name`：事件名称，包含 `visit`、`cart`、`pay`
- `event_time`：事件时间

## 任务要求
请编写 SQL 查询，统计整体转化漏斗：

1. 统计访问用户数（visit_users）
2. 统计加购用户数（cart_users）
3. 统计支付用户数（pay_users）
4. 计算访问到加购转化率（visit_to_cart_rate），保留 2 位小数，按百分比数值展示
5. 计算加购到支付转化率（cart_to_pay_rate），保留 2 位小数，按百分比数值展示

## 提示
- 使用 `COUNT(DISTINCT CASE WHEN ... THEN user_id END)` 统计各步骤用户数
- 注意转化率的分母
