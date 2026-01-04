-- 创建管理员用户表
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE COMMENT '登录用户名',
  password VARCHAR(255) NOT NULL COMMENT '密码（bcrypt哈希）',
  nickname VARCHAR(50) COMMENT '显示昵称',
  email VARCHAR(100) COMMENT '邮箱',
  avatar VARCHAR(512) COMMENT '头像URL',
  role TINYINT NOT NULL DEFAULT 1 COMMENT '角色：100=超级管理员，1=普通管理员',
  status TINYINT NOT NULL DEFAULT 1 COMMENT '状态：1=启用，0=禁用',
  last_login_at TIMESTAMP NULL COMMENT '最后登录时间',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_username (username),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='管理员用户表';

-- 插入初始超级管理员账号
-- 密码: admin1234 (bcrypt hash)
INSERT INTO admin_users (username, password, nickname, role, status) VALUES 
('admin', '$2b$10$Xa4mVUWipMfGTjKu3.ybMOROJW8UsZyZxZ0xMzAYR.ODAsv6IdXrK', '超级管理员', 100, 1);

