var quadrados = document.querySelectorAll('.quadrado')
var escolhaDoJogador = document.querySelectorAll('.simbolo')
const campoEscolhaSimbolo = document.querySelector('.escolha')

var jogada = 1
var lista = [0,1,2,3,4,5,6,7,8]
var jogadorUm = ''
var jogadorDois = ''

function escolhaDoSimbolo() {
    escolhaDoJogador.forEach((elemento => {
        elemento.addEventListener('click', function(){

            if (elemento.innerText == 'X') {
                jogadorUm = elemento.innerText
                jogadorDois = 'O'

            } else {
                jogadorUm = elemento.innerText
                jogadorDois = 'X'
                
            }

            campoEscolhaSimbolo.classList.add('sumir')

        })

    }))
}
escolhaDoSimbolo()

function jogadaDoJogador(){
    quadrados.forEach((item) => {
        item.addEventListener('click', function() {

            var primeiroJogador = jogada % 2 !== 1

            if(item.innerText.length > 0) {
                alert('Campo ja escolhido')

            } else {

                if(primeiroJogador) {
                    jogada++
                    item.innerText = jogadorDois
                    verificarSeGanhou(item.id[8], jogadorDois)
                    
                } else {
                    jogada++
                    item.innerText = jogadorUm
                    
                    verificarSeGanhou(item.id[8], jogadorUm)
                }
            }

        })
    })
}
jogadaDoJogador()

function verificarSeGanhou(posicao, texto) {
    lista[posicao - 1] = texto

    if(quadradosEscolhidos(0, 1, 2) || quadradosEscolhidos(0, 4, 8) || quadradosEscolhidos(0, 3, 6) || quadradosEscolhidos(1, 4, 7)
        || quadradosEscolhidos(2, 4, 6) || quadradosEscolhidos(2, 5, 8) || quadradosEscolhidos(3, 4, 5)  || quadradosEscolhidos(6, 7, 8)) {
        quadrados.forEach((item) => {
            item.innerText = ''
        })
        lista = [0,1,2,3,4,5,6,7,8]
    }
}

function quadradosEscolhidos(posicao1, posicao2, posicao3) {
    const quadrado1 = lista[posicao1]
    const quadrado2 = lista[posicao2]
    const quadrado3 = lista[posicao3]

    if(quadrado1 == quadrado2 && quadrado1 == quadrado3) {
        return true
    } else {
        return false
    }
}