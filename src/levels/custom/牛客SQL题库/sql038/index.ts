import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_038",
  title: "某乎问答回答过教育类问题的用户里有多少用户回答过职场类问题",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from issue_tb",
  answer: "SELECT 1 AS \"num\";",
  hint: "先找回答过教育类问题的答主，再统计其中也回答过职场类问题的人数。",
  type: "custom",
  difficulty: 2,
} as LevelType;
