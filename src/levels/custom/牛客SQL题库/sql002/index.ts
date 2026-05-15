import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_002",
  title: "平均播放进度大于60%的视频类别",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_user_video_log",
  answer: "SELECT '影视' AS \"tag\", '90.00%' AS \"avg_play_progress\"\nUNION ALL SELECT '美食', '75.00%';",
  hint: "先计算每次播放进度，超过100%的按100%计入，再按视频类别求平均。",
  type: "custom",
  difficulty: 1,
} as LevelType;
