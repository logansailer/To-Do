//selects elements from DOM
const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListButton = document.querySelector('[data-delete-list-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const listCountElement = document.querySelector('[data-list-count]');
const tasksContainer = document.querySelector('[data-tasks]');

//saves elements upon page refresh into JSON, otherwise from empty array
const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId"
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

//sets selected list to be selected
listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId;
        saveAndRender();
    }
})

//makes delete button functional
deleteListButton.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedListId);
    selectedListId = null;
    saveAndRender()
})

//adds inoput to list
newListForm.addEventListener('submit', e => {
    e.preventDefault();
    const listName = newListInput.value
    if(listName == null || listName ==='') return;
    const list = createList(listName)
    newListInput.value = null;
    lists.push(list);
    saveAndRender();
});

//creates a list list
function createList(name) {
    return { id: Date.now().toString(), name: name, tasks: [] }
}
;
//saves list element to local storage
function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}

function saveAndRender() {
    save();
    render();
};

//renders new list to DOM
function render() {
    clearElement(listsContainer)
    renderLists();
    const selectedList = lists.find(list => list.id === selectedListId)

    //renders nothing if no list selected, or to-do if list is selected
    if (selectedListId == null) {
        listDisplayContainer.style.display = 'none';
    } else {
        listDisplayContainer.style.display = '';
        listTitleElement.innerText = selectedList.name
    }
};

function renderLists() {
    lists.forEach(list => {
        const listElement = document.createElement('li');
        listElement.dataset.listId = list.id;
        listElement.classList.add("list-name");
        listElement.innerText = list.name;
        if (list.id === selectedListId) {
            listElement.classList.add('active-list');
        }
        listsContainer.appendChild(listElement);
    })
}

//clears list element from DOM
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};

render();