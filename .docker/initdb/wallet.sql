DROP DATABASE IF EXISTS wallet;

CREATE DATABASE wallet;

CREATE TABLE wallet.clients (id varchar(255), name varchar(255), email varchar(255), created_at date, updated_at date);
CREATE TABLE wallet.accounts (id varchar(255), client_id varchar(255), balance int, created_at date, updated_at date);
CREATE TABLE wallet.transactions (id varchar(255), account_id_from varchar(255), account_id_to varchar(255), amount int, created_at date);


INSERT INTO wallet.clients (id, name, email, created_at, updated_at) VALUES ('1', 'John Doe', 'john@j.com', NOW(), NOW());
INSERT INTO wallet.clients (id, name, email, created_at, updated_at) VALUES ('2', 'Jane Doe', 'jane@j.com', NOW(), NOW());

INSERT INTO wallet.accounts (id, client_id, balance, created_at, updated_at) VALUES ('1', '1', 100, NOW(), NOW());
INSERT INTO wallet.accounts (id, client_id, balance, created_at, updated_at) VALUES ('2', '2', 200, NOW(), NOW());
