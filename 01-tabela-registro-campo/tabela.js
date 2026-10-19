const { DatabaseSync } = require("node:sqlite");

const banco = new DatabaseSync("escola.db");

banco.exec(`
    CREATE TABLE IF NOT EXISTS alunos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        idade INTEGER
    )
`);

banco.prepare("INSERT INTO alunos (nome, idade) VALUES (?, ?)").run("João", 20);
banco.prepare("INSERT INTO alunos (nome, idade) VALUES (?, ?)").run("Maria", 22);

const lista = banco.prepare("SELECT * FROM alunos").all();
console.log(lista);