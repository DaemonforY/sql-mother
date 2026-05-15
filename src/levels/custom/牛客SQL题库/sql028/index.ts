import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_028",
  title: "某宝店铺动销率与售罄率",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from product_tb",
  answer: "SELECT 'A' AS \"style_id\", 8.33 AS \"pin_rate(%)\", 7.79 AS \"sell-through_rate(%)\"\nUNION ALL SELECT 'B', 14.81, 11.94\nUNION ALL SELECT 'C', 10.26, 8.75;",
  hint: "按款式汇总销量、库存和吊牌金额，分别计算动销率和售罄率。",
  type: "custom",
  difficulty: 2,
} as LevelType;
