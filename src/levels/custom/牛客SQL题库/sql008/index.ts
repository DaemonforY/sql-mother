import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_008",
  title: "每篇文章同一时刻最大在看人数",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_user_log",
  answer: "SELECT 9001 AS \"artical_id\", 3 AS \"max_uv\"\nUNION ALL SELECT 9002, 2;",
  hint: "把进入时间记为+1、离开时间记为-1，再按文章和时间做累计在线人数。",
  type: "custom",
  difficulty: 3,
} as LevelType;
