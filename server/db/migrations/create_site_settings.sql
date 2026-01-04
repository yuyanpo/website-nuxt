-- 系统设置表
-- 采用单行记录模式存储所有设置项

CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  site_name VARCHAR(100) NOT NULL DEFAULT '' COMMENT '网站名称',
  site_keywords VARCHAR(500) NOT NULL DEFAULT '' COMMENT '网站关键词',
  site_description TEXT COMMENT '网站描述',
  icp_number VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'ICP备案证书号',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  CONSTRAINT single_row CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统设置表';

-- 插入默认记录
INSERT INTO site_settings (id, site_name, site_keywords, site_description, icp_number)
VALUES (1, '卓略互联', '卓略,互联,卓略互联,网站开发', '卓略互联官网，高端网站建设首选品牌', '萌ICP备2601041858号')
ON DUPLICATE KEY UPDATE id = id;

