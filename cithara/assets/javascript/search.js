let script = document.createElement('script');
script.type = 'text/javascript';

script.src = '/cithara/assets/external/wordcut.min.js';
document.body.appendChild(script);
/**
 * Return results at limited value
 * 
 * @param {string} inputs inputs is a string for filtering
 * @param {Array} items items is for an array of items to be filtered
 * @param {number} limit limit the results
 * @returns return array of results
 */
function searchMin(inputs, items, limit) {
    // Split words into array
    const query = wordcut(inputs);
    const targetAttribute = ["id", "name", "author"];
    // Tolarence if score is below half of the attributes multiply by query
    const tolerance = ((-targetAttribute.length * query.length) / 2);

    //  In case of no query or item
    if (query.length === 0 || items.length === 0) {
        return [];
    }

    // Calculate relevance scores for each item
    const resultsWithScore = items.map(item => {
        const attributes = targetAttribute
            .map((attribute) => item[attribute]) // Get the values of specified attributes
            .map((value) => (typeof value === 'string' ? value.toLowerCase() : value)); // Convert item values to lowercase

        const relevanceScore = attributes.reduce((score, attribute) => {
            // Initialize a penalty value
            let penalty = 0;

            // Calculate score based on the number of query terms that match
            const matchCount = query.filter(filter => {
                const term = filter.toLowerCase();
                if (attribute.toString().toLowerCase().includes(term)) {
                    return true;
                } else {
                    // If the query term doesn't match, apply a penalty
                    penalty++;
                    return false;
                }
            }).length;

            // Subtract the penalty from the score
            return score + matchCount - penalty;
        }, 0);
            
        return { item, relevanceScore };

    });

    // Remove item with score below tolerance
    const filterResults = resultsWithScore.
        sort((a, b) => b.relevanceScore - a.relevanceScore).
        filter(result => result.relevanceScore > tolerance);

    // Extract the sorted items
    const sortedItems = filterResults.map(result => result.item);

    // Return Array
    return sortedItems.slice(0, limit);
}

function search() {

}

function wordcut(value) {
    let wordcut = require('wordcut');
    wordcut.init();
    output = wordcut.cut(value.toLowerCase());
    output = output.split("|");
    output = output.filter(i => { return i !== " " });

    return output[0] === "" ? [] : output;
}

function showResults(element, items) {
    element.textContent = "";
    element.classList.add("active");

    if(items.length === 0) {
        element.classList.remove("active");
        return;
    }
    
    items.forEach(item => {
        const el = document.createElement("div");
        el.setAttribute("class", "result");
        el.setAttribute("onclick", `window.location.href='/cithara/songs/song.html#${ item.id }'`)
        const img = document.createElement("img");
        img.setAttribute("src", `/cithara/songs/images/${ item.id }.jpg`);
        const span = document.createElement("span");
        span.textContent = item.name;
        el.appendChild(img);
        el.appendChild(span);
        element.appendChild(el);
    })
}