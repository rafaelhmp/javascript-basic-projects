// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********

// Submit form
form.addEventListener('submit', addItem);

// Clear lista
clearBtn.addEventListener('click', clearItems);

// Itens carregados(DOMContentLoaded)
window.addEventListener('DOMContentLoaded', setupItems);

// ****** FUNCTIONS **********

// Add item a lista
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  
  if(value && !editFlag) {
    createListItem(id, value);
    // Display alert
    displayAlert("Item adicionado", "success");
    // Mostrar container
    container.classList.add('show-container');
    // Adicionando ao local storage
    addToLocalStorage(id, value);
    // Voltar para o padrao
    setBackToDefault();
  } else if(value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("Item editado", "success");
    // Editar no local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("Por favor, insira um valor", "danger");
  }
}
// Deletar item da lista
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);
  if(list.children.length === 0) {
    container.classList.remove('show-container');
  }
  displayAlert("Item removido", "success");
  setBackToDefault();
  // Remover do local storage
  removeFromLocalStorage(id);
}
// Editar item da lista
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = 'edit';
}
// Esvazia a lista
function clearItems() {
  const items = document.querySelectorAll('.grocery-item');
  
  if(items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }
  container.classList.remove('show-container');
  displayAlert("Lista esvaziada", "success");
  setBackToDefault();
  localStorage.removeItem('list');
}
// Mostrar alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  // Removendo alert
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1500)
}
// Voltar para o padrao
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = ""
  submitBtn.textContent = 'submit';
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  const grocery = {id, value};
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem('list', JSON.stringify(items));
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter((item) => {
    if(item.id !== id) {
      return item;
    }
  })
  localStorage.setItem('list', JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.map((item) => {
    if(item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem('list', JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')): [] ;
}
// ****** SETUP ITEMS **********
function setupItems() {
  let items = getLocalStorage();
  if(items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    })
    container.classList.add('show-container');
  }
}

function createListItem(id, value) {
  // Criando elemento
  const element = document.createElement('article');
  // Adicionando classe
  element.classList.add('grocery-item');
  // Adicionando atributo data-id
  const attr = document.createAttribute('data-id');
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `
  <p class="title">${value}</p>
  <div class="btn-container">
    <button type="button" class="edit-btn">
      <i class="fas fa-edit"></i>
    </button>
    <button type="button" class="delete-btn">
      <i class="fas fa-trash"></i>
    </button>
  </div>`;

  const deleteBtn = element.querySelector('.delete-btn');
  const editBtn = element.querySelector('.edit-btn');
  deleteBtn.addEventListener('click', deleteItem);
  editBtn.addEventListener('click', editItem);

  // Append child
  list.appendChild(element);
}