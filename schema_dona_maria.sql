-- 1. Criação do Usuário e Schema
-- A criação do usuário deve ser feita pelo usuário "postgres"
CREATE USER dona_maria WITH PASSWORD 'dona_maria_123';

-- Cria o schema se não existir (PostgreSQL 9.3+ suporta IF NOT EXISTS para SCHEMA)
CREATE SCHEMA IF NOT EXISTS dona_maria_schema AUTHORIZATION dona_maria;

-- Concede o direito de usar o schema (necessário antes de SET search_path)
GRANT USAGE ON SCHEMA dona_maria_schema TO dona_maria;

-- Define o schema padrão para que não precisemos prefixar todas as tabelas
SET search_path TO dona_maria_schema;

-- 2. Criação das Tabelas

CREATE TABLE Cliente (
    id_cliente SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    cpf BIGINT UNIQUE NOT NULL,
    dataNasc DATE
);

CREATE TABLE adm (
    id_adm SERIAL PRIMARY KEY,
    login TEXT NOT NULL,
    senha TEXT NOT NULL
);

-- CORREÇÃO: Adicionada vírgula entre 'descricao TEXT' e 'capacidade INTEGER NOT NULL'
CREATE TABLE Espaco (
    id_espaco SERIAL PRIMARY KEY,
    nome TEXT,
    descricao TEXT,
    capacidade INTEGER NOT NULL,
    preco FLOAT NOT NULL,
    tipo TEXT,
    diasIndisponiveis DATE[]
);

CREATE TABLE Reserva (
    id_reserva SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    
    id_cliente INTEGER NOT NULL,
    -- O ID do espaço deve ser UNIQUE apenas se for uma reserva por espaço/dia. 
    -- Se um espaço pode ser reservado em dias diferentes, remova o UNIQUE.
    -- Mantido 'UNIQUE' conforme o código original.
    id_espaco INTEGER UNIQUE NOT NULL, 
    id_adm INTEGER,
    
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_espaco) REFERENCES Espaco(id_espaco),
    FOREIGN KEY (id_adm) REFERENCES adm(id_adm)
);

CREATE TABLE Pagamento (
    id_pagamento SERIAL PRIMARY KEY,
    valorTotal FLOAT NOT NULL,
    valorPago FLOAT NOT NULL,
    tipoPagamento TEXT,
    
    id_reserva INTEGER UNIQUE NOT NULL,

    FOREIGN KEY (id_reserva) REFERENCES Reserva(id_reserva)
);

-- 3. Gerenciamento de Permissões (para o usuário 'dona_maria')

-- Concede direitos sobre objetos existentes no schema
GRANT ALL ON ALL TABLES IN SCHEMA dona_maria_schema TO dona_maria;
GRANT ALL ON ALL SEQUENCES IN SCHEMA dona_maria_schema TO dona_maria;

-- Define que todos os futuros objetos criados por 'dona_maria' em 'dona_maria_schema'
-- terão permissões automáticas para o próprio 'dona_maria'.
ALTER DEFAULT PRIVILEGES FOR ROLE dona_maria IN SCHEMA dona_maria_schema  
    GRANT ALL ON TABLES TO dona_maria;

ALTER DEFAULT PRIVILEGES FOR ROLE dona_maria IN SCHEMA dona_maria_schema  
    GRANT ALL ON SEQUENCES TO dona_maria;

INSERT INTO adm (login, senha) VALUES ('dona-maria', '123456');

INSERT INTO Cliente (nome, cpf, dataNasc) VALUES ('Fernando Gbur', 11111111111, '2003-03-03');
INSERT INTO Cliente (nome, cpf, dataNasc) VALUES ('Eduardo Kruger', 22222222222, '2004-07-08');
INSERT INTO Cliente (nome, cpf, dataNasc) VALUES ('Thalita Nascimento', 33333333333, '2003-05-22');

INSERT INTO Espaco (nome, descricao, capacidade, preco, tipo, diasIndisponiveis)
VALUES 
('Salão de Festas Custo Benefício', 'Espaço amplo para festas e eventos.', 100, 500.00, 'Salão de Festas', NULL),
('Churrasqueira', 'Área com churrasqueira para encontros.', 50, 300.00, 'Área Gourmet', NULL),
('Piscina', 'Piscina para lazer e recreação.', 30, 200.00, 'Outro', NULL);