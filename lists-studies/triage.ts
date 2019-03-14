import { Queue } from './queue';
import { List } from './lists';
enum TriageColors {
    'RED',
    'BLACK',
    'GREEN',
    'YELLOW'
};

class Triage<T> {

    private black = new Queue<T>();
    private red = new Queue<T>();
    private yellow = new Queue<T>();
    private green = new Queue<T>();
    private priorityQueues = new List<Queue<T>>();
    private actualQueue = 0;
    private actualCount = 1;
    

    constructor(private maximumCycles:number = 10) {
        this
            .priorityQueues
            .push(this.red)
            .push(this.yellow)
            .push(this.green)
            .push(this.black);
    }

    private messages = {
        black: 'is expectant, give him/her painkillers',
        red: 'is in emergency',
        yellow: 'is in warning',
        green: 'is derived to second triage'
    }

    add(item: T, color: string): Triage<T> {
        this[color].add(item);
        return this;
    };

    extract(): T {
        return this
                .priorityQueues
                .find(queue => queue.scout())
                .extract();
    }

    extractRoundRobin(): T {
        if(this.actualCount++ > this.maximumCycles) {
            this.actualQueue = (this.actualQueue + 1) % 4; 
            this.actualCount = 1;
        }
        

        const value = this
            .priorityQueues
            .get(this.actualQueue)
            .extract();
        if(value) {
            return value;
        } else if(this.some()) {
            return this.extractRoundRobin();
        }

        return null;
    }

    some(): boolean {
        return this.priorityQueues.some(e => e.scout());
    }

}

function multipleAddition<T>(triage: Triage<T>, element: T, color: string, copies: number): Triage<T> {
    for(let i = 0; i < copies; i++) {
        triage.add(element, color)
    }
    return triage
}

const myTriage = new Triage<string>();

multipleAddition(myTriage, 'BLACK', 'black', 14);
multipleAddition(myTriage, 'RED', 'red', 20);
multipleAddition(myTriage, 'GREEN', 'green', 16);
multipleAddition(myTriage, 'YELLOW', 'yellow', 28);
let a = null;
while(a = myTriage.extractRoundRobin()) {
    console.log(a);
}

