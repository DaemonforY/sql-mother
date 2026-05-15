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
  (101, 9001, '2021-11-01 10:00:00', '2021-11-01 10:00:31', 0),
  (102, 9001, '2021-11-01 10:00:00', '2021-11-01 10:00:24', 0),
  (102, 9002, '2021-11-01 11:00:00', '2021-11-01 11:00:11', 0),
  (101, 9001, '2021-11-02 10:00:00', '2021-11-02 10:00:50', 0),
  (102, 9002, '2021-11-02 11:00:01', '2021-11-02 11:00:24', 0);
