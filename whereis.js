function whereIs(who, where) {
    let coincidences = 0;

    if(who.length > where.length) { return false };

    for(let i = 0; i < where.length; i++) {
        if(where[i] === who[coincidences]) {
            coincidences++;
        } else {
            if(coincidences > 0 && !(coincidences === who.length)) {
                coincidences = 0;
                i--;
            }
        }
    }
    return coincidences === who.length;
}

console.log(whereIs('wally', 'aaaawallyaaa'));
console.log(whereIs('wally', 'waaly'));
console.log(whereIs('wally', 'wwaly'));
console.log(whereIs('albert', 'fasdfalnotbertsdfsdf'));
console.log(whereIs('albert', 'thereisalbert!'));
