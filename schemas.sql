CREATE TABLE Cliente (
    id_cliente SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    cpf INTEGER UNIQUE NOT NULL,
    dataNasc DATE
);


CREATE TABLE ADM (
    id_adm SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    cpf INTEGER UNIQUE NOT NULL,
    dataNasc DATE
);


CREATE TABLE Espaco (
    id_espaco SERIAL PRIMARY KEY,
    fotos TEXT[],
    capacidade INTEGER NOT NULL,
    preco FLOAT NOT NULL,
    tipo TEXT,
    diasDisponiveis DATE[]
);


CREATE TABLE Reserva (
    id_reserva SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    
    id_cliente INTEGER NOT NULL,
    id_espaco INTEGER UNIQUE NOT NULL,
    id_adm INTEGER,
    
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_espaco) REFERENCES Espaco(id_espaco),
    FOREIGN KEY (id_adm) REFERENCES ADM(id_adm)
);

CREATE TABLE Pagamento (
    id_pagamento SERIAL PRIMARY KEY,
    valorTotal FLOAT NOT NULL,
    valorPago FLOAT NOT NULL,
    tipoPagamento TEXT,
    
    id_reserva INTEGER UNIQUE NOT NULL,

    
    FOREIGN KEY (id_reserva) REFERENCES Reserva(id_reserva)
);
