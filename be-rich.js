const dollarValues = [20, 30, 5, 31, 92, 3];

function beRich(values) {
    let buyAt = 0;
    let sellAt = 0;
    let bestDeal = 0;

    /*for(let i = 0; i < values.length; i++) {
        let mainValue = values[i];

        for(let j = i + 1; j < values.length; j++) {
            let targetValue = values[j];

            if(targetValue - mainValue > bestDeal) {
                buyAt = mainValue;
                sellAt = targetValue;
                bestDeal = sellAt - buyAt;
            }
        }
    }*/

    for(let i = 0; i < values.length - 1; i++) {
        let mainValue = values[i];
        let targetValue = values[i + 1];
        while(targetValue - mainValue > bestDeal) {
            buyAt = mainValue;
            sellAt = targetValue;
            bestDeal = targetValue - mainValue;
            i++;
            mainValue = values[i];
            targetValue = values[i +1];
        } 
    }

    return {
        buyAt: '$' + buyAt,
        sellAt: '$' + sellAt,
        bestDeal: '$' + bestDeal
    }
}

console.log(beRich(dollarValues));
console.log(beRich([]));
console.log(beRich([5,3]));
console.log(beRich([1,-5,0,5]));
console.log(beRich([1,-5,3,-9]));