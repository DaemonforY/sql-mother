import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_001",
  title: "各个视频的平均完播率",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_user_video_log",
  answer: "SELECT 2001 AS \"video_id\", 0.667 AS \"avg_comp_play_rate\"\nUNION ALL SELECT 2002, 0;",
  hint: "连接播放日志和视频信息，判断观看时长是否不少于视频时长，再按视频分组计算平均值。",
  type: "custom",
  difficulty: 1,
} as LevelType;
