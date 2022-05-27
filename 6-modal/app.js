const openBtn = document.querySelector('.modal-btn');
const closeBtn = document.querySelector('.close-btn');
const modalOverlay = document.querySelector('.modal-overlay');

function modal() {
  if(!modalOverlay.classList.contains('open-modal')) {
    openBtn.addEventListener('click', () => {
      modalOverlay.classList.add('open-modal');
    })
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('open-modal');
    })
  }
  modalOverlay.addEventListener('click', (e) => {
    console.log(e.target);
    if(e.target.classList.contains('open-modal')) {
      modalOverlay.classList.remove('open-modal');
    }
  })
}

modal();