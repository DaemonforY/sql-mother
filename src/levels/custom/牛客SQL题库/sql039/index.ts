import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_039",
  title: "某乎问答最大连续回答问题天数大于等于3天的用户及其对应等级",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from author_tb",
  answer: "SELECT 101 AS \"author_id\", 6 AS \"author_level\", 3 AS \"days_cnt\";",
  hint: "对每个答主的回答日期去重排序，用日期减排名识别连续回答区间。",
  type: "custom",
  difficulty: 3,
} as LevelType;
