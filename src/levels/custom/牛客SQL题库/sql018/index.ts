import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_018",
  title: "店铺901国庆期间的7日动销率和滞销率",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_order_overall",
  answer: "SELECT '2021-10-01' AS \"dt\", 0.333 AS \"sale_rate\", 0.667 AS \"unsale_rate\"\nUNION ALL SELECT '2021-10-02', 0.667, 0.333\nUNION ALL SELECT '2021-10-03', 1, 0;",
  hint: "以国庆每天为统计日，计算近7日有销量商品数占店铺商品数的比例。",
  type: "custom",
  difficulty: 3,
} as LevelType;
