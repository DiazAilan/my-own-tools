export interface ListElement<T> {
    value: T;
    next: ListElement<T>;
}

type Predicate<T> = (item: T) => boolean;
type Functor<T,S> = (item: T) => S;
type Reducer<T> = (acc: T, act: T) => T;
type Producer<T> = () => T;

export class List<T> {

    private first: ListElement<T> = null;

    constructor() {
    }

    get(position: number): T {
        let currentPosition = 0;
        let currentElement = this.first;
        
        while(currentElement != null && currentPosition < position) {
            currentElement = currentElement.next;
            currentPosition++;
        }

        if(currentElement === null) {
            return null;
        }

        return currentElement.value;
    }
    
    scout(): boolean {
        return this.first !== null;
    }

    post(position: number, value: T): void {
        // Primer caso: la lista esta vacia.
        const floatingValue: ListElement<T> = {value, next: null};

        if(this.first === null) { 
            this.first = floatingValue;
            return; 
        };
        
        let currentElement: ListElement<T> = this.first;
        let currentPosition = 0;
        let previousElement: ListElement<T>;

        while(currentElement != null && currentPosition < position){
            previousElement = currentElement;
            currentElement = currentElement.next;
            currentPosition++;
        }

        if(currentPosition === position){
            floatingValue.next = currentElement;
            previousElement.next = floatingValue;
        } else {
            throw "TeFuisteAlPastoException: tamaño:" + currentPosition + ". Y me pediste: " + position;
        }
    }

    unshift(item: T): List<T> {
        if(this.first === null) {
            this.first = {
                value: item,
                next: null
            }
        } else {
            this.first = {
                value: item, 
                next: this.first
            };
        }
        return this;
    }

    push(item: T): List<T> {
        let currentElement: ListElement<T> = this.first;

        if(currentElement === null) {
            this.first = {
                value: item, 
                next: null
            };
            return this;
        }

        while(currentElement.next !== null) {
            currentElement = currentElement.next; 
        }

        currentElement.next = {
            value: item, 
            next: null
        };

        return this;
    }

    connect(listNode: ListElement<T>): List<T> {
        let currentElement: ListElement<T> = this.first;

        if(currentElement === null) {
            this.first = listNode;
            return this;
        }

        while(currentElement.next !== null) {
            currentElement = currentElement.next;
        }

        currentElement.next = listNode;

        return this;
    }

    deleteByPosition(position: number): T {

        let currentElement: ListElement<T> = this.first;
        let currentPosition = 0;
        let elementToErase: ListElement<T>;
        let previousElement: ListElement<T> = null;

        while(currentElement !== null && currentPosition < position) {
            previousElement = currentElement;
            currentElement = currentElement.next;
            currentPosition++;
        }

        if(currentPosition === position) {
            elementToErase = currentElement;
            if(previousElement !== null) {
                previousElement.next = elementToErase.next;
            } else {
                this.first = elementToErase ? elementToErase.next : null;
            }
            currentElement = null;
        } else {
            throw "TeFuisteAlPastoException: tamaño:" + currentPosition + ". Y me pediste: " + position;
        }

        return elementToErase.value;
    }

    filter(filterCriteria: Predicate<T>): List<T> {
        let currentElement: ListElement<T> = this.first;

        let output: List<T> = new List<T>();

        while(currentElement !== null) {
            if(filterCriteria(currentElement.value)) {
                output.push(currentElement.value);
            }

            currentElement = currentElement.next;
        }

        return output;
    }

    map<S>(fn: Functor<T,S>): List<S> {
        let currentElement: ListElement<T> = this.first;

        let output: List<S> = new List<S>();

        while(currentElement !== null) {
            output.push(fn(currentElement.value));
            currentElement = currentElement.next;
        }

        return output;
    }

    reduce(reducer: Reducer<T>, firstItem: T): T {
        let currentElement: ListElement<T> = this.first;

        let output: T = firstItem;

        while(currentElement !== null) {
            reducer(output, currentElement.value);
            currentElement = currentElement.next;
        }

        return output;
    }

    every(criteria: Predicate<T>): boolean {
        let currentElement: ListElement<T> = this.first;

        let output: boolean = true;

        while(currentElement !== null && output) {
            output = criteria(currentElement.value);
            currentElement = currentElement.next;
        }

        return this.first !== null && output;
    }

    some(criteria: Predicate<T>): boolean {
        let currentElement: ListElement<T> = this.first;

        let output: boolean;

        while(currentElement !== null && !output) {
            output = criteria(currentElement.value);
            currentElement = currentElement.next;
        }

        return output;
    }

    find(criteria: Predicate<T>): T {
        let currentElement: ListElement<T> = this.first;

        let output: T;

        while(currentElement !== null && !output) {
            const isTrue = criteria(currentElement.value);
            if(isTrue) {
                output = currentElement.value;
            }
            currentElement = currentElement.next;
        }

        return output;
    }

    ifEmptyProduce<S>(fn: Producer<S>): S {
        if(this.first === null) {
            return fn();
        }
        return null;
    }

    defaultValue(value: List<T>): List<T> {
        if(this.first === null) {
            return value;
        }
        return this;
    }


    toString(): string {
        let output: string = '';

        let currentElement = this.first;

        while(currentElement !== null) {
            output += JSON.stringify(currentElement.value) + ' -> ';
            currentElement = currentElement.next;
        }

        return output + 'X';
    }

}

/*const double: Functor<number,number> = (item: number) => item * 2;
const cantameLaDouble: Functor<number,string> = (item: number) => double(item * 2) + " lalalalalala"; 
const sum: Reducer<number> = (acc: number, act: number) => acc + act;
const concatenate: Reducer<string> = (acc: string, act: string) => acc + act;

let myList: List<number> = new List<number>();
console.log(myList.filter(value => value > 1000) + "");
myList.push(10);
myList.push(100);
myList.push(2000);
myList.push(3000);
myList.push(4000);

// myList.deleteByPosition(1);

myList.map(double);
myList.map(cantameLaDouble);
myList.reduce(sum, 0);

console.log(`myList concatenated to: `);
console.log(myList.map(e => e.toString()).reduce(concatenate, ''));

console.log(myList.filter(value => value > 1000) + "");

// 2000 -> 3000 -> 4000 -> X
*/