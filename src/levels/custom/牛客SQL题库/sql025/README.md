# 某宝店铺的SPU数量

## 题目
描述
11月结束后，小牛同学需要对其在某宝的网店就11月份用户交易情况和产品情况进行分析以更好的经营小店。
已知产品情况表product_tb如下（其中，item_id指某款号的具体货号，style_id指款号，tag_price表示标签价格，inventory指库存量）：


请你统计每款的SPU（货号）数量，并按SPU数量降序排序，以上例子的输出结果如下：
示例1
输入：
drop table if exists product_tb;
CREATE TABLE product_tb(
item_id char(10) NOT NULL,
style_id char(10) NOT NULL,
tag_price int(10) NOT NULL,
inventory int(10) NOT NULL
);
INSERT INTO product_tb VALUES('A001', 'A', 100,  20);
INSERT INTO product_tb VALUES('A002', 'A', 120, 30);
INSERT INTO product_tb VALUES('A003', 'A', 200,  15);
INSERT INTO product_tb VALUES('B001', 'B', 130, 18);
INSERT INTO product_tb VALUES('B002', 'B', 150,  22);
INSERT INTO product_tb VALUES('B003', 'B', 125, 10);
INSERT INTO product_tb VALUES('B004', 'B', 155,  12);
INSERT INTO product_tb VALUES('C001', 'C', 260, 25);
INSERT INTO product_tb VALUES('C002', 'C', 280,  18);
复制
输出：
B|4
A|3
C|2
复制
TOP
SQL 编程
是否格式化代码？
否(5)
是
1
执行结果
自测输入
提交记录
自测运行
保存并提交

## 输出字段
- `style_id`
- `SPU_num`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
SELECT style_id,
COUNT(style_id) AS SPU_num
FROM product_tb
GROUP BY style_id
ORDER BY SPU_num desc
```
