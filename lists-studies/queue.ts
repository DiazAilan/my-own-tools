import { List } from './lists';
import { ListElement } from './lists';

interface CircularQueueElement<T> {
    value: T;
    next: CircularQueueElement<T>;
}

export class Queue<T> {

    private body: List<T>;

    constructor() {
        this.body = new List<T>();
    }

    add(item: T): void {
        this.body.push(item);
    };

    extract(): T {
        if(!this.scout()) return null;
        return this.body.deleteByPosition(0);
    }

    scout(): boolean {
        return this.body.scout();
    }

}

class CircularQueue<T> extends Queue<T> {
    private activeElement: CircularQueueElement<T> = null;

    constructor() {
        super();
    }

    push(item: T): CircularQueue<T> {
        if(this.activeElement === null) {
            this.activeElement = {
                value: item,
                next: this.activeElement
            }
        } else if(this.activeElement.next === null) {
            const elementToPush = {
                value: item,
                next: this.activeElement
            }
            this.activeElement.next = elementToPush;            
        } else {
            const elementToPush = {
                value: item,
                next: this.activeElement
            }
            let iteratedElement = this.activeElement;
            while(iteratedElement.next !== null) {
                iteratedElement = iteratedElement.next
            }
            iteratedElement.next = elementToPush;
        }
        
        return this;
    }

    circularExtract(): T {
        const extractedElement = this.extract();
        this.add(extractedElement);
        return extractedElement
    }
}

class PrimitiveCircularQueue<T> {
    private activeElement: CircularQueueElement<T> = null;

    push(item: T): PrimitiveCircularQueue<T> {
        if(this.activeElement === null) {
            this.activeElement = {
                value: item,
                next: null
            }
            return this;
        }

        let iteratedElement = this.activeElement;
        while(iteratedElement.next !== null) {
            iteratedElement = iteratedElement.next;
        }

        iteratedElement.next = {
            value: item,
            next: null
        }
        
        return this;
    }

    extract(): T {
        let elementToExtract: CircularQueueElement<T> = this.activeElement;
        if(elementToExtract === null) {
            return null
        }

        if(elementToExtract.next === null) {
            return elementToExtract.next.value;
        }

        let iteratedElement = elementToExtract;
        while(iteratedElement.next !== null) {
            iteratedElement = iteratedElement.next;
        }

        iteratedElement.next = this.activeElement        
        this.activeElement = this.activeElement.next

        return elementToExtract.value;
    }

}

let myQueue = new PrimitiveCircularQueue<number>();

/*console.log(myQueue.push(1))
console.log(myQueue.push(2))
console.log(myQueue.push(3))
console.log(myQueue.push(4))*/

/*myQueue.push(1);
myQueue.push(2);
myQueue.push(3);
myQueue.push(4);

console.log(myQueue.extract())
console.log(myQueue.extract())
console.log(myQueue.extract())
console.log(myQueue.extract())
console.log(myQueue.extract())
*/


/*
DONE 1 -> Hacer una pila.
2 -> Hacer una cola circular.
3 -> Hacer una cola circular,usando dos colas.
4 -> Hacer una cola multinivel. ¿Que es una cola multinivel?
Tenes prioridades.
Googlear Triage.
Cosa mas prioritaria mata a cosa menos prioritaria.
5 -> Pensar: ¿Que pasa si me llegan infinitos elementos mas prioritarios? Googlear Starvation in Queue
6 -> Buscar una solucion.
*/