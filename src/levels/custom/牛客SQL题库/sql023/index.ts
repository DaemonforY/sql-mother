import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_023",
  title: "工作日各时段叫车量、等待接单时间和调度时间",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_get_car_record",
  answer: "SELECT '工作时间' AS \"period\", 1 AS \"get_car_num\", 0.5 AS \"avg_wait_time\", 1.7 AS \"avg_dispatch_time\"\nUNION ALL SELECT '休息时间', 1, 0.7, 2.3\nUNION ALL SELECT '晚高峰', 3, 2.1, 7.3\nUNION ALL SELECT '早高峰', 4, 2.2, 8;",
  hint: "按叫车时间划分时段，等待接单时间和调度时间需要用时间差换算分钟。",
  type: "custom",
  difficulty: 2,
} as LevelType;
