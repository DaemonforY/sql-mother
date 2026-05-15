import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_016",
  title: "零食类商品中复购率top3高的商品",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_order_overall",
  answer: "SELECT 8001 AS \"product_id\", 1 AS \"repurchase_rate\"\nUNION ALL SELECT 8002, 0.5\nUNION ALL SELECT 8003, 0.333;",
  hint: "先按用户和商品统计购买次数，再计算购买两次及以上用户占比。",
  type: "custom",
  difficulty: 3,
} as LevelType;
