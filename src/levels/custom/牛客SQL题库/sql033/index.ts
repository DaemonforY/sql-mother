import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_033",
  title: "牛客直播各科目出勤率",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from course_tb",
  answer: "SELECT 1 AS \"course_id\", 'Python' AS \"course_name\", 75 AS \"attend_rate\"\nUNION ALL SELECT 2, 'SQL', 60\nUNION ALL SELECT 3, 'R', 66.67;",
  hint: "先统计报名人数，再判断每个用户是否达到有效出勤时长。",
  type: "custom",
  difficulty: 3,
} as LevelType;
