let filtered_content, raw_content;
document.getElementById('files').onchange = function() {
    let file = this.files[0];
    let reader = new FileReader();
    reader.onload = function() {
        raw_content = eval(this.result);
    };
    reader.readAsText(file);
}

const display_filter = () => {
    filter_and_sort();
    document.getElementById('results').innerHTML = JSON.stringify(filtered_content, null, 2);
}

const filter_and_sort = () => {
    let rate = document.getElementById('rate').value;
    let min_rate = document.getElementById('min_rate').value;
    let date = document.getElementById('date').value;
    let text = document.getElementById('text').value;
    console.log(rate, min_rate, date, text);
    
    if(min_rate) {
        min_rating(min_rate);
      }
      if(rate && date) {
        rate_and_date(rate, date);
      }
      if(text) {
        text_sort(text);
      }
}

const min_rating = rating => {
    filtered_content = raw_content.filter(obj => obj.rating >= rating);
}

const rate_and_date = (rate, time) => {
    if(rate === 'Highest First') {
        filtered_content.sort((a,b) => {
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
    } else if (rate === 'Lowest First') {
        filtered_content.sort((a,b) => {
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

const text_sort = (answer) => {
    if(answer === 'Yes') {
        let with_text;
        let without_text;
        with_text = filtered_content.filter(obj => obj.reviewText.length > 0);
        without_text = filtered_content.filter(obj => obj.reviewText.length === 0);
        filtered_content = with_text.concat(without_text);
    }
}

