DROP TABLE IF EXISTS tb_order_overall;
CREATE TABLE tb_order_overall (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INT NOT NULL,
    uid INT NOT NULL,
    event_time datetime,
    total_amount DECIMAL NOT NULL,
    total_cnt INT NOT NULL,
    status TINYINT NOT NULL
);

DROP TABLE IF EXISTS tb_product_info;
CREATE TABLE tb_product_info (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INT NOT NULL,
    shop_id INT NOT NULL,
    tag VARCHAR(12),
    in_price DECIMAL NOT NULL,
    quantity INT NOT NULL,
    release_time datetime
);

DROP TABLE IF EXISTS tb_order_detail;
CREATE TABLE tb_order_detail (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    price DECIMAL NOT NULL,
    cnt INT NOT NULL
);

INSERT INTO tb_product_info(product_id, shop_id, tag, in_price, quantity, release_time) VALUES
  (8001, 901, '零食', 60, 1000, '2020-01-01 10:00:00'),
  (8002, 901, '零食', 140, 500, '2020-01-01 10:00:00'),
  (8003, 901, '零食', 160, 500, '2020-01-01 10:00:00');

INSERT INTO tb_order_overall(order_id, uid, event_time, total_amount, total_cnt, status) VALUES
  (301001, 101, '2021-09-30 10:00:00', 140, 1, 1),
  (301002, 102, '2021-10-01 11:00:00', 235, 2, 1),
  (301011, 102, '2021-10-31 11:00:00', 250, 2, 1),
  (301003, 101, '2021-11-02 10:00:00', 300, 2, 1),
  (301013, 105, '2021-11-02 10:00:00', 300, 2, 1),
  (301005, 104, '2021-11-03 10:00:00', 170, 1, 1);

INSERT INTO tb_order_detail(order_id, product_id, price, cnt) VALUES
  (301001, 8002, 150, 1),
  (301011, 8003, 200, 1),
  (301011, 8001, 80, 1),
  (301002, 8001, 85, 1),
  (301002, 8003, 180, 1),
  (301003, 8002, 140, 1),
  (301003, 8003, 180, 1),
  (301013, 8002, 140, 2),
  (301005, 8003, 180, 1);
