const localStorageKey = 'to-do-list-js'

//Função para validar se já existe uma tarefa com o mesmo nome
function validarNovaTarefa(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input').value
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true //se retornar true, a tarefa já existe
}

//Função para criação de nova tarefa
function novaTarefa(){
    let input = document.getElementById('input')
    input.style.border = ''

    if(!input.value){
        input.style.border = '1px solid red'
        alert('Digite algo para poder adicionar a sua lista de tarefas')
    } 
    else if(validarNovaTarefa()){ //função validarNovaTarefa retorna true, cai nessa condição
        alert('Já existe uma tarefa com esse nome');
    }
    else{
        //incrementar as tarefas no localStorage

        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey, JSON.stringify(values)) //vai transformar o json do console é uma string e mostrar na tela
        mostarTarefas()
        
    }
    input.value = ''
}

function mostarTarefas() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('list')
    list.innerHTML = ''

    for(let i = 0; i < values.length; i++){
        list.innerHTML += `<li>${values[i]['name']}<button id='btn-concluido' onclick='removerItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
      </svg></button></li>`
    }
}

function removerItem(data){ //data vai ser o valor do índice que está sendo excluído/marcado como concluído
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    mostarTarefas()
}

mostarTarefas()