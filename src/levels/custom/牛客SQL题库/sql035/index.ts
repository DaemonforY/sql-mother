import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_035",
  title: "某乎问答11月份日人均回答量",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from answer_tb",
  answer: "SELECT '2021-11-01' AS \"answer_date\", 1.4 AS \"per_num\"\nUNION ALL SELECT '2021-11-02', 2\nUNION ALL SELECT '2021-11-03', 1\nUNION ALL SELECT '2021-11-04', 2\nUNION ALL SELECT '2021-11-05', 1.25;",
  hint: "按回答日期分组，回答数除以当天去重答主数。",
  type: "custom",
  difficulty: 1,
} as LevelType;
