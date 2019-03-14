const chemicals = 'aabCcdDBA';
const lesserChemicals = 'aabBA';

function isUppercase(char) {
    return char === char.toUpperCase();
}

function reaction(e1, e2) {
    const sameElement = e1.toUpperCase() === e2.toUpperCase();
    const differentState = isUppercase(e1) !== isUppercase(e2);

    return sameElement && differentState;
}

function chemistry(chemicals) {
    let output = [];
    let outputPointer = 0;

    let lookForReaction = false;

    for(let i = 0; i < chemicals.length; i++) {
        if(chemicals[i + 1]) {
            const chem1 = chemicals[i];
            const chem2 = chemicals[i + 1];

            if(reaction(chem1, chem2)) {
                i++;
                lookForReaction = true;
            } else {
                output[outputPointer] = chem1;
                outputPointer++;
            }
        } else {
            output[outputPointer] = chemicals[i];
        }

    }

    if(lookForReaction) {
        console.log('Brewing... ', output.toString().split(',').join(''));
        output = chemistry(output);
    } else {
        console.log('Final product! ', output.toString().split(',').join(''));
        return output;
    }

}

console.log(`${chemicals} is our initial state`);
chemistry(chemicals);