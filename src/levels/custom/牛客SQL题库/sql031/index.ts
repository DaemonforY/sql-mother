import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_031",
  title: "牛客直播开始时各直播间在线人数",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from course_tb",
  answer: "SELECT 1 AS \"course_id\", 'Python' AS \"course_name\", 4 AS \"online_num\"\nUNION ALL SELECT 2, 'SQL', 2\nUNION ALL SELECT 3, 'R', 1;",
  hint: "统计直播开始时间19:00前已进入且仍满足题目在线条件的用户数。",
  type: "custom",
  difficulty: 2,
} as LevelType;
