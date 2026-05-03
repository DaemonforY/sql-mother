# 基础语法 - in 集合查询

## 知识点
`IN` 用于判断字段值是否属于指定集合，适合替代多个 `OR` 条件。

示例：

```sql
select name, class_id from student where class_id in (1, 3);
```

## 题目
请编写一条 SQL 查询语句，从 `student` 表中查询班级编号（class_id）为 1、3、5 的学生姓名（name）和班级编号（class_id）。

要求返回字段顺序：`name`、`class_id`。
