import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_024",
  title: "各城市最大同时等车人数",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_get_car_record",
  answer: "SELECT '北京' AS \"city\", 5 AS \"max_wait_uv\";",
  hint: "把等车开始和结束事件展开为+1/-1，再按城市累计同时等车人数。",
  type: "custom",
  difficulty: 3,
} as LevelType;
