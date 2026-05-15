import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_010",
  title: "统计活跃间隔对用户分级结果",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_user_log",
  answer: "SELECT '忠实用户' AS \"user_grade\", 0.43 AS \"ratio\"\nUNION ALL SELECT '新晋用户', 0.29\nUNION ALL SELECT '沉睡用户', 0.14\nUNION ALL SELECT '流失用户', 0.14;",
  hint: "以日志中的最大日期作为当前日期，比较每个用户最近活跃和首次活跃的间隔。",
  type: "custom",
  difficulty: 3,
} as LevelType;
