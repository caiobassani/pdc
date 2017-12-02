use pdc;

-- Tabela Filial
CREATE  TABLE Filial (
	idFilial INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome VARCHAR(128) NOT NULL  UNIQUE
);

-- Tabela Cliente
CREATE  TABLE Cliente (
	idCliente INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome VARCHAR(128) NOT NULL  UNIQUE,
	idFilial INTEGER NOT NULL,
	FOREIGN KEY (idFilial) REFERENCES Filial(idFilial)
);

-- Tabela Produto
CREATE  TABLE Produto (
	idProduto INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome VARCHAR(128) NOT NULL  UNIQUE,
	valor FLOAT NOT NULL,
	qtdEstoque INTEGER NOT NULL
);

-- Tabela Venda
CREATE  TABLE Venda (
	idVenda INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
	idCliente INTEGER NOT NULL,
	idProduto INTEGER NOT NULL,
	idFilial INTEGER NOT NULL,
	qtd INTEGER NOT NULL,
	valorUnitario FLOAT NOT NULL,
	FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente),
	FOREIGN KEY (idProduto) REFERENCES Produto(idProduto),
	FOREIGN KEY (idFilial) REFERENCES Filial(idFilial)
);

-- Filiais
INSERT INTO Filial (nome) VALUES ('Filial A');
INSERT INTO Filial (nome) VALUES ('Filial B');
