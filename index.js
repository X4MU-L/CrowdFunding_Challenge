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


//This code is incomplete as i want to finish the modals before continuing
const dollar = "$"
const amountBacked = 89914

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
selectElements(".amount-backed").textContent = `${dollar}${numberWithCommas(amountBacked)}`

