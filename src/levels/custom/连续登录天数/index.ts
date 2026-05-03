import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "interview_continue_login_days",
  title: "连续登录天数",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from user_login_log",
  answer:
    "SELECT\n" +
    "    user_id,\n" +
    "    MAX(continue_days) AS max_continue_days\n" +
    "FROM (\n" +
    "    SELECT\n" +
    "        user_id,\n" +
    "        COUNT(*) AS continue_days\n" +
    "    FROM (\n" +
    "        SELECT\n" +
    "            user_id,\n" +
    "            login_date,\n" +
    "            DATE(login_date, '-' || ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) || ' day') AS group_key\n" +
    "        FROM user_login_log\n" +
    "    ) t\n" +
    "    GROUP BY user_id, group_key\n" +
    ") s\n" +
    "GROUP BY user_id\n" +
    "ORDER BY max_continue_days DESC, user_id ASC;",
  hint: "使用ROW_NUMBER按用户排序，用登录日期减去序号构造连续登录分组，再统计每组天数",
  type: "custom",
  difficulty: 3,
} as LevelType;
