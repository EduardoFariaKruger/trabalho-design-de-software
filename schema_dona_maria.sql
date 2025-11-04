CREATE DATABASE cantinho_dona_maria;

CREATE USER dona_maria WITH PASSWORD 'dona_maria_123';

CREATE SCHEMA dona_maria_schema AUTHORIZATION dona_maria;

GRANT USAGE ON SCHEMA dona_maria_schema TO dona_maria;

SET search_path TO dona_maria_schema;

CREATE TABLE dona_maria_schema.Cliente (
    id_cliente SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    cpf INTEGER UNIQUE NOT NULL,
    dataNasc DATE
);

CREATE TABLE dona_maria_schema.ADM (
    id_adm SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    cpf INTEGER UNIQUE NOT NULL,
    dataNasc DATE
);

CREATE TABLE dona_maria_schema.Espaco (
    id_espaco SERIAL PRIMARY KEY,
    fotos TEXT[],
    capacidade INTEGER NOT NULL,
    preco FLOAT NOT NULL,
    tipo TEXT,
    diasDisponiveis DATE[]
);

CREATE TABLE dona_maria_schema.Reserva (
    id_reserva SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    
    id_cliente INTEGER NOT NULL,
    id_espaco INTEGER UNIQUE NOT NULL,
    id_adm INTEGER,
    
    FOREIGN KEY (id_cliente) REFERENCES dona_maria_schema.Cliente(id_cliente),
    FOREIGN KEY (id_espaco) REFERENCES dona_maria_schema.Espaco(id_espaco),
    FOREIGN KEY (id_adm) REFERENCES dona_maria_schema.ADM(id_adm)
);

CREATE TABLE dona_maria_schema.Pagamento (
    id_pagamento SERIAL PRIMARY KEY,
    valorTotal FLOAT NOT NULL,
    valorPago FLOAT NOT NULL,
    tipoPagamento TEXT,
    
    id_reserva INTEGER UNIQUE NOT NULL,

    FOREIGN KEY (id_reserva) REFERENCES dona_maria_schema.Reserva(id_reserva)
);

GRANT ALL ON ALL TABLES IN SCHEMA dona_maria_schema TO dona_maria;
GRANT ALL ON ALL SEQUENCES IN SCHEMA dona_maria_schema TO dona_maria;

ALTER DEFAULT PRIVILEGES FOR ROLE dona_maria IN SCHEMA dona_maria_schema 
    GRANT ALL ON TABLES TO dona_maria;

ALTER DEFAULT PRIVILEGES FOR ROLE dona_maria IN SCHEMA dona_maria_schema 
    GRANT ALL ON SEQUENCES TO dona_maria;
