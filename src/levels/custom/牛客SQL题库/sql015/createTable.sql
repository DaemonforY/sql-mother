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

INSERT INTO tb_order_overall(order_id, uid, event_time, total_amount, total_cnt, status) VALUES
  (301001, 101, '2021-10-01 10:00:00', 30000, 3, 1),
  (301002, 102, '2021-10-01 11:00:00', 23900, 2, 1),
  (301003, 103, '2021-10-02 10:00:00', 31000, 2, 1);

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
  (8001, 901, '家电', 6000, 100, '2020-01-01 10:00:00'),
  (8002, 902, '家电', 12000, 50, '2020-01-01 10:00:00'),
  (8003, 901, '3C数码', 12000, 50, '2020-01-01 10:00:00');

INSERT INTO tb_order_detail(order_id, product_id, price, cnt) VALUES
  (301001, 8001, 8500, 2),
  (301001, 8002, 15000, 1),
  (301002, 8001, 8500, 1),
  (301002, 8002, 16000, 1),
  (301003, 8002, 14000, 1),
  (301003, 8003, 18000, 1);
