import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_017",
  title: "10月的新户客单价和获客成本",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_order_overall",
  answer: "SELECT 231.7 AS \"avg_amount\", 23.3 AS \"avg_cost\";",
  hint: "先找每个用户首单，再筛选10月新客首单计算客单价和获客成本。",
  type: "custom",
  difficulty: 3,
} as LevelType;
