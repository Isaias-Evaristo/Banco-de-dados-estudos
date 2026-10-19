const { DatabaseSync } = require("node:sqlite");

const banco = new DatabaseSync("escola.db");

banco.exec(`
    CREATE TABLE IF NOT EXISTS carteirinhas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        numero TEXT NOT NULL,
        aluno_id INTEGER UNIQUE NOT NULL,
        FOREIGN KEY (aluno_id) REFERENCES alunos(id)
    )
`);

const maria = banco.prepare("SELECT id FROM alunos WHERE nome = ?").get("Maria");
banco.prepare("INSERT INTO carteirinhas (numero, aluno_id) VALUES (?, ?)").run("CT-001", maria.id);

const carteirinhaDaMaria = banco.prepare("SELECT * FROM carteirinhas WHERE aluno_id = ?").get(maria.id);
console.log("Carteirinha da Maria:", carteirinhaDaMaria);


banco.exec(`
    CREATE TABLE IF NOT EXISTS disciplinas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL
    )
`);

banco.exec(`
    CREATE TABLE IF NOT EXISTS alunos_disciplinas (
        aluno_id INTEGER NOT NULL,
        disciplina_id INTEGER NOT NULL,
        FOREIGN KEY (aluno_id) REFERENCES alunos(id),
        FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
    )
`);

banco.prepare("INSERT INTO disciplinas (nome) VALUES (?)").run("Banco de Dados");
banco.prepare("INSERT INTO disciplinas (nome) VALUES (?)").run("Engenharia de Requisitos");

const bancoDeDados = banco.prepare("SELECT id FROM disciplinas WHERE nome = ?").get("Banco de Dados");
const requisitos = banco.prepare("SELECT id FROM disciplinas WHERE nome = ?").get("Engenharia de Requisitos");

banco.prepare("INSERT INTO alunos_disciplinas (aluno_id, disciplina_id) VALUES (?, ?)").run(maria.id, bancoDeDados.id);
banco.prepare("INSERT INTO alunos_disciplinas (aluno_id, disciplina_id) VALUES (?, ?)").run(maria.id, requisitos.id);

const disciplinasDaMaria = banco.prepare(`
    SELECT disciplinas.nome
    FROM disciplinas
    JOIN alunos_disciplinas ON disciplinas.id = alunos_disciplinas.disciplina_id
    WHERE alunos_disciplinas.aluno_id = ?
`).all(maria.id);

console.log("Disciplinas da Maria:", disciplinasDaMaria);