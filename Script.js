const Base_Url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const dropdowns = document.querySelectorAll(".exchange-container select");
const button = document.querySelector(".container .exchange");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "USD"
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "INR"
        }
        select.append(newOption)
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    });
};


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode]
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newsrc;
}


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount  input");
    let amntVal = amount.value;
    if (amntVal === "" || amntVal < 1) {
        msg.innerText = "Please Enter a Value!"
    }
    else if (isNaN(amntVal)) {
        msg.innerText = "Please Enter a Number!"
    }
    else {
        const url = `${Base_Url}/${from.value.toLowerCase()}.json`
        const response = await fetch(url);
        let data = await response.json();
        let rate = data[from.value.toLowerCase()][to.value.toLowerCase()]
        let finalAmount = amntVal * rate;
        console.log(finalAmount);
        msg.innerText = `${amntVal} ${from.value} = ${finalAmount} ${to.value}`;
    }
};


button.addEventListener("click", () => {
    updateExchangeRate();
});