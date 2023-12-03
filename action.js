const addButton = document.getElementById('AddItem');
const itemQuantity = document.getElementById('ItemCount');
const itemName = document.getElementById('ItemName');
const addedItemsList = document.getElementById('AddedItemsList');
const sortSelect = document.getElementById('ItemSort');
const clearButton = document.getElementById('Clear');
const footer = document.querySelector('footer p');
// const checkbox = document.getElementsByClassName('checkbox');


const footerData = function () {
    const items = itemsList.length;
    const packedItems = packingCalculator(itemsList);
    const packedPercentage = items === 0 ? 0 : Math.round((packedItems/items)*100);
    footer.innerHTML = `💼 You have ${items} items in your list, and you already packed ${packedItems} (${packedPercentage}%).`;
}

const itemsList = [];


const listItem = function ({ item, quantity, check }) {
    return `<div class="added_item"><input type="checkbox" class="checkboxes" name="${item}" id="${item.charAt(0).toUpperCase() + item.substr(1)}" ${check===true?"checked":""}><label class="checkboxLabel" for="${item.charAt(0).toUpperCase() + item.substr(1)}">${' ' + quantity + ' ' + item.toUpperCase() + ' ' + (check === false ? "❌" : "✔️")}</label></div>`;
}

addButton.addEventListener('click', () => {
    const item = itemName.value;
    if (item) {
        const quantity = itemQuantity.value;
        const check = false;
        const element = { item: item, quantity: quantity, check: check };
        itemsList.push(element);
        itemQuantity.value = 1;
        itemName.value = "";
        const itemHTML = listItem(itemsList[itemsList.length - 1]);
        addedItemsList.insertAdjacentHTML('beforeend', itemHTML);
        const checkbox = document.querySelectorAll('.checkboxes');
        const label = document.querySelectorAll('.checkboxes+label');
        console.log(checkbox,label);
        itemSelector(element, checkbox[checkbox.length - 1], label[label.length - 1]);
        footerData();
        
    }
});

sortSelect.addEventListener('change', () => {
    if (sortSelect.value === "Ascending") {
        itemsList.sort((a, b) => (a.quantity - b.quantity));
        renderList(itemsList);
    } else if (sortSelect.value === "Descending") {
        itemsList.sort((a, b) => b.quantity - a.quantity);
        renderList(itemsList);
    }
});

clearButton.addEventListener('click', ()=>{
    itemsList.splice(0, itemsList.length);
    renderList(itemsList);
});

const itemSelector = function (element, checkbox, label) {
    // console.log(element, checkbox, label);
    let labelText = label.innerHTML;
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            labelText = labelText.replace("❌", "✔️");
            // labelText = labelText.substr(0, labelText.length - 1) + "✔️";
            label.innerHTML = labelText;
            element.check = true;
            // console.log(item, label, element);
            // packingCalculator(itemsList);
            footerData();
        } else if(!this.checked) {
            labelText = labelText.replace("✔️", "❌");
            // labelText = labelText.substr(0,labelText.length-1) + "❌";
            label.innerHTML = labelText;
            element.check = false;
            // console.log(item, label, element);
            // packingCalculator(itemsList);
            footerData();
        }
    });
}

const packingCalculator = function (list) {
    let sum = 0;
    list.forEach((element) => {
        if (element.check === true) {
            sum += 1;
        }
    });
    return sum;
}

const renderList = function (list) {
    addedItemsList.innerHTML = "";
    list.map((element) => {
        const itemHTML = listItem(element);
        addedItemsList.insertAdjacentHTML('beforeend', itemHTML);
        const checkbox = document.querySelectorAll('.checkboxes');
        const label = document.querySelectorAll('.checkboxes+label');
        // console.log(checkbox,label);
        itemSelector(element, checkbox[checkbox.length-1], label[label.length-1]);
    });
    footerData();
}
renderList(itemsList);