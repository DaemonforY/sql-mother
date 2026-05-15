import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_007",
  title: "2021年11月每天的人均浏览文章时长",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_user_log",
  answer: "SELECT '2021-11-01' AS \"dt\", 33 AS \"avg_view_len_sec\"\nUNION ALL SELECT '2021-11-02', 36.5;",
  hint: "筛选2021年11月的文章浏览记录，按日期统计总浏览时长和去重用户数。",
  type: "custom",
  difficulty: 1,
} as LevelType;
