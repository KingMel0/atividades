const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Array para armazenar os pets cadastrados
let pets = [];

// Função para calcular o porte estimado do pet
function calcularPorte(idade, peso) {
    const idadeSemanas = idade * 52;
    const porte = peso / idadeSemanas;

    if (porte < 2) {
        return 'Pequeno';
    } else if (porte >= 2 && porte < 5) {
        return 'Médio';
    } else {
        return 'Grande';
    }
}

// Rota principal para exibir o formulário e a lista de pets cadastrados
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Rota para lidar com o envio do formulário
app.post('/addpet', (req, res) => {
    const nome = req.body.nome;
    const idade = parseInt(req.body.idade);
    const peso = parseFloat(req.body.peso);

    const porte = calcularPorte(idade, peso);

    const pet = {
        nome: nome,
        idade: idade,
        peso: peso,
        porte: porte
    };

    pets.push(pet);

    res.send(`Pet ${nome} cadastrado com sucesso! Porte estimado: ${porte}<br><br>
              Lista de pets cadastrados:<br>
              ${listarPets()}`);
});

// Função para listar os pets cadastrados agrupados por tipo e porte
function listarPets() {
    const tipos = ['Cachorro', 'Gato', 'Pássaro', 'Outro'];
    let result = '';

    tipos.forEach(tipo => {
        result += `<h3>${tipo}s</h3>`;
        const petsTipo = pets.filter(pet => pet.tipo === tipo);
        const portes = ['Pequeno', 'Médio', 'Grande'];

        portes.forEach(porte => {
            const petsFiltrados = petsTipo.filter(pet => pet.porte === porte);
            if (petsFiltrados.length > 0) {
                result += `<h4>${porte}</h4>`;
                petsFiltrados.forEach(pet => {
                    result += `<p>${pet.nome} - Idade: ${pet.idade}, Peso: ${pet.peso}, Porte: ${pet.porte}</p>`;
                });
            }
        });
    });

    return result;
}

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});
