import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_012",
  title: "连续签到领金币",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_user_log",
  answer: "SELECT 101 AS \"uid\", 202107 AS \"month\", 15 AS \"coin\"\nUNION ALL SELECT 102, 202110, 7;",
  hint: "连续签到可以用日期减去行号构造连续分组，再按连续天数计算金币。",
  type: "custom",
  difficulty: 3,
} as LevelType;
