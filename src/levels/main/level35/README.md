# 基础语法 - count distinct

## 知识点
`COUNT(DISTINCT 字段)` 用于统计某列中不重复值的数量。

示例：

```sql
select count(distinct class_id) as class_count from student;
```

## 题目
请编写一条 SQL 查询语句，统计 `student` 表中参与过考试的不同考试编号数量。

要求返回字段：`exam_count`。
