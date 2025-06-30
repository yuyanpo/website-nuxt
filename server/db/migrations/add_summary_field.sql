-- 添加summary字段到news表
ALTER TABLE news ADD COLUMN summary TEXT AFTER title; 