const btn = document.querySelector('.sidebar-toggle');
const closeBtn = document.querySelector('.close-btn');
const sidebar = document.querySelector('.sidebar');

btn.addEventListener('click', () => {
  sidebar.classList.toggle('show-sidebar');
})

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('show-sidebar');
})