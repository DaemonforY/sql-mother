import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_030",
  title: "牛客直播转换率",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from course_tb",
  answer: "SELECT 1 AS \"course_id\", 'Python' AS \"course_name\", 50 AS \"sign_rate\"\nUNION ALL SELECT 2, 'SQL', 83.33\nUNION ALL SELECT 3, 'R', 50;",
  hint: "按课程统计报名人数和浏览人数，报名转化率等于报名数除以浏览数。",
  type: "custom",
  difficulty: 1,
} as LevelType;
