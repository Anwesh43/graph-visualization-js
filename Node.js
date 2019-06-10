class Node {

    constructor(data) {
        this.data = data
        this.next = null
    }

    setNext(node) {
        this.next = node
    }
}
module.exports = Node
