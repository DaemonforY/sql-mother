import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "interview_order_conversion_funnel",
  title: "订单转化漏斗",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from user_event_log",
  answer:
    "SELECT\n" +
    "    visit_users,\n" +
    "    cart_users,\n" +
    "    pay_users,\n" +
    "    ROUND(cart_users * 100.0 / visit_users, 2) AS visit_to_cart_rate,\n" +
    "    ROUND(pay_users * 100.0 / cart_users, 2) AS cart_to_pay_rate\n" +
    "FROM (\n" +
    "    SELECT\n" +
    "        COUNT(DISTINCT CASE WHEN event_name = 'visit' THEN user_id END) AS visit_users,\n" +
    "        COUNT(DISTINCT CASE WHEN event_name = 'cart' THEN user_id END) AS cart_users,\n" +
    "        COUNT(DISTINCT CASE WHEN event_name = 'pay' THEN user_id END) AS pay_users\n" +
    "    FROM user_event_log\n" +
    ") t;",
  hint: "用count distinct case when分别统计每个漏斗步骤的用户数",
  type: "custom",
  difficulty: 2,
} as LevelType;
