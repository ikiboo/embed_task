const fs = require("fs");
const data = fs.readFileSync("reviews.json");
const content = data.toString();
const contentJSON = eval(content);

let filter;
const min_rating = rating => {
    filter = contentJSON.filter(obj => obj.rating >= rating);
}

const rate_and_date = (array, rate, time) => {
    if(rate === 'Highest Rating') {
        array.sort((a,b) => {
            if(a.rating > b.rating) {
                return -1;
            } else if(a.rating < b.rating) {
                return 1;
            } else if(a.rating === b.rating){
                if(time === 'Newest First') {
                    return b.reviewCreatedOnTime - a.reviewCreatedOnTime;
                } else if(time === 'Oldest First'){
                    return a.reviewCreatedOnTime - b.reviewCreatedOnTime;
                }
            }
        })
    } else if (rate === 'Lowest Rating') {
        array.sort((a,b) => {
            if(a.rating < b.rating) {
                return -1;
            } else if(a.rating > b.rating) {
                return 1;
            } else if(a.rating === b.rating){
                if(time === 'Newest First') {
                    return b.reviewCreatedOnTime - a.reviewCreatedOnTime;
                } else if(time === 'Oldest First'){
                    return a.reviewCreatedOnTime - b.reviewCreatedOnTime;
                }
            }
        })
    }
}

let with_text;
let without_text;
let text_array;
const text = (array, answer) => {
    if(answer === 'Yes') {
        with_text = array.filter(obj => obj.reviewText.length > 0);
        without_text = array.filter(obj => obj.reviewText.length === 0);
        text_array = with_text.concat(without_text);
    }
}

min_rating(2);
rate_and_date(filter, 'Lowest Rating', 'Newest First');
text(filter, 'Yes');
console.log(text_array);