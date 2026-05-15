import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_027",
  title: "某宝店铺折扣率",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from product_tb",
  answer: "SELECT 93.97 AS \"discount_rate(%)\";",
  hint: "折扣率等于实际销售额除以吊牌价乘以销量后的总额。",
  type: "custom",
  difficulty: 1,
} as LevelType;
