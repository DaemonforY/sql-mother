import md from "./README.md?raw";
import sql from "./createTable.sql?raw";

export default {
  key: "interview_category_sales_topn",
  title: "品类销售TopN",
  initSQL: sql,
  content: md,
  defaultSQL: "select * from order_detail",
  answer:
    "SELECT\n" +
    "    category_name,\n" +
    "    product_name,\n" +
    "    total_amount,\n" +
    "    ranking\n" +
    "FROM (\n" +
    "    SELECT\n" +
    "        category_name,\n" +
    "        product_name,\n" +
    "        total_amount,\n" +
    "        RANK() OVER (PARTITION BY category_name ORDER BY total_amount DESC) AS ranking\n" +
    "    FROM (\n" +
    "        SELECT\n" +
    "            category_name,\n" +
    "            product_name,\n" +
    "            SUM(sale_amount) AS total_amount\n" +
    "        FROM order_detail\n" +
    "        GROUP BY category_name, product_name\n" +
    "    ) s\n" +
    ") r\n" +
    "WHERE ranking <= 2\n" +
    "ORDER BY category_name ASC, ranking ASC;",
  hint: "先按品类和商品聚合销售额，再用RANK窗口函数求每个品类内的销售额排名",
  type: "custom",
  difficulty: 3,
} as LevelType;
