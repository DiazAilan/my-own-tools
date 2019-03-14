function sortedArrayFactory(number) {
    let output = [];
    for(let i = 1; i <= number; i ++) {
        output[i -1] = i;
    }
    return output;
}

function binarySearch(orderedArray, secretNumber) {
    let start   = 0;
    let end     = orderedArray.length;

    let pivot;
    let value;

    function _calculatePivotValue() {
        pivot = Math.round((start + end) / 2);
        value = orderedArray[pivot];
    }

    _calculatePivotValue();

    while(value !== secretNumber && start !== end) {
        value   > secretNumber 
        ? end   = pivot 
        : start = pivot;

        _calculatePivotValue();
    }

    let output;

    value === secretNumber
    ? output = `Your number is ${value}!`
    : output = `Your number doesn't exist in this range!`

    return output;
}

console.log('---SORTED ARRAY FACTORY TESTER---')
console.log(orderedArrayFactory(1))
console.log(orderedArrayFactory(5))
console.log(orderedArrayFactory(15))

console.log('---BINARY SEARCH TESTER---')

console.log(binarySearch(orderedArrayFactory(100), 15));
console.log(binarySearch(orderedArrayFactory(100), 101));
console.log(binarySearch(orderedArrayFactory(100), 50));