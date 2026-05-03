import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level35",
  title: "基础语法 - count distinct",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer: "select count(distinct exam_num) as exam_count from student",
  hint: "使用count(distinct 字段)统计不重复值的数量",
  type: "main",
} as LevelType;
