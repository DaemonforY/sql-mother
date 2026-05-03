import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "interview_department_highest_salary",
  title: "部门最高薪资",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from department_employee",
  answer:
    "SELECT department_name, employee_name, salary\n" +
    "FROM (\n" +
    "    SELECT\n" +
    "        department_name,\n" +
    "        employee_name,\n" +
    "        salary,\n" +
    "        employee_id,\n" +
    "        RANK() OVER (PARTITION BY department_name ORDER BY salary DESC) AS ranking\n" +
    "    FROM department_employee\n" +
    ") t\n" +
    "WHERE ranking = 1\n" +
    "ORDER BY department_name ASC, employee_id ASC;",
  hint: "使用rank窗口函数计算部门内薪资排名，并筛选排名为1的员工",
  type: "custom",
  difficulty: 3,
} as LevelType;
