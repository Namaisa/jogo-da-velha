/* DECLARAÇÃO DE VARIÁVEIS */

// pegando subtitulo
let subtitulo = document.getElementById("subtitulo");

//selecionar células
let celulas = document.querySelectorAll(".celula");

// selecionando placar
let placar = document.getElementsByClassName("placar");
placar[0].style.color = "#851313";
placar[1].style.color = "#851313";

// incremento do placar
let incremento = 0;

// resolvendo problema do emoji
let emojiEscudoPlacar = document.getElementById("emojiEscudoPlacar");
emojiEscudoPlacar.innerText = "\🛡️";

/* FUNÇÕES */

// Iniciando jogo contra inteligência (não tão inteligente assim) artificial, ativada no clique
function jogarContraAI() {
    //esconder subtitulo 
    subtitulo.style.display = "none";

    // atribui a função clicandoAI à todas células da tabela
    celulas.forEach((celula) => {
        celula.addEventListener('click', clicandoAI);           
    })
}

function clicandoAI(evento) {
    // pega o nome do id da célula clicada
    let posicao = evento.target.id;

    // impede o jogo de funcionar, se clicarmos em uma célula preenchida
    if (tabuleiro[posicao] == '') {
        // inicia o jogo, está no documento game.js
        jogar(posicao);

        // não permite que a AI jogue quando o jogo acabar
        if ((gameOver == false) && (velha == false)) {
            // dá um delay para a AI jogar
            setTimeout(() => {
                // muda de jogador
                jogadorDaVez = 1;
                // inicia o jogo da AI, está no documento game.js
                jogoDaAI(posicao);
            }, 300) 
        }   
    }   
}

// inicia jogo local
function jogarContraAmigo() {
    //esconder subtitulo 
    subtitulo.style.display = "none";

    // atribui a função clicandoAI à todas células da tabela
    celulas.forEach((celula) => {
        celula.addEventListener('click', clicando);
    })
}

// detectar cliques
function clicando(evento) {
    let celulaClicada = evento.target; // o target do evento é o elemento que sofreu a ação, no caso a célula 
    let posicao = celulaClicada.id; // através do clique vai detectar o id da celula   
    jogar(posicao);
}

function jogar(posicao) {
    // verifica se celula está vazia antes para permitir jogada
    if (tabuleiro[posicao] == '') {

        // funcao jogando mostra aonde determinado jogador está clicando
        if (jogando(posicao)) {
    
            setTimeout(() => { // usamos o set timeout pois caso contrário o alert carrega antes de aparecer o emoji da última jogada
    
                // o if vai determinar qual emoji vai aparecer no alert de cada jogador
                if (jogadorDaVez == 0) {
                    let simboloMensagem = '\🛡️️';
                    alert(`Fim de jogo! O vencedor foi o jogador 1 ${simboloMensagem}`);
                    atualizarPlacar(jogadorDaVez);
                } else {
                    let simboloMensagem = '\⚔️';
                    alert(`Fim de jogo! O vencedor foi o jogador 2 ${simboloMensagem}`);
                    atualizarPlacar(jogadorDaVez);
                }
                // inicia nova jogada com delay
                setTimeout(() => {jogarNovamente()}, 300);              
            }, 500);
        }
        // esta função vai inserir o símbolo no elemento referente à posição indicada
        atualizarCelula(posicao);
    }
    // verifica se jogo deu velha, está no arquivo game.js
    deuVelha();     
}

function atualizarCelula(posicao) {
    /* no game, o tabuleiro já está com o símbolo do jogador dentro dele aqui vamos apenas 
    pegar o simbolo do da posição em questão e inserir na classe */
    let celula = document.getElementById(posicao);
    let simbolo = tabuleiro[posicao];
    celula.innerHTML = `<div class=${simbolo}></div>`; // class não precisa de aspas pois já vem com aspas do array tabuleiro
}

// avisa quando der velha no jogo e inicia nova jogada
function alertaVelha(velha) {
    if (velha == true) {
        setTimeout(() => {
            alert("Deu velha! 👵 Tente outra vez!");
            jogarNovamente();
        }, 300);                
    }
}

// pega o placar do cache do navegador, atualiza o placar no html e no cache do navegador
function atualizarPlacar(jogador) { 
    // vai pegar o valor que já estava no placar (varia de acordo com o jogador vencedor da última rodada)
    let incremento = localStorage.getItem(jogador);
    incremento++;
    // insere novo valor no html, varia de placar de acordo com o vencedor da última rodada
    placar[jogador].innerHTML = `<p>${incremento}</p>`;

    // armazena valor atual do placar
    if (jogador == 0) {
        localStorage.setItem(0, incremento);
    } else {
        localStorage.setItem(1, incremento);
    }

    // muda a cor do placar de acordo com o jogador que esta vencendo
    corDoPlacar();
}

function corDoPlacar() {
    // pega valores armazenados no placar
    let placarJ0 = localStorage.getItem(0);
    let placarJ1 = localStorage.getItem(1);

    // modifica as cores de acordo com os valores dos placares
    if (placarJ0 > placarJ1)  {
        placar[0].style.color = "#2a4ac9";
        placar[1].style.color = "#851313";
    } if (placarJ1 > placarJ0) {
        placar[0].style.color = "#851313";
        placar[1].style.color = "#2a4ac9";
    } else if (placarJ0 === placarJ1) {
        placar[0].style.color = "#2a4ac9";
        placar[1].style.color = "#2a4ac9";
    }
}
// inicia nova jogada sem atualizar o placar
function jogarNovamente() {
    // limpa todas as células no html
    celulas.forEach((celula)=> {
        celula.innerHTML = '';
    })
    // reseta game, está no arquivo game.js
    reiniciarGame();
}

function reiniciarJogo() {
    location.reload();  // função serve para reiniciar página
    localStorage.clear(); // limpa o cache
}