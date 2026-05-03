import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "interview_second_highest_salary",
  title: "薪资第二高",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from employee_salary",
  answer:
    "SELECT salary AS second_highest_salary\n" +
    "FROM (\n" +
    "    SELECT DISTINCT salary\n" +
    "    FROM employee_salary\n" +
    "    ORDER BY salary DESC\n" +
    "    LIMIT 1 OFFSET 1\n" +
    ") t;",
  hint: "先distinct去重薪资，再按薪资降序取第2条",
  type: "custom",
  difficulty: 2,
} as LevelType;
