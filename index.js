// This is Default element selector
const selectElements = selector =>{
    const element = document.querySelector(selector);
    if (element) return element;
    else throw new Error(`something went wrong check if ${selector} is spelt correctly`)
}

selectElements(".menu-btn").addEventListener("click", () =>{
    selectElements(".nav-links-right-container").parentElement.classList.toggle("activated")
   
})

selectElements(".backdrop").addEventListener("click", () =>{
    selectElements(".nav-links-right-container").parentElement.classList.remove("activated");
})