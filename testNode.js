const Node = require('./Node')

const root = new Node(0)
var curr = root

for (var i = 1; i < 10; i++) {
    curr.next = new Node(i)
    curr = curr.next
}

var dispCurr = root
var msg = ""
while (dispCurr != undefined || dispCurr != null) {
    console.log(dispCurr.data)
    msg = `${msg}${dispCurr.data}`
    dispCurr = dispCurr.next
    if (dispCurr != undefined || dispCurr != null) {
        msg = `${msg}-->`
    }
}
console.log(msg)
