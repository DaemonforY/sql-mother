import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_029",
  title: "某宝店铺连续2天及以上购物的用户及其对应的天数",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from sales_tb",
  answer: "SELECT 10 AS \"user_id\", 2 AS \"days_count\";",
  hint: "先对用户购买日期去重，再用日期减行号识别连续购买区间。",
  type: "custom",
  difficulty: 3,
} as LevelType;
