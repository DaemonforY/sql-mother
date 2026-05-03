CREATE TABLE if not exists employee_salary (
    employee_id INT,
    employee_name VARCHAR(50),
    salary INT
);

INSERT INTO employee_salary (employee_id, employee_name, salary) VALUES
(1, '小鱼', 18000),
(2, '小明', 22000),
(3, '小红', 22000),
(4, '小刚', 16000),
(5, '小李', 30000),
(6, '小王', 26000),
(7, '小赵', 26000),
(8, '小周', 12000);
