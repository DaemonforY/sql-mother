import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_015",
  title: "某店铺的各商品毛利率及店铺整体毛利率",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_order_overall",
  answer: "SELECT '店铺汇总' AS \"product_id\", '31.0%' AS \"profit_rate\"\nUNION ALL SELECT 8001, '29.4%'\nUNION ALL SELECT 8003, '33.3%';",
  hint: "商品毛利率基于售价和进货价计算，店铺汇总可以用UNION ALL补充。",
  type: "custom",
  difficulty: 2,
} as LevelType;
