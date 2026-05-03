import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level31",
  title: "基础语法 - between 范围查询",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer: "select name, score from student where score between 100 and 500",
  hint: "使用between ... and ...筛选闭区间范围",
  type: "main",
} as LevelType;
