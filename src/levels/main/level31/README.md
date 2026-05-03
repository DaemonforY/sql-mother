# 基础语法 - between 范围查询

## 知识点
`BETWEEN ... AND ...` 用于判断字段值是否在某个闭区间内，常用于分数、年龄、日期等范围筛选。

示例：

```sql
select name, age from student where age between 18 and 30;
```

## 题目
请编写一条 SQL 查询语句，从 `student` 表中查询成绩（score）在 100 到 500 之间的学生姓名（name）和成绩（score）。

要求返回字段顺序：`name`、`score`。
