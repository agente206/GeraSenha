//valor inicial de caracteres e armazenamento da quantidade definida pelo usúario
const numeroSenha = document.querySelector('.parametro-senha-texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
//Aqui estão os caracteres que poderam ser usados para criar as senhas
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#%*?';
const botoes = document.querySelectorAll('.parametro-senha-botao');
//Aqui estamos pegando as informações do HTML que precisamos
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

//Aqui acontece a + ou - da quantidade de caracteres
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;
function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha = tamanhoSenha - 1;
        //outra sintax para a mesma [tamanhoSenha--;]
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}
function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha = tamanhoSenha + 1;
        //outra sintax para a mesma [tamanhoSenha++;]
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

//Aqui o gerador de senhas:
for (i = 0; i < checkbox.length;i++) {
    checkbox[i].onclick = geraSenha;
}

geraSenha();

//Aqui está toda a função que criará a senha
function geraSenha() {
    //Aqui estamos crindo uma variavel que carregara todas as possibilidades de caracteres que poderam ser usadas para a criação da senha
    let alfabeto = '';
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    }

    //Aqui está o responsável por fazer a senha
    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

function classificaSenha (tamanhoAlfabeto){
    //formula da entropia 'H = L * log2(N)'
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    forcaSenha.classList.remove('fraca','media','forte');
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && tamanhoSenha < 57) {
        forcaSenha.classList.add('media');
    } else if (entropia < 35) {
        forcaSenha.classList.add('fraca');
    }
    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = "Um computador pode levar até " + Math.floor(2**entropia/(100e6*60*60*24)) + " dias para descobrir essa senha";
}