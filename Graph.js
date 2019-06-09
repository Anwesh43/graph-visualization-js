class Vertex {
    constructor(data) {
        this.data = data
        this.neighbors = []
    }

    addNeighbor(vertex) {
        this.neighbors.push(vertex)
    }
}

class Edge {
    constructor(v1, v2) {
        this.v1 = v1
        this.v2 = v2
    }
}

class Graph {

    constructor() {
        this.vertexMap = {}
        this.edgeMap = {}
    }

    addVertex(data) {
        this.vertexMap[data] = new Vertex(data)
    }

    addEdge(data1, data2) {
        if (!(this.edgeMap[`${data2, data1}`]) && !(this.edgeMap[`${data1}, ${data2}`])) {
            const v1 = this.vertexMap[data1]
            const v2 = this.vertexMap[data2]
            this.edgeMap[`${data1}, ${data2}`] = new Edge(v1, v2)
            v1.addNeighbor(v2)
            v2.addNeighbor(v1)
        }
    }

    getVertices(cb) {
        return Object.values(this.vertexMap).forEach(cb)
    }

    getEdges(cb) {
        return Object.values(this.edgeMap).forEach(cb)
    }

    getNeighborsData(data) {
        return this.vertexMap[data].neighbors.map(v => v.data).join(", ")
    }
}
if (module) {
    module.exports = Graph
}
