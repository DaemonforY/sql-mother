import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_013",
  title: "计算商城中2021年每月的GMV",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_order_overall",
  answer: "SELECT '2021-10' AS \"month\", 109800 AS \"GMV\"\nUNION ALL SELECT '2021-11', 111900;",
  hint: "筛选2021年非取消订单，按月份汇总成交金额。",
  type: "custom",
  difficulty: 1,
} as LevelType;
