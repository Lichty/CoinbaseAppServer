CREATE DATABASE IF NOT EXISTS test_db;

Use test_db;

CREATE TABLE IF NOT EXISTS `Currencies`(
  currency varchar(31) NOT NULL Primary key,
  name varchar(255) NOT NULL,
  min_size float NOT NULL,
  status varchar(31),
  message varchar(31),
  max_precision float NOT NULL,
  type varchar(31) NOT NULL,
  symbol varchar(1) NOT NULL
);

CREATE TABLE IF NOT EXISTS `Products`(
  product           varchar(31) NOT NULL Primary key,
  display_name      varchar(31) NOT NULL,
  base_currency     varchar(31) NOT NULL,
  quote_currency    varchar(31) NOT NULL,
  base_increment    float NOT NULL,
  quote_increment   float NOT NULL,
  base_min_size     float NOT NULL,
  base_max_size     float NOT NULL,
  min_market_funds  float NOT NULL,
  max_market_funds  float NOT NULL,
  status            varchar(31),
  status_message    varchar(31),
  cancel_only       BOOLEAN,
  limit_only        BOOLEAN,
  post_only         BOOLEAN,
  trading_disabled  BOOLEAN,
  FOREIGN KEY(base_currency)
	REFERENCES Currencies(currency),
  FOREIGN KEY(quote_currency)
	REFERENCES Currencies(currency)
);

CREATE TABLE IF NOT EXISTS `History`(
  product varchar(31) NOT NULL,
  start_time int NOT NULL,
  low float NOT NULL,
  high float NOT NULL,
  open float NOT NULL,
  close float NOT NULL,
  volume float NOT NULL,
  FOREIGN KEY(product)
    REFERENCES Products(product)
)