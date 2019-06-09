const Graph = require('./Graph')
const graph = new Graph()
graph.addVertex(0)
graph.addVertex(1)
graph.addVertex(2)
graph.addVertex(3)
graph.addVertex(4)
graph.addVertex(5)

graph.addEdge(0, 1)
graph.addEdge(0, 2)
graph.addEdge(0, 4)
graph.addEdge(2, 3)
graph.addEdge(2, 5)
graph.addEdge(3, 4)
graph.addEdge(4, 5)
graph.addEdge(1, 5)

graph.getVertices((vertex) => {
    console.log(vertex)
})

graph.getEdges((edge) => {
    console.log(edge)
})

console.log(graph.getNeighborsData(0))
console.log(graph.getNeighborsData(1))
console.log(graph.getNeighborsData(2))
console.log(graph.getNeighborsData(3))
