function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5)
    }
    
function cleanHTML(string) {
    const htmlDoc = document.implementation.createHTMLDocument("");
    let txt = htmlDoc.createElement("textarea");
    txt.innerHTML = string;
    return txt.value
    }
    
export {shuffleArray, cleanHTML};