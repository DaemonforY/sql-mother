import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "interview_silent_user_recall",
  title: "用户沉默召回",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from user_active_log",
  answer:
    "SELECT\n" +
    "    user_id,\n" +
    "    last_active_date,\n" +
    "    CAST(JULIANDAY('2024-08-01') - JULIANDAY(last_active_date) AS INT) AS silent_days\n" +
    "FROM (\n" +
    "    SELECT user_id, MAX(active_date) AS last_active_date\n" +
    "    FROM user_active_log\n" +
    "    GROUP BY user_id\n" +
    ") t\n" +
    "WHERE JULIANDAY('2024-08-01') - JULIANDAY(last_active_date) >= 7\n" +
    "ORDER BY silent_days DESC, user_id ASC;",
  hint: "先求每个用户最后活跃日期，再用julianday计算和统计日期的间隔天数",
  type: "custom",
  difficulty: 2,
} as LevelType;
