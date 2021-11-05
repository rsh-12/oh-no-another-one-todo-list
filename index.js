let ul;
let id = 0;

window.onload = () => {
    ul = document.getElementById("ul__tasks");
    getAll();
    count();
    initUl();
}

function initUl() {
    for (let [key, value] of Object.entries(localStorage)) {
        let li = document.createElement("li");
        li.id = key;
        li.innerHTML = value;
        ul.appendChild(li);
    }
}

function getAll() {
    for (let [k, v] of Object.entries(localStorage)) {
        console.log(`${k} - ${v}`);
    }
}

function count() {
    document.getElementById("span__total").innerHTML = localStorage.length.toString();
}

function addTask() {
    const li = document.createElement("li");
    let input = document.getElementById("input__title");
    li.innerHTML = input.value;
    localStorage.setItem((id++).toString(), input.value);
    ul.appendChild(li);
    count();
    input.value = "";
}

function clearStorage() {
    ul.innerHTML = "";
    localStorage.clear();
    count();
}