const { DatabaseSync } = require("node:sqlite");

const banco = new DatabaseSync("escola.db");

// CREATE: cria um aluno novo
banco.prepare("INSERT INTO alunos (nome, idade) VALUES (?, ?)").run("Pedro", 19);
console.log("Todos os alunos:", banco.prepare("SELECT * FROM alunos").all());

// READ com WHERE: busca só os alunos com mais de 20 anos
const maioresDe20 = banco.prepare("SELECT * FROM alunos WHERE idade > ?").all(20);
console.log("Maiores de 20:", maioresDe20);

// UPDATE: corrige a idade do Pedro
banco.prepare("UPDATE alunos SET idade = ? WHERE nome = ?").run(20, "Pedro");
console.log("Depois de atualizar:", banco.prepare("SELECT * FROM alunos").all());

// DELETE: remove o Pedro
banco.prepare("DELETE FROM alunos WHERE nome = ?").run("Pedro");
console.log("Depois de apagar:", banco.prepare("SELECT * FROM alunos").all());