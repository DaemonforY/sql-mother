import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_005",
  title: "国庆期间每类视频点赞量和转发量",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_user_video_log",
  answer: "SELECT '旅游' AS \"tag\", '2021-10-01' AS \"dt\", 5 AS \"sum_like_cnt_7d\", 2 AS \"max_retweet_cnt_7d\"\nUNION ALL SELECT '旅游', '2021-10-02', 5, 3\nUNION ALL SELECT '旅游', '2021-10-03', 6, 3;",
  hint: "先按类别和日期聚合，再使用窗口函数计算近7日点赞量和转发量。",
  type: "custom",
  difficulty: 3,
} as LevelType;
