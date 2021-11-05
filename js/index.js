let UL;
let INPUT;

window.onload = () => {
    UL = document.getElementById("ul__tasks");
    INPUT = document.getElementById("input__title");

    initUl();
    refresh();

}

function refresh() {
    count();
    clearInput();
}

const template =
    `<li>
        <div class="d-flex justify-content-between">
            <p>
            <span class="span__title">Task 1</span>
            <span>(12-09-2021)</span>
            </p>
             <button onclick="deleteTask(this)" class="btn btn-warning" id="btn__event">Delete</button>
            </div>
            <br>
    </li>`

function addTask(id, title) {
    let div = document.createElement('div');
    div.innerHTML = template;

    if (id === undefined) {
        div.id = currentDateTime().toString();
        localStorage.setItem(div.id, title);
    } else {
        div.id = id;
    }

    UL.appendChild(div);

    let elements = div.childNodes[0]
        .childNodes[1]
        .childNodes[1];

    let dateTime = div.id.split("T");
    elements.childNodes[1].innerHTML = title
    elements.childNodes[3].innerHTML = `${dateTime[0]} ${(dateTime[1])
        .split(":")
        .slice(0, 3).join(':')}`

    refresh();
}


function initUl() {
    for (let [key, value] of Object.entries(localStorage)) {
        addTask(key, value)
        refresh();
    }
}

function saveTask() {
    let title = document.getElementById('input__title').value;
    addTask(undefined, title);

    refresh();
}

function clearStorage() {
    UL.innerHTML = "";
    localStorage.clear();
    refresh();
}

function dateTime() {
    let d = new Date();
    return {
        date: `${d.getDay()}-${d.getMonth()}-${d.getFullYear()}`,
        time: `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`
    }
}

function currentDateTime() {
    return dateTime().date + 'T' + dateTime().time;
}

function clearInput() {
    INPUT.value = '';
}

function count() {
    document.getElementById("span__total").innerHTML = localStorage.length.toString();
}

function deleteTask(btn) {
    const id = btn.parentElement.parentElement.parentElement.id;
    localStorage.removeItem(id);
    document.getElementById(id).remove()
    refresh();
}
