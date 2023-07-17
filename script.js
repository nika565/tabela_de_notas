/*
----------------------------- Manipulação da tabela ---------------------------------
*/
// Pegar os eventos de clique
document.addEventListener('click', (evento) => {

    // Capturando o elemento clicado
    const elemento = evento.target;

    if (elemento.classList.contains('adicionar-aluno')) {
        adicionaAlunos();
    }

    if (elemento.classList.contains('adicionar-nota')) {
        adicionaNotas();
    }

    if (elemento.classList.contains('calcular-Media')) {

        // Condicional para verificar se os campos estão vazios
        console.log(verificaVazio());
        if (verificaVazio()) return alert('Todos os campos devem ser preenchidos.');

        listaDeAlunos();
    }

    if (elemento.classList.contains('ordem-alfabetica')) {
        if (verificaVazio()) return alert('Todos os campos devem ser preenchidos.');
        listaDeAlunos();
        ordemAlfabetica(listaDeAlunos());
    }

    if (elemento.classList.contains('ordem-crescente')) {
        if (verificaVazio()) return alert('Todos os campos devem ser preenchidos.');
        listaDeAlunos();
        ordemCrescente(listaDeAlunos());
    }

    if (elemento.classList.contains('ordem-decrescente')) {
        if (verificaVazio()) return alert('Todos os campos devem ser preenchidos.');
        listaDeAlunos();
        ordemDecrescente(listaDeAlunos());
    }

});


function adicionaAlunos() {

    // Selecionando a tabela
    const corpoTabela = document.querySelector('.corpo-tabela');


    // Craindo os elementos que irão ser adicionados
    const linha = document.createElement('tr');
    const id = document.createElement('th');

    // Adicionando classes nos elementos
    id.className = 'id-aluno'

    // Para adicionar o ID do aluno, primeiro precisamos ver quantos alunos tem
    const qtdAlunos = quantidadeAlunos();
    id.textContent = `${qtdAlunos + 1}`;

    linha.appendChild(id);

    corpoTabela.appendChild(linha);

    // Quantiddaes de notas para gerar os campos
    const qtdNotas = quantidadeNotas();


    // Craindo as colunas
    for (let i = 0; i <= qtdNotas + 2; i++) {

        const coluna = document.createElement('td');

        if (i === qtdNotas + 1) {
            coluna.classList = 'media-aluno'
        }

        if (i === qtdNotas + 2) {
            coluna.classList = 'situacao-aluno'
        }

        linha.appendChild(coluna);

        const input = document.createElement('input');
        input.type = 'number';



        // adicionando classe no input
        if (i === 0) {
            input.className = 'campo-nome';
            input.type = 'text';

        } else {
            input.className = 'campo-nota';
        }

        if (i <= qtdNotas) {
            coluna.appendChild(input);
        }


    }

}

function adicionaNotas() {

    // Craindo o elementos titulo
    const tituloNota = document.createElement('th');

    // Identificando a quantidade de IDs
    const qtdAlunos = quantidadeAlunos()

    // Identificando a quantidade de notas
    const qtdNotas = quantidadeNotas()

    // Selecionando os elementos para adicionar os elementos criados antes
    const media = document.querySelector('.media');

    // Adicionando o título
    media.parentNode.insertBefore(tituloNota, media);

    // Colocando título no elemento
    tituloNota.textContent = `Nota ${qtdNotas + 1}`;

    // Loop para o iterar sobre cada elemento na tabela e adicionar o campo nota antes desse elemento
    for (let indice = 0; indice < qtdAlunos; indice++) {

        // Criando elementos
        const novaColunaNota = document.createElement('td');
        const novoCampoNota = document.createElement('input');

        novoCampoNota.type = 'number';

        // Colocando classes nos elementos
        tituloNota.className = 'nota';
        novoCampoNota.className = 'campo-nota';

        // Adicionando o input dentro da coluna
        novaColunaNota.appendChild(novoCampoNota);

        // Adicionando os elementos das notas de acordo com a lista de classes
        const mediaAluno = document.getElementsByClassName('media-aluno')[indice];
        mediaAluno.parentNode.insertBefore(novaColunaNota, mediaAluno);

    }


}

// Funções para trabalhar com a quantidade de alunos e notas presentes na tabela
function quantidadeAlunos() {
    return document.querySelectorAll('.id-aluno').length;
}

function quantidadeNotas() {
    return document.querySelectorAll('.nota').length
}

// Verificando se existe algum input Vazio
function verificaVazio() {
    const inputs = document.getElementsByTagName('input');

    for (let i = 0; i < inputs.length; i++) {

        if (inputs[i].value === '') {
            return true;
        }

    }

    return false;
}

/*
----------------------------- Calculando média --------------------------------------
*/

// Usando classe para construir objetos que vão representar os alunos e suas notas
class Aluno {

    constructor(id, nome, notas) {
        this.id = id;
        this.nome = nome;
        this.notas = notas;
    }

    // Obter a média dos alunos
    media() {
        const soma = this.notas.map(Number).reduce((acumulador, valorAtual) => {
            return acumulador + valorAtual;
        }, 0)

        return soma / this.notas.length;
    }

    retornaSituacao() {

        if (this.media() >= 70) return 'Aprovado';

        if (this.media() <= 49) return 'Reprovado'

        return 'Recuperação'

    }
}

/*
------------------- Usando loops para criar e preencher os objetos ------------------

    Craindo um array de objetos que vai reprsentar os alunos.
*/

function listaDeAlunos() {

    // Craindo um array de objetos -> lista de alunos
    const alunosLista = [];

    // Pegando a quantidade de alunos e notas:
    let qtdAlunos = quantidadeAlunos();
    let qtdNotas = quantidadeNotas();

    /*
        A variável abaixo foi criada para percorrer todos os inputs da nota

        Explicação: A idéia é fazer dois loops um dentro do outro, primeiro loop, 
        serve para preencher o array com objetos.

        o segundo loop é para preencher o array de notas que vai ficar dentro de 
        cada objeto da lista de aluno

        só que o segundo loop percorre de acordo com a quantidade de notas começando 
        sempre por zero então ele sempre vai capturar notas do input 0 até o numero 
        de notas. Isso gera um erro pois ele só vai percorrer e pegar as notas do 
        primeiro aluno e gera o efeito de todos os alunos possuírem a mesma nota.

        a forma que encontrei de solucionar o problema foi criar um contador 
        independente dos dois loops, assim ele vai incrementando toda vez sem o 
        valor resetar para zero como é o caso do iterador padrão do loop toda vez
        que é iniciaclizado.
        
    */

    // Contador independente
    let contador = 0;

    // Loop para preencher os objetos e colocar eles no array
    for (let i = 0; i < qtdAlunos; i++) {

        // Array que vai guardar as notas dos alunos
        let arrayNotas = [];

        // Pegando os elemetos do DOM
        let id = document.getElementsByClassName('id-aluno')[i].innerText;
        let nome = document.getElementsByClassName('campo-nome')[i].value;

        // Array responsável por pegar as notas de cada aluno e guardar dentro de um array
        for (let j = 0; j < qtdNotas; j++) {

            let nota = document.getElementsByClassName('campo-nota')[contador].value;

            if (validarNumeros(nota)) {
                arrayNotas.push(nota);
                contador++;
            } else {
                alert('OS CAMPOS DE NOTAS DEVE TER SOMENTE NÚMEROS INTEIROS.');
                return;
            }


        }


        // criando um novo objeto aluno e adicionando no array de objetos
        let novoAluno = new Aluno(id, nome, arrayNotas);
        alunosLista.push(novoAluno);

        // Apresentando a média e a situação
        let media_aluno = document.getElementsByClassName('media-aluno')[i];
        media_aluno.innerText = alunosLista[i].media();

        let situacao = document.getElementsByClassName('situacao-aluno')[i];

        // Verificando se o aluno esta aprovado ou não
        if (alunosLista[i].retornaSituacao() === 'Aprovado') {
            situacao.innerText = 'Aprovado';
            situacao.style.backgroundColor = 'green';
            situacao.style.color = 'white';
        } else if (alunosLista[i].retornaSituacao() === 'Reprovado') {
            situacao.innerText = 'Reprovado';
            situacao.style.backgroundColor = 'red';
            situacao.style.color = 'white';
        } else {
            situacao.innerText = 'Recuperação';
            situacao.style.backgroundColor = 'yellow';
            situacao.style.color = 'black';
        }

    }

    return alunosLista;

}

// Função para validar o input recebido
function validarNumeros(string) {
    var regex = /^[0-9]+$/; // Expressão regular para verificar se contém apenas números
    return regex.test(string);
}

// Função para ordernar em ordem alfabética
function ordemAlfabetica(vetor) {
    vetor.sort((a, b) => a.nome.localeCompare(b.nome));

    let contador = 0;

    const qtdAlunos = quantidadeAlunos();
    const qtdNotas = quantidadeNotas();

    for (let i = 0; i < qtdAlunos; i++) {

        // Pegando os elemetos do DOM
        let id = document.getElementsByClassName('id-aluno')[i];
        let nome = document.getElementsByClassName('campo-nome')[i];

        id.innerHTML = vetor[i].id;
        nome.value = vetor[i].nome;

        // Array responsável por pegar as notas de cada aluno e guardar dentro de um array
        for (let j = 0; j < qtdNotas; j++) {

            let nota = document.getElementsByClassName('campo-nota')[contador];

            nota.value = vetor[i].notas[j];

            contador++;

        }


        // Apresentando a média e a situação
        let media_aluno = document.getElementsByClassName('media-aluno')[i];
        media_aluno.innerHTML = vetor[i].media();

        let situacao = document.getElementsByClassName('situacao-aluno')[i];

        // Verificando se o aluno esta aprovado ou não
        if (vetor[i].retornaSituacao() === 'Aprovado') {
            situacao.innerText = 'Aprovado';
            situacao.style.backgroundColor = 'green';
            situacao.style.color = 'white';
        } else if (vetor[i].retornaSituacao() === 'Reprovado') {
            situacao.innerText = 'Reprovado';
            situacao.style.backgroundColor = 'red';
            situacao.style.color = 'white';
        } else {
            situacao.innerText = 'Recuperação';
            situacao.style.backgroundColor = 'yellow';
            situacao.style.color = 'black';
        }

    }
}

// function para ordenar em média crescente
function ordemCrescente(vetor) {
    vetor.sort((a, b) => a.media() - b.media());
    console.log(vetor);

    let contador = 0;

    const qtdAlunos = quantidadeAlunos();
    const qtdNotas = quantidadeNotas();

    for (let i = 0; i < qtdAlunos; i++) {

        // Pegando os elemetos do DOM
        let id = document.getElementsByClassName('id-aluno')[i];
        let nome = document.getElementsByClassName('campo-nome')[i];

        id.innerHTML = vetor[i].id;
        nome.value = vetor[i].nome;

        // Array responsável por pegar as notas de cada aluno e guardar dentro de um array
        for (let j = 0; j < qtdNotas; j++) {

            let nota = document.getElementsByClassName('campo-nota')[contador];

            nota.value = vetor[i].notas[j];

            contador++;

        }


        // Apresentando a média e a situação
        let media_aluno = document.getElementsByClassName('media-aluno')[i];
        media_aluno.innerHTML = vetor[i].media();

        let situacao = document.getElementsByClassName('situacao-aluno')[i];

        // Verificando se o aluno esta aprovado ou não
        if (vetor[i].retornaSituacao() === 'Aprovado') {
            situacao.innerText = 'Aprovado';
            situacao.style.backgroundColor = 'green';
            situacao.style.color = 'white';
        } else if (vetor[i].retornaSituacao() === 'Reprovado') {
            situacao.innerText = 'Reprovado';
            situacao.style.backgroundColor = 'red';
            situacao.style.color = 'white';
        } else {
            situacao.innerText = 'Recuperação';
            situacao.style.backgroundColor = 'yellow';
            situacao.style.color = 'black';
        }

    }
}

// function para ordenar em média crescente
function ordemDecrescente(vetor) {
    vetor.sort((a, b) => b.media() - a.media());
    console.log(vetor);

    let contador = 0;

    const qtdAlunos = quantidadeAlunos();
    const qtdNotas = quantidadeNotas();

    for (let i = 0; i < qtdAlunos; i++) {

        // Pegando os elemetos do DOM
        let id = document.getElementsByClassName('id-aluno')[i];
        let nome = document.getElementsByClassName('campo-nome')[i];

        id.innerHTML = vetor[i].id;
        nome.value = vetor[i].nome;

        // Array responsável por pegar as notas de cada aluno e guardar dentro de um array
        for (let j = 0; j < qtdNotas; j++) {

            let nota = document.getElementsByClassName('campo-nota')[contador];

            nota.value = vetor[i].notas[j];

            contador++;

        }


        // Apresentando a média e a situação
        let media_aluno = document.getElementsByClassName('media-aluno')[i];
        media_aluno.innerHTML = vetor[i].media();

        let situacao = document.getElementsByClassName('situacao-aluno')[i];

        // Verificando se o aluno esta aprovado ou não
        if (vetor[i].retornaSituacao() === 'Aprovado') {
            situacao.innerText = 'Aprovado';
            situacao.style.backgroundColor = 'green';
            situacao.style.color = 'white';
        } else if (vetor[i].retornaSituacao() === 'Reprovado') {
            situacao.innerText = 'Reprovado';
            situacao.style.backgroundColor = 'red';
            situacao.style.color = 'white';
        } else {
            situacao.innerText = 'Recuperação';
            situacao.style.backgroundColor = 'yellow';
            situacao.style.color = 'black';
        }

    }
}
