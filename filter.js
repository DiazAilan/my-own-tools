const data = require('./data/expert-reviews.json');

const bannedWords = [
    "sucursal",
    "emplead",
    "personal",
    "vendedor"
]

function validReviews(reviews) {
    return reviews.filter(review => {
        if(review.comment !== undefined) {
            if(_checkReviewLength(review) && _checkReviewWords(review, bannedWords) && review.expert.rating > 0) {
                console.log(review.comment);
                console.log('~~~');
                return review
            }
        }
    })
}

function _checkReviewWords(review, wordsArray) {
    let reviewValidity = true;
    wordsArray.forEach(word => {
        if(review.comment.toLowerCase().includes(word)) {
            reviewValidity = false;
        }
    });
    if(reviewValidity) {
        return review;
    }
}

function _checkReviewLength(review, min = 80, max = 140) {
    return review.comment.length > min && review.comment.length < max;
}

validReviews(data);

//console.log(_checkReviewLength({comment:"asdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadfasdfsadf"}));

//console.log(validReviews(data));
