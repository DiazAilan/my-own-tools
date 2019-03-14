import { Queue } from './queue';
import { List } from './lists';
enum TriageColors {
    'RED',
    'BLACK',
    'GREEN',
    'YELLOW'
};

interface TriageStrategy<T> {
    extract(priorityQueues: List<Queue<T>>): T;
}

class SimpleTriageStrategy<T> implements TriageStrategy<T> {
    public extract(priorityQueues: List<Queue<T>>): T {
        return priorityQueues
            .find(queue => queue.scout())
            .extract();
    }
}

class RoundRobinTriageStrategy<T> implements TriageStrategy<T> {
    private actualQueue = 0;
    private actualCount = 1;

    constructor(private maximumCycles: number = 10 ){
    }

    public extract(priorityQueues: List<Queue<T>>): T {
        if(this.actualCount++ > this.maximumCycles) {
            this.actualQueue = (this.actualQueue + 1) % 4; 
            this.actualCount = 1;
        }
    
        const value = priorityQueues
            .get(this.actualQueue)
            .extract();

        if(value) {
            return value;
        } else if(priorityQueues.some(e => e.scout())) {
            return this.extract(priorityQueues);
        }
    
        return null;
    }
}

class Triage<T> {

    private black = new Queue<T>();
    private red = new Queue<T>();
    private yellow = new Queue<T>();
    private green = new Queue<T>();
    private priorityQueues = new List<Queue<T>>();

    constructor(private extractHandler: TriageStrategy<T>) {
        this
            .priorityQueues
            .push(this.red)
            .push(this.yellow)
            .push(this.green)
            .push(this.black);
    }

    add(item: T, color: string): Triage<T> {
        this[color].add(item);
        return this;
    };

    extract(): T {
        return this.extractHandler.extract(this.priorityQueues);
        
    }
}

new Triage<string>(new RoundRobinTriageStrategy<string>(4));

new Triage<string>(new SimpleTriageStrategy());
