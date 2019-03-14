import { List } from './lists';

export class Stack<T> {

    private body: List<T>;

    constructor() {
        this.body = new List<T>();
    }

    add(item: T): void {
        this.body.unshift(item);
    }

    extract(): T {
        const extractedElement = this.body.deleteByPosition(0);
        return extractedElement;
    }

}

let myStack = new Stack();

console.log(myStack);
myStack.add('1');
console.log(myStack);
myStack.add('2');
console.log(myStack);
myStack.extract();
console.log(myStack);
myStack.extract();
console.log(myStack);