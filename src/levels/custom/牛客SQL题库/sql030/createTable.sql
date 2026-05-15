DROP TABLE IF EXISTS course_tb;
CREATE TABLE course_tb(
course_id int(10) NOT NULL, 
course_name char(10) NOT NULL,
course_datetime char(30) NOT NULL);

INSERT INTO course_tb VALUES(1, 'Python', '2021-12-1 19:00-21:00');
INSERT INTO course_tb VALUES(2, 'SQL', '2021-12-2 19:00-21:00');
INSERT INTO course_tb VALUES(3, 'R', '2021-12-3 19:00-21:00');

DROP TABLE IF EXISTS behavior_tb;
CREATE TABLE behavior_tb(
user_id int(10) NOT NULL, 
if_vw int(10) NOT NULL,
if_fav int(10) NOT NULL,
if_sign int(10) NOT NULL,
course_id int(10) NOT NULL);

INSERT INTO behavior_tb VALUES(100, 1, 1, 1, 1);
INSERT INTO behavior_tb VALUES(100, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(100, 1, 1, 1, 3);
INSERT INTO behavior_tb VALUES(101, 1, 1, 1, 1);
INSERT INTO behavior_tb VALUES(101, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(101, 1, 0, 0, 3);
INSERT INTO behavior_tb VALUES(102, 1, 1, 1, 1);
INSERT INTO behavior_tb VALUES(102, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(102, 1, 1, 1, 3);
INSERT INTO behavior_tb VALUES(103, 1, 1, 0, 1);
INSERT INTO behavior_tb VALUES(103, 1, 0, 0, 2);
INSERT INTO behavior_tb VALUES(103, 1, 0, 0, 3);
INSERT INTO behavior_tb VALUES(104, 1, 1, 1, 1);
INSERT INTO behavior_tb VALUES(104, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(104, 1, 1, 0, 3);
INSERT INTO behavior_tb VALUES(105, 1, 0, 0, 1);
INSERT INTO behavior_tb VALUES(106, 1, 0, 0, 1);
INSERT INTO behavior_tb VALUES(107, 1, 0, 0, 1);
INSERT INTO behavior_tb VALUES(107, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(108, 1, 1, 1, 3);
