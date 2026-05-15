import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_014",
  title: "统计2021年10月每个退货率不大于0.5的商品各项指标",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_user_event",
  answer: "SELECT 8001 AS \"product_id\", 0.833 AS \"ctr\", 0.8 AS \"cart_rate\", 0.75 AS \"payment_rate\", 0.333 AS \"refund_rate\"\nUNION ALL SELECT 8002, 1, 1, 1, 0;",
  hint: "按商品统计点击、加购、支付和退款链路指标，注意分母为0时要返回0。",
  type: "custom",
  difficulty: 2,
} as LevelType;
