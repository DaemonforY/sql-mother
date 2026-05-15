import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_034",
  title: "牛客直播各科目同时在线人数",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from course_tb",
  answer: "SELECT 1 AS \"course_id\", 'Python' AS \"course_name\", 4 AS \"max_num\"\nUNION ALL SELECT 2, 'SQL', 4\nUNION ALL SELECT 3, 'R', 3;",
  hint: "把进入和离开直播间作为在线人数变化事件，按课程累计取最大值。",
  type: "custom",
  difficulty: 3,
} as LevelType;
