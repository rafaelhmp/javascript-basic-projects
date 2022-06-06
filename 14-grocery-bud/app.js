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

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  
  if(value && !editFlag) {
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
    // Append child
    list.appendChild(element);
    // Display alert
    displayAlert("Item adicionado", "success");
    // Mostrar container
    container.classList.add('show-container');
    // Adicionando ao local storage
    addToLocalStorage(id, value);
    // Voltar para o padrao
    setBackToDefault();
  } else if(value && editFlag) {
    console.log("editando");
  } else {
    displayAlert("Por favor, insira um valor", "danger");
  }
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

}

// ****** SETUP ITEMS **********
