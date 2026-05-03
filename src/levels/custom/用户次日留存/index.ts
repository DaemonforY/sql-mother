import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "interview_next_day_retention",
  title: "用户次日留存",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from app_user_action",
  answer:
    "SELECT\n" +
    "    f.first_date AS dt,\n" +
    "    COUNT(*) AS new_users,\n" +
    "    COUNT(a.user_id) AS retained_users,\n" +
    "    ROUND(COUNT(a.user_id) * 100.0 / COUNT(*), 2) AS retention_rate\n" +
    "FROM (\n" +
    "    SELECT user_id, MIN(action_date) AS first_date\n" +
    "    FROM app_user_action\n" +
    "    GROUP BY user_id\n" +
    ") f\n" +
    "LEFT JOIN app_user_action a\n" +
    "    ON f.user_id = a.user_id\n" +
    "    AND a.action_date = DATE(f.first_date, '+1 day')\n" +
    "GROUP BY f.first_date\n" +
    "ORDER BY f.first_date ASC;",
  hint: "先找首日新增用户，再LEFT JOIN次日活跃记录，使用COUNT统计留存人数",
  type: "custom",
  difficulty: 3,
} as LevelType;
