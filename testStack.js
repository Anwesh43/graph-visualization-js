const Stack = require('./Stack')

const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)
stack.push(5)

console.log(`after pushing all values into stack the top of stack is ${stack.poll()}`)

console.log("popping for first time")
stack.pop()
console.log(`After popping the top of stack is ${stack.poll()}`)

console.log("popping for second time")
stack.pop()
console.log(`After popping the top of stack is ${stack.poll()}`)
