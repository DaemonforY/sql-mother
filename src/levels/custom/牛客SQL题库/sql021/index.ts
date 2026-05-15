import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_021",
  title: "每个城市中评分最高的司机信息",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_get_car_record",
  answer: "SELECT '北京' AS \"city\", 203 AS \"driver_id\", 4.8 AS \"avg_grade\", 1.7 AS \"avg_order_num\", 14.7 AS \"avg_mileage\";",
  hint: "先按城市和司机聚合评分、接单量、里程，再用排名函数取每城最高评分司机。",
  type: "custom",
  difficulty: 3,
} as LevelType;
