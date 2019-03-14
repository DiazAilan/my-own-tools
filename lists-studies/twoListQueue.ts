import { List, ListElement } from './lists';

class Queue<T> {

    private body: List<T>;
    private size: number = 0;

    private storedQueue: Queue<T>;

    constructor() {
        this.body = new List<T>();
    }

    add(item: T): Queue<T> {
        if(this.storedQueue.scoutElements() && !this.scoutElements()) {
            this.body = this.storedQueue.body;
        }
        this.body.push(item);
        this.size++;
        return this;
    };

    extract(): T {
        let extractedElement: ListElement<T>;
        if(this.scoutElements()) {
            extractedElement = this.body.deleteByPosition(0);
            this.storedQueue.add(extractedElement.value);
            this.size--;
        } else {
            extractedElement = this.
        }
        
        return extractedElement.value
    }

    scoutElements(): boolean {
        return this.size > 0;
    }

}