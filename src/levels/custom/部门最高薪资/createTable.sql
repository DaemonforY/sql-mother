CREATE TABLE if not exists department_employee (
    employee_id INT,
    employee_name VARCHAR(50),
    department_name VARCHAR(50),
    salary INT
);

INSERT INTO department_employee (employee_id, employee_name, department_name, salary) VALUES
(1, '鱼皮', '技术部', 32000),
(2, '小明', '技术部', 28000),
(3, '小红', '技术部', 32000),
(4, '小刚', '产品部', 26000),
(5, '小李', '产品部', 24000),
(6, '小王', '运营部', 18000),
(7, '小赵', '运营部', 21000),
(8, '小周', '运营部', 21000),
(9, '小吴', '销售部', 25000),
(10, '小郑', '销售部', 23000);
