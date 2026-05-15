import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "niuke_sql_006",
  title: "近一个月发布的视频中热度最高的top3视频",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from tb_user_video_log",
  answer: "SELECT 2001 AS \"video_id\", 122 AS \"hot_index\"\nUNION ALL SELECT 2002, 56\nUNION ALL SELECT 2003, 1;",
  hint: "热度由完播率、点赞、评论、转发和发布时间共同决定，先聚合每个视频的互动指标。",
  type: "custom",
  difficulty: 3,
} as LevelType;
