# 基础语法 - coalesce 空值处理

## 知识点
`COALESCE` 会返回参数列表中第一个非空值，常用于给空值设置默认展示结果。

示例：

```sql
select name, coalesce(age, 0) as age from student;
```

## 题目
请编写一条 SQL 查询语句，从 `student` 表中查询学生姓名（name）和年龄（age），如果年龄为空，则展示为 0。

要求返回字段顺序：`name`、`age`。
