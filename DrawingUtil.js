const w = window.innerWidth
const h = window.innerHeight
const scGap = 0.05
const strokeFactor = 90
const sizeFactor = 20
const backColor = '#bdbdbd'
var data = 0
const foreColor = "#283593"
const r = Math.min(w, h) / sizeFactor
const fontSizeFactor = 1

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
        this.graphRenderer.draw(this.context)
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

        context.fillStyle = foreColor
        context.beginPath()
        context.arc(this.x, this.y, r * this.state.scale, 0, 2 * Math.PI)
        context.fill()
        context.fillStyle = backColor
        if (this.state.scale >= 1) {
            const fontSize = Math.floor(r / fontSizeFactor)
            context.font = context.font.replace(/\d{2}/, Math.floor(r / fontSizeFactor))
            console.log(context.font)
            context.fillText(this.data, this.x - fontSize / 4, this.y + fontSize / 4)
        }
    }

    update(cb) {
        this.state.update(cb)
    }

    startUpdating(cb) {
        this.state.startUpdating(cb)
    }

    handleTap(x, y) {
        return this.x - r <= x && x <= this.x + r && y >= this.y - r && y <= this.y + r
    }
}

const drawEdgeLine = (context, v1, v2) => {
    context.lineWidth = Math.min(w, h) / strokeFactor
    context.lineCap = 'round'
    context.strokeStyle = foreColor
    context.beginPath()
    context.moveTo(v1.x, v1.y)
    context.lineTo(v2.x, v2.y)
    context.stroke()
}

class GraphRenderer {
    constructor() {
        this.graph = new Graph()
        this.animator = new Animator()
        this.edgeStarted = false
        this.currVertex = null
    }

    draw(context) {
        this.graph.getEdges((edge) => {
            drawEdgeLine(context, edge.v1.data, edge.v2.data)
        })

        this.graph.getVertices((vertex) => {
            vertex.data.draw(context)
        })
    }

    handleTapInsideGraphVertex(x, y, cb) {
        this.graph.getVertices((vertex) => {
            if (vertex.data.handleTap(x, y)) {
                cb(vertex)
            }
        })
    }

    handleTap(x, y, cb) {
        if (this.edgeStarted) {
            this.handleTapInsideGraphVertex(x, y, (vertex) => {
                console.log(this.currVertex)
                this.graph.addEdge(this.currVertex.data.data, vertex.data.data)
                this.currVertex = null
                this.edgeStarted = false
                cb()
            })
            return
        }
        this.handleTapInsideGraphVertex(x, y, (vertex) => {
            this.currVertex = vertex
            this.edgeStarted = true
        })

        if (this.currVertex != null) {
            return
        }
        const graphPoint = new GraphPoint(data++, x, y)
        this.graph.addVertexNode(graphPoint.data, graphPoint)
        graphPoint.startUpdating(() => {
            this.animator.start(() => {
                cb()
                graphPoint.update(() => {
                    this.animator.stop()
                    cb()
                })
            })
        })
    }
}

const stage = new Stage()
stage.render()
stage.handleTap()
