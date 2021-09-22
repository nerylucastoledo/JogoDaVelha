const celulas = document.querySelectorAll('.quadrado')
const placar = document.querySelector('.placar')
const vitoriaJogadorUm = document.getElementById('vitoria-jogador-um')
const vitoriaJogadorDois = document.getElementById('vitoria-jogador-dois')
const campoQuemGanhou = document.querySelector('.vitorioso')
const textoJogadorQueGanhou = document.querySelector('.texto-vitoria')

var simboloJogadorUm = ''
var simboloJogadorDois = ''

var jogada = 1
var lista = [0,1,2,3,4,5,6,7,8]
var qntdVitoriasJogadorUm = 0
var qntdVitoriasJogadorDois = 0

function escolherSimboloDoJogadorUmEDois() {

    const simboloDeCadaJogador = document.querySelectorAll('.simbolo')
    const campoEscolherSimbolo = document.querySelector('.escolha')

    simboloDeCadaJogador.forEach((simbolo) => {
        simbolo.addEventListener('click', () => {

            if(simbolo.innerText === 'X') {
                simboloJogadorUm = 'X'
                simboloJogadorDois = 'O'

            } else {
                simboloJogadorUm = 'O'
                simboloJogadorDois = 'X'
            }

            campoEscolherSimbolo.style.display = 'none'
            placar.style.display = 'flex'

            mostrarOProximoJogador()
            jogadaDoUsuario()
        })
    })
}
escolherSimboloDoJogadorUmEDois()

function mostrarOProximoJogador() {

    const vezDoJogador = document.querySelector('.vez-de-jogar')

    if(jogada % 2 !== 0) {
        vezDoJogador.innerText = `É a vez do Jogador 1`
    } else {
        vezDoJogador.innerText = `É a vez do Jogador Dois`
    }
}

function jogadaDoUsuario() {

    celulas.forEach((celula) => {
        celula.addEventListener('click', () => {

            if(celula.innerText.length > 0) {
                alert('Celula ja escolhida')

            } else {
                const celulaClicada = celula.id[8]
                var vezDoJogadorUm = jogada % 2 !== 0

                if(vezDoJogadorUm) {
                    celula.innerText = simboloJogadorUm
                    celula.style.color = "rgb(22, 189, 189)"
                    jogada++

                    mostrarOProximoJogador()
                    verificarSeGanhou(celulaClicada, simboloJogadorUm, 'jogadorUm')

                } else {
                    celula.innerText = simboloJogadorDois
                    celula.style.color = "rgb(28, 54, 54)"
                    jogada++

                    mostrarOProximoJogador()
                    verificarSeGanhou(celulaClicada, simboloJogadorDois, 'jogadorDois')
                }
            }

        })
    })

}

function verificarSeGanhou(posicao, simbolo, jogador) {
    lista[posicao] = simbolo

    if (celulasEscolhidas(0, 1, 2) || celulasEscolhidas(0, 4, 8) || celulasEscolhidas(0, 3, 6) || celulasEscolhidas(1, 4, 7)
        || celulasEscolhidas(2, 4, 6) || celulasEscolhidas(2, 5, 8) || celulasEscolhidas(3, 4, 5)  || celulasEscolhidas(6, 7, 8)) {
        
        campoQuemGanhou.style.display = 'block'

        if(jogador === 'jogadorUm') {
            qntdVitoriasJogadorUm++
            vitoriaJogadorUm.innerText = qntdVitoriasJogadorUm
            textoJogadorQueGanhou.innerText = 'Jogador 1 ganhou!'
            
            reiniciarJogo()

        } else {
            qntdVitoriasJogadorDois++
            vitoriaJogadorDois.innerText = qntdVitoriasJogadorDois
            textoJogadorQueGanhou.innerText = 'Jogador 2 ganhou!'

            reiniciarJogo()
        }

        setTimeout(() => {
            celulas.forEach((item) => {
                item.innerText = ''
                item.style.backgroundColor = '#f5f1f1'
            })
        }, 500)
    }

    if(jogada === 10) {
        setTimeout(() => {
            celulas.forEach((item) => {
                item.innerText = ''
            })
        }, 500)

        textoJogadorQueGanhou.innerText = 'Empate!'

        reiniciarJogo()
    }
}

function celulasEscolhidas(posicao1, posicao2, posicao3) {
    const quadrado1 = lista[posicao1]
    const quadrado2 = lista[posicao2]
    const quadrado3 = lista[posicao3]

    if(quadrado1 == quadrado2 && quadrado1 == quadrado3) {
        celulas[posicao1].style.backgroundColor = '#a9eca9'
        celulas[posicao2].style.backgroundColor = '#a9eca9'
        celulas[posicao3].style.backgroundColor = '#a9eca9'
        
        return true

    } else {
        return false
    }
}

function reiniciarJogo() {
    lista = [0,1,2,3,4,5,6,7,8]
    jogada = 1
    mostrarOProximoJogador()
}