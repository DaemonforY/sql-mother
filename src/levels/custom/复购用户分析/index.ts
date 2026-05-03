import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "interview_repurchase_user_analysis",
  title: "复购用户分析",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from user_orders",
  answer:
    "SELECT\n" +
    "    COUNT(*) AS total_users,\n" +
    "    SUM(CASE WHEN order_count >= 2 THEN 1 ELSE 0 END) AS repurchase_users,\n" +
    "    ROUND(SUM(CASE WHEN order_count >= 2 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS repurchase_rate\n" +
    "FROM (\n" +
    "    SELECT user_id, COUNT(*) AS order_count\n" +
    "    FROM user_orders\n" +
    "    GROUP BY user_id\n" +
    ") t;",
  hint: "先按用户聚合订单数，再统计订单数大于等于2的用户占比",
  type: "custom",
  difficulty: 2,
} as LevelType;
