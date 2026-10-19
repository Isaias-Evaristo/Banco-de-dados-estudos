const { DatabaseSync } = require("node:sqlite");

const banco = new DatabaseSync("escola.db");

banco.exec(`
    CREATE TABLE IF NOT EXISTS alunos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        idade INTEGER
    )
`);

banco.exec(`
    CREATE TABLE IF NOT EXISTS notas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        valor REAL NOT NULL,
        aluno_id INTEGER NOT NULL,
        FOREIGN KEY (aluno_id) REFERENCES alunos(id)
    )
`);

const joao = banco.prepare("SELECT id FROM alunos WHERE nome = ?").get("João");

banco.prepare("INSERT INTO notas (valor, aluno_id) VALUES (?, ?)").run(8.5, joao.id);
banco.prepare("INSERT INTO notas (valor, aluno_id) VALUES (?, ?)").run(7.0, joao.id);

const notasDoJoao = banco.prepare("SELECT * FROM notas WHERE aluno_id = ?").all(joao.id);
console.log("Notas do João:", notasDoJoao);