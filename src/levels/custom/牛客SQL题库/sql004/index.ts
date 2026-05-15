import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_004",
  title: "每个创作者每月的涨粉率及截止当前的总粉丝量",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_user_video_log",
  answer: "SELECT 901 AS \"author\", '2021-09' AS \"month\", 0.5 AS \"fans_growth_rate\", 1 AS \"total_fans\"\nUNION ALL SELECT 901, '2021-10', 0.25, 2;",
  hint: "先按创作者和月份统计净增粉，再使用窗口函数累计总粉丝量。",
  type: "custom",
  difficulty: 3,
} as LevelType;
