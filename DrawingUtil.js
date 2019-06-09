const w = window.innerWidth
const h = window.innerHeight
const scGap = 0.05
const strokeFactor = 90
const sizeFactor = 20
const backColor = '#bdbdbd'
var data = 0

class Stage {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.graphRenderer = new GraphRenderer()
        this.initCanvas()
    }

    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor
        this.context.fillRect(0, 0, w, h)
        this.graphRenderer.draw(context)
    }

    handleTap() {
        this.canvas.onmousedown = (event) => {
            this.graphRenderer.handleTap(event.offsetX, event.offsetY, () => {
                this.render()
            })
        }
    }
}

class State {
    constructor() {
        this.scale = 0
        this.dir = 0
        this.prevScale = 0
    }

    update(cb) {
        this.scale += this.dir * scGap
        if (Math.abs(this.scale - this.prevScale) > 1) {
            this.scale = this.prevScale + this.dir
            this.dir = 0
            this.prevScale = this.scale
            cb()
        }
    }

    startUpdating(cb) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
            cb()
        }
    }
}

class Animator {

    constructor() {
        this.animated = false
    }

    start(cb) {
        if (!this.animated) {
            this.animated = true
            this.interval = setInterval(cb, 50)
        }
    }

    stop() {
        if (this.animated) {
            this.animated = false
            clearInterval(this.interval)
        }
    }
}

class GraphPoint {
    constructor(data, x, y) {
        this.data = data
        this.x = x
        this.y = y
        this.state = new State()
    }

    draw(context) {
        const r = Math.min(w, h) /
        context.beginPath()
        context.arc(x, y, r * this.state.scale, 0, 2 * Math.PI)
        context.fill()
    }

    update(cb) {
        this.state.update(cb)
    }

    startUpdating(cb) {
        this.state.startUpdating(cb)
    }
}

class GraphRenderer {
    constructor() {
        this.graph = new Graph()
    }

    draw(context) {
        this.graph.getVertices((vertex) => {
            vertex.draw(context)
        })
    }

    handleTap(x, y, cb) {
        const graphPoint = new GraphPoint(data++, x, y)
        this.graph.addVertex(graphPoint)
        graphPoint.startUpdating(() => {
            this.animator.start(() => {
                cb()
                this.graph.update(() => {
                    this.animator.stop()
                    cb()
                })
            })
        })
    }
}
