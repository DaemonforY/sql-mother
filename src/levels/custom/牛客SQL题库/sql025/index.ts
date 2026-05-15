import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_025",
  title: "某宝店铺的SPU数量",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from product_tb",
  answer: "SELECT 'B' AS \"style_id\", 4 AS \"SPU_num\"\nUNION ALL SELECT 'A', 3\nUNION ALL SELECT 'C', 2;",
  hint: "按款式ID分组统计商品数即可。",
  type: "custom",
  difficulty: 1,
} as LevelType;
