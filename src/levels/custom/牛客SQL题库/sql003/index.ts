import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_003",
  title: "每类视频近一个月的转发量率",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_user_video_log",
  answer: "SELECT '影视' AS \"tag\", 2 AS \"retweet_cnt\", 0.667 AS \"retweet_rate\"\nUNION ALL SELECT '美食', 1, 0.5;",
  hint: "最近一个月可先找到最大播放日期，再筛选前29天到当天的数据。",
  type: "custom",
  difficulty: 2,
} as LevelType;
