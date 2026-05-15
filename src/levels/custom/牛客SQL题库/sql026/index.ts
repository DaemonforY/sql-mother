import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_026",
  title: "某宝店铺的实际销售额与客单价",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from sales_tb",
  answer: "SELECT 2725 AS \"sales_total\", 247.73 AS \"per_trans\";",
  hint: "实际销售额为销售价汇总，客单价为销售额除以下单用户数。",
  type: "custom",
  difficulty: 1,
} as LevelType;
