DROP TABLE IF EXISTS tb_user_log;
CREATE TABLE tb_user_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid INT NOT NULL,
    artical_id INT NOT NULL,
    in_time datetime,
    out_time datetime,
    sign_in TINYINT DEFAULT 0
);

INSERT INTO tb_user_log(uid, artical_id, in_time, out_time, sign_in) VALUES
  (101, 9001, '2021-11-01 10:00:00', '2021-11-01 10:00:11', 0),
  (102, 9001, '2021-11-01 10:00:09', '2021-11-01 10:00:38', 0),
  (103, 9001, '2021-11-01 10:00:28', '2021-11-01 10:00:58', 0),
  (104, 9002, '2021-11-01 11:00:45', '2021-11-01 11:01:11', 0),
  (105, 9001, '2021-11-01 10:00:51', '2021-11-01 10:00:59', 0),
  (106, 9002, '2021-11-01 11:00:55', '2021-11-01 11:01:24', 0),
  (107, 9001, '2021-11-01 10:00:01', '2021-11-01 10:01:50', 0);
