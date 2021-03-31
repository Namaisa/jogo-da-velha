// iniciar variáveis
let tabuleiro = ['', '', '', '', '', '', '', '', ''];
let jogadorDaVez = 0;
let simbolo = ['o', 'x'];
let gameOver = false;
let velha = false;

let estadosDeVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function jogando(posicao) {
    // aqui indicamos que a posição clicada no tabuleiro agora terá o símbolo do jogador da vez
    tabuleiro[posicao] = simbolo[jogadorDaVez];
    // indicamos que o gameover agora passa a ser true se houve um vencedor retornou true 
    gameOver = houveVencedor();

    // neste if permirimos a jogada enquanto o jogo não termina
    if (gameOver == false) {
        // trocamos o jogador da vez
        jogadorDaVez = jogadorDaVez == 0 ? 1 : 0;
    }
    
    return gameOver;
}

function jogoDaAI(posicao) {
    
    if (gameOver == false) {
        // seleciona posição que AI jogará, dependendo da posição que o jogador anterior colocou
        // está no arquivo seletorTabuleiro.js
        seletorTabuleiro(posicao);
    }
}

function jogadaAleatoria(posicao) {
    let posicoesVazias = [];
    let indexSelecionado = 0;

    // verifica se há posições vazias no tabuleiro e insere os seus index no array posições vazias
    for (let index = 0; index < tabuleiro.length; index++) {
        if (tabuleiro[index] == '') {
            posicoesVazias.push(index);
        }  
    }
    // cria número aleatório de acordo com o tamanho do array posições vazias
    indexSelecionado = Math.round(Math.random() * posicoesVazias.length);
    // faz com que a posição seja o valor que está no index sorteado em posições vazias
    posicao = posicoesVazias[indexSelecionado]; 

    // caso posicão dê undefined, código sorteará outro index em posições vazias
    while (posicao == undefined) {
        indexSelecionado = Math.round(Math.random() * posicoesVazias.length);
        posicao = posicoesVazias[indexSelecionado];
    }
    // inicia a jogada com o número aleatório sendo a posição
    jogar(posicao);
}

// detecta se temos 3 simbolos iguais nas posições indicadas no array estados de vitória
function houveVencedor() {

    for(let index = 0; index < estadosDeVitoria.length; index++) {
        let sequencia = estadosDeVitoria[index];
        // Vamos selecionar as posições dentro dos arrays de estados de vitória
        // serão selecionadas todas as sequências que contenham números correspondentes ao id da celula clicada 
        let pos1 = sequencia[0];
        let pos2 = sequencia[1];
        let pos3 = sequencia[2];

        if ((tabuleiro[pos1] == tabuleiro[pos2]) 
            && (tabuleiro[pos1] == tabuleiro[pos3]) 
            && (tabuleiro[pos1] != '')) {
            return true;
        } 
    }
    return false;
}

// verifica se jogo deu velha
function deuVelha() {
    let contador = 0;
    
    // conta as posições vazias
    tabuleiro.forEach((posicao) => {
        if (posicao == '') {
            contador++;
        } 
        velha = contador == 0? true : false;
    })
    alertaVelha(velha);
    return velha;
}

// reseta o game
function reiniciarGame(){
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    jogadorDaVez = 0;
}