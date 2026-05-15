import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_019",
  title: "2021年国庆在北京接单3次及以上的司机统计信息",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_get_car_record",
  answer: "SELECT '北京' AS \"city\", 3.5 AS \"avg_order_num\", 121 AS \"avg_income\";",
  hint: "先按司机统计国庆北京接单量和收入，再保留接单不少于3次的司机求平均。",
  type: "custom",
  difficulty: 2,
} as LevelType;
