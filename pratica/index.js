const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

let students = [];

// Função para calcular a média das notas de um aluno
function calculateAverageGrade(student) {
    return (student.grade1 + student.grade2) / 2;
}

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para lidar com o envio do formulário
app.post('/', (req, res) => {
    const name = req.body.name;
    const grade1 = parseFloat(req.body.grade1);
    const grade2 = parseFloat(req.body.grade2);

    const student = {
        name: name,
        grade1: grade1,
        grade2: grade2
    };

    students.push(student);

    // Calcula a média da turma
    const classAverage = students.reduce((acc, curr) => acc + calculateAverageGrade(curr), 0) / students.length;

    // Encontra a maior média da turma
    const maxGrade = Math.max(...students.map(student => calculateAverageGrade(student)));

    res.send(`Aluno ${name} cadastrado com sucesso!<br>
              Maior média da turma: ${maxGrade.toFixed(2)}<br>
              Média da turma: ${classAverage.toFixed(2)}<br><br>
              Lista de alunos cadastrados:<br>
              ${students.map(student => `${student.name}: ${calculateAverageGrade(student).toFixed(2)}`).join('<br>')}`);
});

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});
