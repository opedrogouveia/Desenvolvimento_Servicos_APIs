CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    matricula VARCHAR(50) UNIQUE NOT NULL,
    faltas INT DEFAULT 0 NOT NULL,
    situacao VARCHAR(30) DEFAULT 'Cursando' NOT NULL
);

CREATE TABLE presencas (
    id SERIAL PRIMARY KEY,
    aluno_id INT NOT NULL,
    data DATE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    presenca BOOLEAN NOT NULL,
    CONSTRAINT fk_aluno FOREIGN KEY (aluno_id) REFERENCES alunos(id)
);

INSERT INTO alunos (nome, matricula) 
VALUES
('João Silva', '2023001'),
('Maria Souza', '2023002'),
('Carlos Oliveira', '2023003'),
('Fernanda Santos', '2023004'),
('Lucas Pereira', '2023005');

UPDATE alunos
SET situacao = 'Cursando';

UPDATE alunos
SET faltas = 0;

DELETE FROM nome_da_tabela;

-- INSERT INTO presencas (aluno_id, data, estado) 
-- VALUES
-- (1, '2024-11-01', 'presente'),
-- (1, '2024-11-02', 'ausente'),
-- (2, '2024-11-01', 'presente'),
-- (3, '2024-11-01', 'ausente'),
-- (4, '2024-11-01', 'ausente'),
-- (5, '2024-11-02', 'presente');