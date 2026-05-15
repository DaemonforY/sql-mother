import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_036",
  title: "某乎问答高质量的回答中用户属于各级别的数量",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from author_tb",
  answer: "SELECT '5-6级' AS \"level_cut\", 12 AS \"num\"\nUNION ALL SELECT '3-4级', 2\nUNION ALL SELECT '1-2级', 1;",
  hint: "先筛选高质量回答，再按答主等级区间分组统计。",
  type: "custom",
  difficulty: 2,
} as LevelType;
