const caixa = document.getElementById('caixa')

const link = document.getElementById('link')

const personagem = document.getElementById('personagem')

const placar = document.getElementById('placar')

const pegarParametrosCss = (elemento) => {

    let elementoEstilo = window.getComputedStyle(elemento)

    return {

        altura : Number(elementoEstilo.height.replace('px', '')) ,
        largura : Number(elementoEstilo.width.replace('px', '')),

        y : Number(elementoEstilo.top.replace('px', '')),
        x : Number(elementoEstilo.left.replace('px', ''))
    }
}

const centralizarElemento = (filhoElemento, paiElemento, incrementoY = 0, incrementoX = 0) =>{

    let paiParametros = pegarParametrosCss(paiElemento)
    let filhoParametros = pegarParametrosCss(filhoElemento)

    filhoElemento.style.top = paiParametros.altura/2-filhoParametros.altura/2+incrementoY+'px'
    filhoElemento.style.left = paiParametros.largura/2-filhoParametros.largura/2+incrementoX+'px'
}

const moverPersonagem = (filhoElemento, paiElemento, incrementoY, incrementoX) => {

    let paiParametros = pegarParametrosCss(paiElemento)
    let filhoParametros = pegarParametrosCss(filhoElemento) 

    if( incrementoY < 0){

        incrementoY = paiParametros.altura - filhoParametros.altura

    }else if( incrementoY + filhoParametros.altura>paiParametros.altura){

        incrementoY = 0
    }

    if( incrementoX < 0){

        incrementoX = paiParametros.largura - filhoParametros.largura

    }else if( incrementoX + filhoParametros.largura> paiParametros.largura){

        incrementoX = 0

    }

    personagem.style.top = incrementoY + 'px'
    personagem.style.left = incrementoX + 'px'

    verificarColisao(filhoElemento, link)
    
}

const verificarColisao = (elementoMaior, elementoMenor) => {

    let elementoMaiorParametros = pegarParametrosCss(elementoMaior)
    let elementoMenorParametros = pegarParametrosCss(elementoMenor)

    if(
        (
            elementoMenorParametros.y >= elementoMaiorParametros.y &&
            elementoMenorParametros.y < elementoMaiorParametros.y + elementoMaiorParametros.altura

            ||

            elementoMenorParametros.y +  elementoMenorParametros.altura >= elementoMaiorParametros.y&&
            elementoMenorParametros.y +  elementoMenorParametros.altura < elementoMaiorParametros.y + elementoMaiorParametros.altura
        )
        
        &&

        (
            elementoMenorParametros.x >= elementoMaiorParametros.x &&
            elementoMenorParametros.x < elementoMaiorParametros.x + elementoMaiorParametros.largura

            ||

            elementoMenorParametros.x +  elementoMenorParametros.largura >= elementoMaiorParametros.x&&
            elementoMenorParametros.x +  elementoMenorParametros.largura < elementoMaiorParametros.x + elementoMaiorParametros.largura
        )
    ){

        pontuar(placar)
        deslocarAleatoriamenteElemento(caixa, link)

    }
}

const deslocarAleatoriamenteElemento = (paiElemento, filhoElemento) => {

    let paiParametros = pegarParametrosCss(paiElemento)
    let filhoParametros = pegarParametrosCss(filhoElemento)

    let maxY = paiParametros.altura - filhoParametros.altura
    let maxX = paiParametros.largura- filhoParametros.largura

    let minXY = 0

    filhoElemento.style.top = parseInt(Math.random() *
        (maxY - minXY) + minXY) +'px'

    filhoElemento.style.left = parseInt(Math.random() *
        (maxX - minXY) + minXY) +'px'

    verificarColisao(personagem, link)
}

const pontuar = (placarElemento) => {

    placarElemento.innerText = Number(placarElemento.innerText)+1
}

document.onkeydown = (e) =>{

    let y = Number(personagem.style.top.replace('px', ''))
    let x = Number(personagem.style.left.replace('px', ''))

    let velocidade = 15

    switch(e.key){

        case 'ArrowUp':

            y -= velocidade

            break

        case 'ArrowDown':

            y += velocidade

            break

        case 'ArrowLeft':

            x -= velocidade
            personagem.style.transform = 'scaleX(-1)'

            break

        case 'ArrowRight':

            x += velocidade
            personagem.style.transform = 'scaleX(1)'

            break
       
    }

    moverPersonagem(personagem, caixa, y, x)
}

centralizarElemento(personagem, caixa)
centralizarElemento(link, caixa, -200)

setInterval(()=>{deslocarAleatoriamenteElemento(caixa, link)}, 3000);