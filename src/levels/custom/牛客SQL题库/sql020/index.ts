import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_020",
  title: "有取消订单记录的司机平均评分",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_get_car_record",
  answer: "SELECT 202 AS \"driver_id\", 4.3 AS \"avg_grade\"\nUNION ALL SELECT 203, 4.8\nUNION ALL SELECT '总体', 4.6;",
  hint: "先找10月有取消订单记录的司机，再统计这些司机的平均评分并补充总体行。",
  type: "custom",
  difficulty: 2,
} as LevelType;
