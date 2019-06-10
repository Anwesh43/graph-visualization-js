const Node = require('./Node')
class Stack {

    constructor() {
        this.root = null
    }

    push(data) {
        const curr = new Node(data)
        if (this.root == null) {
            this.root = curr
        } else {
            curr.next = this.root
            this.root = curr
        }
    }

    poll() {
        return this.root.data
    }

    pop() {
        if (this.root == null) {
            return null
        }
        const data = this.root.data
        this.root = this.root.next
        return data
    }
}

module.exports = Stack
