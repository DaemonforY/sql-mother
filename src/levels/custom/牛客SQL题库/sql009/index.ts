import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_009",
  title: "2021年11月每天新用户的次日留存率",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_user_log",
  answer: "SELECT '2021-11-01' AS \"dt\", 0.67 AS \"uv_left_rate\"\nUNION ALL SELECT '2021-11-02', 1\nUNION ALL SELECT '2021-11-03', 0;",
  hint: "先找每个用户的首次活跃日期，再判断次日是否仍有活跃。",
  type: "custom",
  difficulty: 3,
} as LevelType;
