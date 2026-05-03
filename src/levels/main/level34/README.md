# 基础语法 - round 数值处理

## 知识点
`ROUND` 用于对数字进行四舍五入，可以指定保留的小数位数。

示例：

```sql
select name, round(score, 1) as score from student;
```

## 题目
请编写一条 SQL 查询语句，从 `student` 表中查询每个班级编号（class_id）和班级平均分（avg_score），平均分保留 1 位小数。

要求返回字段顺序：`class_id`、`avg_score`。
