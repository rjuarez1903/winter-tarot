const d                    = document
const body                 = d.querySelector('body')
const header               = d.querySelector('header')
const form                 = d.querySelector('#form')
const validacion           = d.querySelector('#validacion')
const loadScreen           = d.querySelector('#load-screen')
const footer               = d.querySelector('footer')
const cartas               = d.querySelector('#cartas')
const modal                = d.querySelector('.modal')
const jugador1             = d.querySelector('#nombre-jugador-1')
const jugador2             = d.querySelector('#nombre-jugador-2')
const btnTirarDeNuevo      = d.querySelector('#btn-tirar-de-nuevo')
const carousel             = d.querySelector('.carousel-inner')
const indicators           = d.querySelectorAll('.indicator')
const slide1               = d.querySelector('.carousel-indicators :nth-child(1)')      
const btnGuardar           = d.querySelector('#guardar')
const btnSalir             = d.querySelector('#salir')
const btnVolver            = d.querySelector('#volver')
const resultados           = d.querySelector('#resultados')
const resultados1          = d.querySelector('#resultados1')
const resultados2          = d.querySelector('#resultados2')
const match                = d.querySelector('#match')
const player1Resultados    = d.querySelector('#player-1-resultados')
const player2Resultados    = d.querySelector('#player-2-resultados')
const juegosGuardados      = d.querySelector('#juegos-guardados')
const resultadosAnteriores = d.querySelector('#resultados-anteriores')
let guardado               = false
let juego                  = {}
let juegos                 = []
let matchean

const generarArray = () => {
    cartasPlayers = []
    let i       = 0
    let num     = Math.round(Math.random()*20)
    
    while (i < 6) {
        let loTiene = cartasPlayers.find(function(item) {
            return item === num
        })
        if (loTiene == undefined) {
            cartasPlayers.push(num)
            i++
        }
        num = Math.round(Math.random()*20)
    }

    console.log(`Cartas: ${cartasPlayers}`)
    return cartasPlayers
}

const loader = () => {
    if (jugador1.value && jugador2.value) {
        header.style.display = 'none'      
        form.style.display   = 'none'
        footer.style.display = 'none'  
        loadScreen.className = 'd-flex vh-100 align-items-center justify-content-center'
        if (juegosGuardados.className == 'd-block mt-3') {
            juegosGuardados.className = 'd-none'
        }
        setTimeout( () => {
            mostrarCartas() 
        }, 3000)
    } else {
        console.log('Falta ingresar datos')
        validacion.className = 'd-block text-center fw-bold mt-3 bg-gold gold-light'
    }
}

const renderCarousel = (cartasJugadores, player1, player2, guardado) => {
    let i                = 1
    let primerPlayer     = true
    header.style.display = 'none'      
    form.style.display   = 'none'
    footer.style.display = 'none'
    loadScreen.className = 'd-none'
    cartas.className     = 'd-flex spaces'
    carousel.innerHTML   = ''
    if (guardado == false) {
        btnTirarDeNuevo.className = 'btn-c btn-lg'
    } else {
        console.log('Viendo juego guardado')
        // btnTirarDeNuevo.classList.remove('d-block')
        btnTirarDeNuevo.className = 'd-none'
    }
        
    if (juegosGuardados.className == 'd-block mt-3') {
        juegosGuardados.className = 'd-none'
    }

    for (let card of cartasJugadores) {
        let carouselItem     = d.createElement('div')
        let cardImgDiv       = d.createElement('div')
        let cardImg          = d.createElement('img')
        let btnClose         = d.createElement('button')
        let divJugador       = d.createElement('div')
        let icon             = d.createElement('img')
        let cuentaCarta      = d.createElement('h2')
        let nombreCarta      = d.createElement('h3')
        let divDescripcion   = d.createElement('div')
        let descripcionCarta = d.createElement('p')
        
        if (primerPlayer) {
            cuentaCarta.textContent   = `Carta ${i}/3 de ${player1}`
            icon.className            = 'icon'  
            icon.src                  = 'images/icon.svg'
            icon.alt                  = 'Icono de Atrapasueños'
        } else {
            cuentaCarta.textContent   = `Carta ${i}/3 de ${player2}`
            icon.className            = 'icon'
            icon.src                  = 'images/icon2.svg'
            icon.alt                  = 'Icono de Luna'
        }
        divJugador.className          = 'd-flex align-items-center gap-2'
        cuentaCarta.className         = 'gold mb-0' 
        carouselItem.className        = 'carousel-item'
        cardImgDiv.className          = 'card-img mx-auto mb-3 mt-3'
        cardImg.src                   = `images/${card}.jpg`
        cardImg.alt                   = cards[card].nombre
        cardImg.className             = 'd-block mx-auto'  
        nombreCarta.className         = 'text-center text-uppercase gold'
        nombreCarta.textContent       = cards[card].nombre
        divDescripcion.className      = 'txt-descripcion text-center p-3 mb-3 bg-gold d-flex align-items-center' 
        descripcionCarta.textContent  = cards[card].descripcion
        btnClose.className            = 'btn-close btn-close-white'
        btnClose.setAttribute('data-bs-toggle', 'modal')
        btnClose.setAttribute('data-bs-target', '#exampleModal')
        btnClose.setAttribute('aria-label', 'Close') 
        
        cardImgDiv.appendChild(cardImg)
        divJugador.append(icon, cuentaCarta)
        divDescripcion.appendChild(descripcionCarta)
        carouselItem.append(btnClose, divJugador, cardImgDiv, nombreCarta, divDescripcion)
        carousel.appendChild(carouselItem)
        if (i == 3) {
            i = 0
            primerPlayer = false
        }
        i++
    }
    carousel.firstElementChild.className = 'carousel-item active'
}

const mostrarCartas = () => {

    if (jugador1.value && jugador2.value) {
        console.log('Juego nuevo')
        if (guardado == true) {
            guardado = false
        }
        player1              = jugador1.value
        player2              = jugador2.value  
        let cartasJugadores  = generarArray()
        let cartasJugador1   = cartasJugadores.slice(0,3)
        let cartasJugador2   = cartasJugadores.slice(3)
        juego = {
            jugador1: player1,
            jugador2: player2,
            cartas1:  cartasJugador1,
            cartas2:  cartasJugador2, 
            cartas:   cartasJugadores
        }
        juegos.push(juego)
        console.log(`Cartas ${player1}: ${cartasJugador1}`)
        console.log(`Cartas ${player2}: ${cartasJugador2}`)
        renderCarousel(cartasJugadores, player1, player2, guardado)
        validacion.className = 'd-none'
        jugador1.value       = ''
        jugador2.value       = ''
        guardado             == false
    } else {
        console.log('Falta ingresar datos')
        validacion.className = 'd-block text-center fw-bold mt-3 bg-gold gold-light'
    }
} 

const tirarDeNuevo = () => {
    juego.cartas = generarArray()
    console.log(`Cartas ${player1}: ${juego.cartas1}`)
    console.log(`Cartas ${player2}: ${juego.cartas2}`)
    renderCarousel(juego.cartas, player1, player2, guardado)
    modal.style.display = 'none'
    body.lastChild.remove()
}

const sumArr = (arr) => {
    let sum = 0
    for (i of arr) {
        sum += i
    }
    return sum
}

const matchear = () => {
    let suma1 = sumArr(juego.cartas1)
    let suma2 = sumArr(juego.cartas2)
    if ((suma1 % 2 == 0) && (suma2 % 2 == 0)) {
        console.log('Matchean')
        match.textContent = 'SI'
        matchean          = 'Si'
    } else {
        console.log('No matchean')
        match.textContent = 'NO'
        matchean          = 'No'
    }
    return matchean 
}

const jugarDeNuevo = () => {
    console.log('El Universo baraja y se prepara para tirar las cartas una vez más...')
    if (modal.style.display == 'block') {
        body.lastChild.remove()
        body.className       = ''
        body.style           = ''
        modal.style.display  = 'none'
        cartas.className     = 'd-none'
    } else {
        resultados.className = 'd-none'
    }
    header.style.display = 'block'      
    form.style.display   = 'block'
    footer.style.display = 'block'
    carousel.innerHTML   = ''
    if (slide1.className   == 'indicator') {
        slide1.className   = 'indicator active'
        slide1.ariaCurrent = 'true'
    }
    for (let i = 1; i < indicators.length; i++) {
        if (indicators[i].className   == 'indicator active') {
            indicators[i].className   = 'indicator'
            indicators[i].ariaCurrent = ''
        }
    }
}

const volver =  () => {
    console.log('El Universo baraja y se prepara para tirar las cartas una vez más...')

    if (modal.style.display == 'block') {
        body.lastChild.remove()
        body.className       = ''
        body.style           = ''
        modal.style.display  = 'none'
        cartas.className     = 'd-none'
    } else {
        resultados.className = 'd-none'
    }

    header.style.display = 'block'      
    form.style.display   = 'block'
    footer.style.display = 'block'
    juegosGuardados.className = 'd-block'
    carousel.innerHTML   = ''
    
    if (slide1.className   == 'indicator') {
        slide1.className   = 'indicator active'
        slide1.ariaCurrent = 'true'
    }

    for (let i = 1; i < indicators.length; i++) {
        if (indicators[i].className   == 'indicator active') {
            indicators[i].className   = 'indicator'
            indicators[i].ariaCurrent = ''
        }
    }
}

const reset = () => {
    juegosGuardados.className= 'd-none'
}

const mostrarResultados = (cartasJugadores, jugador1, jugador2) => {
    body.lastChild.remove()
    resultados1.innerHTML = ''
    resultados2.innerHTML = ''
    body.className        = ''
    body.style            = ''
    resultados.className  = 'd-block spaces gold'
    modal.style.display   = 'none'
    cartas.className      = 'd-none'
    player1Resultados.textContent = jugador1 
    player2Resultados.textContent = jugador2
    if (guardado == true) {
        btnVolver.classList      = 'btn-c w-100 d-block'
        btnGuardar.style.display = 'none'
        btnSalir.style.display   = 'none'
    } else {
        btnGuardar.style.display = 'block'
        btnSalir.style.display = 'block'
        btnVolver.classList = 'd-none'
    }
    for (let i = 0; i < 6; i++)  {
        let thumbnail = d.createElement('img')
        thumbnail.src = `images/${cartasJugadores[i]}.jpg`
        thumbnail.className = 'mb-2 mx-2'
        
        if (i < 3) {
            resultados1.appendChild(thumbnail)
        } else {
            resultados2.appendChild(thumbnail)
        }
    }
    matchear()
}

const guardar = () => {
    guardado                  = true
    juegosGuardados.className = 'd-block mt-3'
    let juegoGuardado         = d.createElement('li')
    let jugadores             = d.createElement('p')
    let verAnteriores         = d.createElement('button')
    juegoGuardado.className   = 'd-flex justify-content-between align-items-center py-2'
    jugadores.className       = 'mb-0'
    jugadores.textContent     = `${juego.jugador1} & ${juego.jugador2}`
    verAnteriores.className   = 'btn-c'
    verAnteriores.textContent = 'Ver'
    verAnteriores.setAttribute('onclick', `renderCarousel([${juego.cartas}], "${juego.jugador1}", "${juego.jugador2}", "${guardado}")`)
    verAnteriores.setAttribute('data-jugador1', `${juego.jugador1}`)
    verAnteriores.setAttribute('data-jugador1', `${juego.jugador2}`)
    juegoGuardado.append(jugadores, verAnteriores)
    resultadosAnteriores.append(juegoGuardado)
    jugarDeNuevo() 
}