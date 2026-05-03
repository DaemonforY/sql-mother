import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "level34",
  title: "基础语法 - round 数值处理",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from student",
  answer: "select class_id, round(avg(score), 1) as avg_score from student group by class_id",
  hint: "先按班级分组计算平均分，再用round保留1位小数",
  type: "main",
} as LevelType;
