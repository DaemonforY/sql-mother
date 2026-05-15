import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_037",
  title: "某乎问答单日回答问题数大于等于3个的所有用户",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from answer_tb",
  answer: "SELECT '2021-11-02' AS \"answer_date\", 110 AS \"author_id\", 3 AS \"answer_cnt\";",
  hint: "筛选11月回答记录，按日期和答主分组，保留回答数不少于3的记录。",
  type: "custom",
  difficulty: 1,
} as LevelType;
