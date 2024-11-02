CREATE TABLE cidades (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE clientes (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	altura FLOAT,
	nascimento DATE,
	cidade_id INT NOT NULL,
	FOREIGN KEY (cidade_id) REFERENCES cidades(id)
);

CREATE TABLE pedidos (
	id SERIAL PRIMARY KEY,
	horario TIMESTAMP NOT NULL,
	endereco VARCHAR(100),
	cliente_id INT NOT NULL,
	FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE categorias (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(100) NOT NULL
);

CREATE TABLE produtos (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	preco FLOAT,
	quantidade FLOAT,
	categoria_id INT NOT NULL,
	FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE pedidos_produtos (
	pedido_id INT NOT NULL,
	produto_id INT NOT NULL,
	preco FLOAT,
	quantidade FLOAT,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
	FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

INSERT INTO cidades(nome) VALUES 
('Canoas'),
('Porto Alegre'),
('Guaíba');

INSERT INTO clientes(nome, altura, nascimento, cidade_id) VALUES 
('João Pereira', 1.75, '1990-06-15', 1),
('Ana Souza', 1.62, '1985-04-10', 2),
('Carlos Silva', 1.80, '1992-08-20', 3);

INSERT INTO categorias (nome) VALUES 
('Eletrônicos'),
('Roupas'),
('Alimentos');

INSERT INTO produtos (nome, preco, quantidade, categoria_id) VALUES 
('Smartphone', 1500.00, 30, 1),
('Notebook', 3500.00, 20, 1),
('Camiseta', 50.00, 100, 2),
('Calça Jeans', 120.00, 60, 2),
('Arroz', 20.00, 200, 3),
('Feijão', 10.00, 150, 3);

INSERT INTO pedidos (horario, endereco, cliente_id) VALUES 
('2024-10-28 14:30:00', 'Rua A, 123', 1),
('2024-10-29 10:15:00', 'Av. B, 456', 2),
('2024-10-29 16:00:00', 'Rua C, 789', 3);

INSERT INTO pedidos_produtos (pedido_id, produto_id, preco, quantidade) VALUES 
(1, 1, 1500.00, 1),
(1, 3, 50.00, 2),
(2, 2, 3500.00, 1),
(2, 5, 20.00, 5),
(3, 4, 120.00, 1),
(3, 6, 10.00, 3);