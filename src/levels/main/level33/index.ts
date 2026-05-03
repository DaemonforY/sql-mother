import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level33",
  title: "基础语法 - coalesce 空值处理",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer: "select name, coalesce(age, 0) as age from student",
  hint: "使用coalesce为null值设置默认值",
  type: "main",
} as LevelType;
