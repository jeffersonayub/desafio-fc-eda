DROP DATABASE IF EXISTS balances;

CREATE DATABASE balances;

CREATE TABLE balances.account (id BIGINT PRIMARY KEY AUTO_INCREMENT, account_id varchar(255), balance int, created_at date, updated_at date);

INSERT INTO balances.account (account_id, balance, created_at, updated_at) VALUES ('1', 100, NOW(), NOW());
INSERT INTO balances.account (account_id, balance, created_at, updated_at) VALUES ('2', 200, NOW(), NOW());