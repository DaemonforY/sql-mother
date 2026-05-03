import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level32",
  title: "基础语法 - in 集合查询",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer: "select name, class_id from student where class_id in (1, 3, 5)",
  hint: "使用in判断字段是否属于多个指定值",
  type: "main",
} as LevelType;
