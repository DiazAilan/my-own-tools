const arr1 = [0, 2, 5];
const arr2 = [1, 3, 8];

function breedOrdereds(oa1, oa2) {
    
    let output = [];
    
    let p1 = 0;
    let p2 = 0;

    let i = 0;

    for(i; i < oa1.length + oa2.length; i++) {
        if(p2 >= oa2.length || oa1[p1] < oa2[p2]) {
            output[i] = oa1[p1];
            p1++;
        } else {
            output[i] = oa2[p2];
            p2++;
        }
    }

    return output;
}

console.log(breedOrdereds([], []));
console.log(breedOrdereds([1], []));
console.log(breedOrdereds([], [1]));
console.log(breedOrdereds([1,2], [0.5,1.5]));
console.log(breedOrdereds([1.5,2.5], [1,3]));
console.log(breedOrdereds([1,2,3], [4]));
console.log(breedOrdereds([4], [1,2,3]));
console.log(breedOrdereds([4,9], [1,4,8]));