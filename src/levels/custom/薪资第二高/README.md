# 薪资第二高

## 背景故事
HR 系统需要查询公司第二高薪资，用于薪酬分析报表。求第 N 高是 SQL 面试中非常常见的基础题。

## 数据说明
员工薪资表 `employee_salary`：

- `employee_id`：员工 ID
- `employee_name`：员工姓名
- `salary`：薪资

## 任务要求
请编写 SQL 查询，返回公司第二高的不同薪资。

要求返回字段：`second_highest_salary`。

## 提示
- 注意多个员工可能薪资相同
- 可以先对薪资去重，再降序排序取第 2 条
