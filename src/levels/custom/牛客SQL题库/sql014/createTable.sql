DROP TABLE IF EXISTS tb_user_event;
CREATE TABLE tb_user_event (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid INT NOT NULL,
    product_id INT NOT NULL,
    event_time datetime,
    if_click TINYINT,
    if_cart TINYINT,
    if_payment TINYINT,
    if_refund TINYINT
);

INSERT INTO tb_user_event(uid, product_id, event_time, if_click, if_cart, if_payment, if_refund) VALUES
  (101, 8001, '2021-10-01 10:00:00', 0, 0, 0, 0),
  (102, 8001, '2021-10-01 10:00:00', 1, 0, 0, 0),
  (103, 8001, '2021-10-01 10:00:00', 1, 1, 0, 0),
  (104, 8001, '2021-10-02 10:00:00', 1, 1, 1, 0),
  (105, 8001, '2021-10-02 10:00:00', 1, 1, 1, 0),
  (101, 8002, '2021-10-03 10:00:00', 1, 1, 1, 0),
  (109, 8001, '2021-10-04 10:00:00', 1, 1, 1, 1);
