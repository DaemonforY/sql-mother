import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_032",
  title: "牛客直播各科目平均观看时长",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from course_tb",
  answer: "SELECT 'SQL' AS \"course_name\", 91.25 AS \"avg_Len\"\nUNION ALL SELECT 'R', 60.33\nUNION ALL SELECT 'Python', 58;",
  hint: "连接课程表和出勤表，按课程计算平均观看分钟数。",
  type: "custom",
  difficulty: 1,
} as LevelType;
