// Matriz para organizar o nome do alunos, as notas e a médias
let alunos = []
// A Tabela inicialmente começara com 2 alunos e 3 notas para cada
let qtd_alunos = 2
let qtd_notas = 3
let soma = 0
// Média geral da Sala
let soma_geral = 0
let media_geral = 0

function calcular(){
    
    //Loop para inserir alunos na mattriz
    for(let i = 1; i <= qtd_alunos; i++){
        alunos[i-1] = []
        //Resgatando o nome dos alunos e o ID
        alunos[i-1].push(i)
        alunos[i-1].push(document.getElementById(`nome${i}`).value)
        // loop para resgatar as notas de cada aluno
        for(let j = 1; j <= qtd_notas; j++){
            //Usando loop para selecionar o ekemento HTML específico
            alunos[i-1].push(Number(document.getElementById(`nota${j}.${i}`).value))
            soma = soma + alunos[i-1][j+1]
        }
        // Inserindo a média do aluno na matriz
        alunos[i-1].push(soma / qtd_notas)
        soma = 0
        // Soma da média geral da sala
        soma_geral = soma_geral + alunos[i-1][alunos[i-1].length-1]
    }

    // Situação do aluno
    for(i = 1; i <= qtd_alunos; i++){
        // Pegar a média do aluno
        document.getElementById(`media_aluno${i}`).innerHTML = alunos[i-1][alunos[i-1].length-1]

        if(alunos[i-1][alunos[i-1].length-1] > 50){
            document.getElementById(`situacao${i}`).innerHTML = `Aprovado`
            document.getElementById(`situacao${i}`).style.backgroundColor = 'green'
            alunos[i-1].push('Aprovado')

        }else if(alunos[i-1][alunos[i-1].length-1] < 45){
            document.getElementById(`situacao${i}`).innerHTML = `Reprovado` 
            document.getElementById(`situacao${i}`).style.backgroundColor = 'red'
            alunos[i-1].push('Reprovado')

        }else{
            document.getElementById(`situacao${i}`).innerHTML = `Recuperação`
            document.getElementById(`situacao${i}`).style.backgroundColor = 'yellow'
            alunos[i-1].push('Recuperação')
        }

    }

    media_geral = soma_geral / qtd_alunos

    // Apresentando a média geral da sala
    document.getElementById('media_geral').innerHTML = media_geral
    if(media_geral > 50){
        document.getElementById('colmedia').style.backgroundColor = 'green'
        document.getElementById('media_geral').style.color = 'white'
        document.getElementById('txt_media').style.color = 'white'
    }else if(media_geral < 45){
        document.getElementById('colmedia').style.backgroundColor = 'red'
        document.getElementById('media_geral').style.color = 'white'
        document.getElementById('txt_media').style.color = 'white'
    }else{
        document.getElementById('colmedia').style.backgroundColor = 'yellow'
        document.getElementById('media_geral').style.color = 'black'
        document.getElementById('txt_media').style.color = 'black'
    }
    soma_geral = 0

    console.log(alunos)
}

function ampliarLinha(){
    qtd_alunos++
    
    // A Quantidade máxima de alunos que podem ser inseridos são 10, então ele
    // Executa o loop redenrizando a tabela de acordo com a quantidade de alunos e notas
    if(qtd_alunos <= 10){
        document.getElementById('tbody').innerHTML = ``

        for(let i = 1; i <= qtd_alunos; i++ ){
            document.getElementById('tbody').innerHTML += `<tr id="tr${i}">
            <th>${i}</th>
            <td><input type="text" class="form-control" id="nome${i}" placeholder="nome"></td>`

            for(let j = 1; j <= qtd_notas; j++){
                document.getElementById(`tr${i}`).innerHTML += `<td><input type="number" class="form-control" id="nota${j}.${i}" placeholder=""></td>
                </tr>`
            }
            document.getElementById(`tr${i}`).innerHTML += `<td><output id="media_aluno${i}"></output></td>
            <td><output id="situacao${i}"></output></td>
        </tr>` 
            
        }
    }else{
        qtd_alunos = 10
        alert('Você atingiu o limite máximo de 10 alunos')
    }

    

}


function ampliarNotas(){
    qtd_notas++

    // Rederizar a tabela do zero de acordo com as quantidades de notas adicionadas
    if(qtd_notas <= 6){
        for(let j = 1; j <= qtd_alunos; j++){
            
            document.getElementById('trCampo').innerHTML = `<th scope="col">#</th>
    <th scope="col">Nome</th>`

            document.getElementById(`tr${j}`).innerHTML = `<th>${j}</th>
    <td><input type="text" class="form-control" id="nome${j}" placeholder="nome"></td>
    `
            for(let i = 1; i <= qtd_notas; i++){
                document.getElementById('trCampo').innerHTML += `<th scope="col">Nota ${i}</th>`
    
                document.getElementById(`tr${j}`).innerHTML += `<td><input type="number" class="form-control" id="nota${i}.${j}" placeholder=""></td>`
                
            }
            document.getElementById('trCampo').innerHTML += `<th scope="col" id="campo_media">Média</th>
            <th scope="col" id="campo_situacao">Situação</th>`
    
            document.getElementById(`tr${j}`).innerHTML += `<td><output id="media_aluno${j}"></output></td>
            <td><output id="situacao${j}"></output></td>`
        }
        
    }else{
        qtd_notas = 6
        alert('O máximo são seis notas')
    }
        
}

function ordemCres() {
    //Ordenando a matriz utilizando a função sort()
    alunos.sort(function(a, b) {
        return a[a.length - 2] - b[b.length - 2];
    });
    
    console.log(alunos)
    
    // Renderizar a tabela inteira novamente, mas com a matriz ordenada de forma crescente
    for(let i = 1; i <= qtd_alunos; i++){
        document.getElementById(`tr${i}`).innerHTML = `<th>${alunos[i-1][0]}</th>
        <td><input type="text" class="form-control" value="${alunos[i-1][1]}" id="nome${i}" placeholder="nome"></td>`

        //Renderizando os inputs com os valores das notas
        for(let j = 1; j <= qtd_notas; j++){
            document.getElementById(`tr${i}`).innerHTML += `<td><input type="number" class="form-control" value="${alunos[i-1][j+1]}" id="nota${j}.${i}" placeholder=""></td>`
        }

        // Renderizando o campo das média e da situação
        if(alunos[i-1][alunos[i-1].length-2] > 50){
            document.getElementById(`tr${i}`).innerHTML += `<td><output id="media_aluno${i}">${alunos[i-1][alunos[i-1].length-2]}</output></td>
        <td><output style="background-color: green;" id="situacao${i}">${alunos[i-1][alunos[i-1].length-1]}</output></td>`

        }else if(alunos[i-1][alunos[i-1].length-2] < 45){
            document.getElementById(`tr${i}`).innerHTML += `<td><output id="media_aluno${i}">${alunos[i-1][alunos[i-1].length-2]}</output></td>
        <td><output style="background-color: red;" id="situacao${i}">${alunos[i-1][alunos[i-1].length-1]}</output></td>`
        }else{
            document.getElementById(`tr${i}`).innerHTML += `<td><output id="media_aluno${i}">${alunos[i-1][alunos[i-1].length-2]}</output></td>
        <td><output style="background-color: yellow;" id="situacao${i}">${alunos[i-1][alunos[i-1].length-1]}</output></td>`
        }
        
        
        
    }
}

function ordemDec(){
    // A função é parecida com a função da ordenação crescente, só muda a forma da ordenação
    alunos.sort(function(a, b) {
        return b[b.length - 2] - a[a.length - 2];
    });

    console.log(alunos)

    for(let i = 1; i <= qtd_alunos; i++){
        document.getElementById(`tr${i}`).innerHTML = `<th>${alunos[i-1][0]}</th>
        <td><input type="text" class="form-control" value="${alunos[i-1][1]}" id="nome${i}" placeholder="nome"></td>`

        
        for(let j = 1; j <= qtd_notas; j++){
            document.getElementById(`tr${i}`).innerHTML += `<td><input type="number" class="form-control" value="${alunos[i-1][j+1]}" id="nota${j}.${i}" placeholder=""></td>`
        }

        if(alunos[i-1][alunos[i-1].length-2] > 50){
            document.getElementById(`tr${i}`).innerHTML += `<td><output id="media_aluno${i}">${alunos[i-1][alunos[i-1].length-2]}</output></td>
        <td><output style="background-color: green;" id="situacao${i}">${alunos[i-1][alunos[i-1].length-1]}</output></td>`
        }else if(alunos[i-1][alunos[i-1].length-2] < 45){
            document.getElementById(`tr${i}`).innerHTML += `<td><output id="media_aluno${i}">${alunos[i-1][alunos[i-1].length-2]}</output></td>
        <td><output style="background-color: red;" id="situacao${i}">${alunos[i-1][alunos[i-1].length-1]}</output></td>`
        }else{
            document.getElementById(`tr${i}`).innerHTML += `<td><output id="media_aluno${i}">${alunos[i-1][alunos[i-1].length-2]}</output></td>
        <td><output style="background-color: yellow;" id="situacao${i}">${alunos[i-1][alunos[i-1].length-1]}</output></td>`
        }
        
        
        
    }
    
}

function ordemAlfa(){
    // A função é parecida com a função da ordenação crescente, só muda a forma da ordenação
    alunos.sort(function(a, b) {
        return a[1].localeCompare(b[1]);
    });
    
    console.log(alunos)

      for(let i = 1; i <= qtd_alunos; i++){
        document.getElementById(`tr${i}`).innerHTML = `<th>${alunos[i-1][0]}</th>
        <td><input type="text" class="form-control" value="${alunos[i-1][1]}" id="nome${i}" placeholder="nome"></td>`

        
        for(let j = 1; j <= qtd_notas; j++){
            document.getElementById(`tr${i}`).innerHTML += `<td><input type="number" class="form-control" value="${alunos[i-1][j+1]}" id="nota${j}.${i}" placeholder=""></td>`
        }

        if(alunos[i-1][alunos[i-1].length-2] > 50){
            document.getElementById(`tr${i}`).innerHTML += `<td><output id="media_aluno${i}">${alunos[i-1][alunos[i-1].length-2]}</output></td>
        <td><output style="background-color: green;" id="situacao${i}">${alunos[i-1][alunos[i-1].length-1]}</output></td>`
        }else if(alunos[i-1][alunos[i-1].length-2] < 45){
            document.getElementById(`tr${i}`).innerHTML += `<td><output id="media_aluno${i}">${alunos[i-1][alunos[i-1].length-2]}</output></td>
        <td><output style="background-color: red;" id="situacao${i}">${alunos[i-1][alunos[i-1].length-1]}</output></td>`
        }else{
            document.getElementById(`tr${i}`).innerHTML += `<td><output id="media_aluno${i}">${alunos[i-1][alunos[i-1].length-2]}</output></td>
        <td><output style="background-color: yellow;" id="situacao${i}">${alunos[i-1][alunos[i-1].length-1]}</output></td>`
        }
        
        
        
    }
      
}