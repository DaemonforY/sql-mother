import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_022",
  title: "国庆期间近7日日均取消订单量",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_get_car_record",
  answer: "SELECT '2021-10-01' AS \"dt\", 1.43 AS \"finish_num_7d\", 0.14 AS \"cancel_num_7d\"\nUNION ALL SELECT '2021-10-02', 1.57, 0.29\nUNION ALL SELECT '2021-10-03', 1.57, 0.29;",
  hint: "先按天统计完成和取消订单数，再在国庆日期上计算近7日日均值。",
  type: "custom",
  difficulty: 3,
} as LevelType;
