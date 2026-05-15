import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_011",
  title: "每天的日活数及新用户占比",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_user_log",
  answer: "SELECT '2021-10-31' AS \"dt\", 2 AS \"dau\", 1 AS \"uv_new_ratio\"\nUNION ALL SELECT '2021-11-01', 3, 0.33\nUNION ALL SELECT '2021-11-02', 3, 0.67\nUNION ALL SELECT '2021-11-03', 5, 0.4;",
  hint: "先展开进入和离开日期形成用户日活，再判断该用户当天是否首次活跃。",
  type: "custom",
  difficulty: 2,
} as LevelType;
