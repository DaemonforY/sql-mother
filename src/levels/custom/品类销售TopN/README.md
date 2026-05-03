# 品类销售 TopN

## 背景故事
你在电商数仓团队负责商品销售分析，业务方希望找出每个品类中销售额最高的商品，用于配置首页推荐位。分组 TopN 是大数据 SQL 面试中最经典的窗口函数题型之一。

## 数据说明
订单明细表 `order_detail` 记录了商品销售明细：

- `order_id`：订单 ID
- `category_name`：商品品类
- `product_name`：商品名称
- `sale_amount`：销售金额

## 任务要求
请编写 SQL 查询，统计每个品类销售额排名前 2 的商品：

1. 先按品类和商品汇总销售额
2. 再计算商品在各自品类内的销售额排名
3. 只保留每个品类排名前 2 的商品
4. 返回字段：品类名称（category_name）、商品名称（product_name）、销售总额（total_amount）、品类内排名（ranking）
5. 按品类名称升序、排名升序排列

## 提示
- 先使用 `GROUP BY category_name, product_name` 汇总商品销售额
- 再使用 `RANK() OVER (PARTITION BY category_name ORDER BY total_amount DESC)` 做分组排名
- 外层查询筛选 `ranking <= 2`
