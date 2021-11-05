// global tags
let UL;
let INPUT;
let BTN_ADD;

// initialization
window.onload = () => {
    initTags();

    initUl();
    refresh();

    INPUT.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && BTN_ADD.disabled === false) saveTask();
    });

}

function initTags() {
    UL = document.getElementById("ul__tasks");
    INPUT = document.getElementById("input__title");
    BTN_ADD = document.getElementById('btn__add');
}

function refresh() {
    document.getElementById('btn__clear').disabled = count() === 0;
    clearInput();
}

const template =
    `<li>
        <div class="d-flex justify-content-between">
            <p>
            <input id="input__checkbox" onclick="isTaskDone(this)" type="checkbox">
            <span class="span__title">Task 1</span>
            <span class="span__date-time"></span>
            </p>
             <button onclick="deleteTask(this)" class="btn btn-warning btn__event" id="btn__delete"><i class="fas fa-trash-alt"></i></button>
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
    elements.childNodes[3].innerHTML = title
    elements.childNodes[5].innerHTML = `${dateTime[0]} ${(dateTime[1])
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
    if (confirm('Are you sure you want to delete all items?')) {
        UL.innerHTML = "";
        localStorage.clear();
        refresh();
    }
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
    BTN_ADD.disabled = true;
}

function count() {
    const total = document.getElementById("span__total").innerHTML = localStorage.length.toString();
    return +total;
}

function deleteTask(btn) {
    const id = btn.parentElement.parentElement.parentElement.id;
    localStorage.removeItem(id);
    document.getElementById(id).remove()
    refresh();
}


function validateInput(input) {
    BTN_ADD.disabled = input.value.trim().length < 3;
}

function isTaskDone(checkbox) {
    const id = checkbox
        .parentElement
        .parentElement
        .parentElement
        .parentElement.id;

    let title = checkbox.parentElement.childNodes[3];

    if (checkbox.checked) {
        title.classList.add('checked');
        localStorage.removeItem(id);
    } else {
        title.classList.remove('checked');
        localStorage.setItem(id, title.textContent);
    }
}