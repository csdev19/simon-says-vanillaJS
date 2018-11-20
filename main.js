
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const LAST_LEVEL = 15

class Juego {
    constructor() {
       this.initialize()
       this.generateSecuence()
       setTimeout(this.nextLevel, 1000)
    }

    initialize() {
        this.nextLevel = this.nextLevel.bind(this)
        this.selectColor = this.selectColor.bind(this)
        btnEmpezar.classList.add('hide')
        this.level = 1
        this.colores = {
            celeste,
            violeta,
            verde,
            naranja
        }
    }
    
    generateSecuence() {
        this.secuence = new Array(10).fill(0).map(n => Math.floor(Math.random()* 4))
    }

    nextLevel() {
        this.subLevel = 0
        this.lightSecuence()
        this.addEventClick()
    }

    transformNumerToColor(number) {
        switch (number) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }


    transformColorToNumber(color) {
        switch (color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    lightSecuence() {
        for (let i = 0; i < this.level; i++) {
            const color = this.transformNumerToColor(this.secuence[i])
            setTimeout( () => this.lightColor(color), 1000 * i)
        }
    }

    lightColor(color) {
        this.colores[color].classList.add('light')
        setTimeout( () => this.turnOffLightColor(color), 400)
    }

    turnOffLightColor(color) {
        this.colores[color].classList.remove('light')
    }

    addEventClick() {
        this.colores.celeste.addEventListener('click', this.selectColor)
        this.colores.verde.addEventListener('click', this.selectColor)
        this.colores.violeta.addEventListener('click', this.selectColor)
        this.colores.naranja.addEventListener('click', this.selectColor)
    }


    deleteEventClick() {
        this.colores.celeste.removeEventListener('click', this.selectColor)
        this.colores.verde.removeEventListener('click', this.selectColor)
        this.colores.violeta.removeEventListener('click', this.selectColor)
        this.colores.naranja.removeEventListener('click', this.selectColor)
    }
    selectColor(ev) {
        const colorName = ev.target.dataset.color
        const colorNumber = this.transformColorToNumber(colorName)
        this.lightColor(colorName)
        if (colorNumber === this.secuence[this.subLevel]) {
            this.subLevel++
            if (this.subLevel === this.level) {
                this.level++
                this.deleteEventClick()
                if (this.level === (LAST_LEVEL + 1)) {
                    this.winGame()
                } else {
                    setTimeout(this.nextLevel, 1500)
                }
            }
        } else {
            this.loseGame()
        }
    }

    winGame() {
        swal('Felicitaciones ganaste el juego!','success')
        .then( () => {
            this.initialize()
        })
    }

    loseGame() {
        swal('Lo siento pero perdiste el juego!','error')
        .then( () => {
            this.initialize()
        })
    }
}

function empezarJuego() {
    window.juego = new Juego()
} 