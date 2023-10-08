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

function search(inputs, items, filter) {
    // Split words into array
    const query = wordcut(inputs);
    const targetAttribute = ["id", "name", "author", "lyric"];
    //  In case of no query or item
    if (query.length === 0 || items.length === 0) {
        if (query.length === 0) {
            return items;
        } else {
            return [];
        }
    }

    if (filter === "all")   {
        const tolerance = ((-targetAttribute.length * query.length) / 2);
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
        filter(result => result.relevanceScore >= tolerance);

        // Extract the sorted items
        const sortedItems = filterResults.map(result => result.item);

        // Return Array
        return sortedItems;
    }
    else {
        const tolerance = (query.length / 2);
        console.log(tolerance);

        const resultsWithScore = items.map(item => {
            const attributeValue = item[filter]; // Get the attribute value based on the filter string
            if (typeof attributeValue === 'string') {
              const loweredAttributeValue = attributeValue.toLowerCase();
              const relevanceScore = query.reduce((score, queryValue) => {
                const loweredQueryValue = queryValue.toLowerCase();
                if (loweredAttributeValue.includes(loweredQueryValue)) {
                  // If the query term matches, increase the score
                  return score + 1;
                } else {
                  // If the query term doesn't match, do nothing
                  return score;
                }
              }, 0);
          
              return { item, relevanceScore };
            } else {
              // If the attribute value is not a string, assign a low relevance score
              return { item, relevanceScore: 0 };
            }
          });

          // Remove items with a score below tolerance
          const filterResults = resultsWithScore.filter(result => result.relevanceScore >= tolerance);
          
          // Sort the filtered results by relevance score (descending)
          filterResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
          
          // Extract the sorted items
          const sortedItems = filterResults.map(result => result.item);
          
          // Return Array
          return sortedItems;
    }

    
}

function wordcut(value) {
    let wordcut = require('wordcut');
    wordcut.init();
    output = wordcut.cut(value.toLowerCase());
    output = output.split("|");
    output = output.filter(i => { return i !== " " });

    return output[0] === "" ? [] : output;
}