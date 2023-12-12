/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */

function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */
    var result = {
        "SearchTerm": "",
        "Results": []
    };

    // Check if scannedTextObj is an array
    if (!Array.isArray(scannedTextObj)) {
        throw new Error('Invalid input: scannedTextObj should be an array.');
    }

    result["SearchTerm"] = searchTerm

    // Iterate through each book
    for (const book of scannedTextObj) {
        // Iterate through each piece of scanned text in the book
        for (const content of book.Content)
            // Check if the search term is found in the text (case-sensitive)
            if (content.Text.includes(searchTerm)) {
                // Add the matched content dic to the results array
                result["Results"].push({
                    ISBN: book.ISBN,
                    Page: content.Page,
                    Line: content.Line
                });
            }
    }

    return result;
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            }
        ]
    }
]

const emptyBookObjects = []

const notArray = {}

/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const matchesOutput = {
    "SearchTerm": "and",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        }
    ]
}

const noMatchOutput = {
    "SearchTerm": "null",
    "Results": [
    ]
}

const caseSensitiveOutput = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}


/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 

 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

// We could choose to check that we get the right number of results.
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

// Positive tests: Check that there are multiple matches. 
const testMatches = findSearchTermInBooks("and", twentyLeaguesIn);
// Performs a strict equality comparison in if statement
if (JSON.stringify(matchesOutput) === JSON.stringify(testMatches)) {
    console.log("PASS: There are some matches");
} else {
    console.log("FAIL: There should have at least one or more matches");
    console.log("Expected:", matchesOutput);
    console.log("Received:", testMatches);
}

// Negative tests: Check that there is no match. 
const testNoMatch = findSearchTermInBooks("null", twentyLeaguesIn);
// Performs a strict equality comparison in if statement
if (JSON.stringify(noMatchOutput) === JSON.stringify(testNoMatch)) {
    console.log("PASS: No match");
} else {
    console.log("FAIL: Something matched");
    console.log("Expected:", noMatchOutput);
    console.log("Received:", testNoMatch);
}

// Case-sensitive tests: Check that the search term is case-sensitive.
const testCaseSensitive = findSearchTermInBooks("The", twentyLeaguesIn);
// Performs a strict equality comparison in if statement
if (JSON.stringify(caseSensitiveOutput) === JSON.stringify(testCaseSensitive)) {
    console.log("PASS: Case-sensitive");
} else {
    console.log("FAIL: No case-sensitive");
    console.log("Expected:", caseSensitiveOutput);
    console.log("Received:", testCaseSensitive);
}

// No book objects tests: Check that scannedTextObj is empty.
const testNoBookObjects = findSearchTermInBooks("123", emptyBookObjects);
// if not, the results should be nothing in there.
if (testNoBookObjects.Results.length === 0) {
    console.log("PASS: No data");
} else {
    console.log("FAIL: There are some book objects");
    console.log("Expected:", emptyBookObjects);
    console.log("Received:", testNoBookObjects.Results);
}

// Error Handing tests: Test for invalid scannedTextObj exists(not an array).
const testInvalidScannedTextObj = () => {
    try {
        findSearchTermInBooks("123", notArray);
        // If the function does not throw an error, fail the test
        console.log("FAIL: Expected an error for invalid scannedTextObj.");
    } catch (error) {
        // If the function throws the expected error, pass the test
        console.log("PASS: Threw an error for invalid scannedTextObj.");
    }
};
testInvalidScannedTextObj();
