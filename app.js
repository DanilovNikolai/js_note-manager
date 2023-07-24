const btn = document.querySelector('#btn');
const completeTask = document.querySelector('#complete');
const deleteTask = document.querySelector('#delete');
const input = document.querySelector('#input');
const list = document.querySelector('#list');
const task = document.querySelector('#task');
const listTitle = document.querySelector('.notes-list-title');
const notes = [
   {
      title: 'Дать по щечке бубуину',
      completed: false
   }, 
   {
      title: 'Хряпнуть пивка',
      completed: false
   }
];

// Функция возвращает HTML с элементом <li>
function getNoteTemplate(note, index) {
   return `
   <li class="note-item">
      <span class="note-item-text ${note.completed ? "completed" : ""}">${note.title}</span>
      <div class="note-item-action">
         <div class="note-btn-complete ${note.completed ? "active" : ""}" id="complete" data-index="${index}">&#10004;</div>
         <div class="note-btn-delete" id="delete">&#10006;</div>
      </div>
   </li>`
}

// Функция рендерит HTML
function render() {
   list.innerHTML = '';
   if (notes.length === 0) {
      listTitle.textContent = 'Нет заметок';
   } else {
      listTitle.textContent = 'Сохраненные заметки';
   }
   for (let i = 0; i < notes.length; i++) {
      list.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i));
   }
}

render();

// При нажатии на кнопку .btn происходит рендер нового элемента <li>, а также очищаются поля ввода
btn.addEventListener('click', () => {
   if (input.value.length === 0) {
      input.setAttribute('placeholder', 'НЕВОЗМОЖНО ВВЕСТИ ПУСТУЮ СТРОКУ');
      return;
   }
   notes.push({title: input.value, completed: false});
   input.value = '';
   input.setAttribute('placeholder', 'Введите название');
   render();
});

list.addEventListener('click', event => {
   const index = Number.parseInt(event.target.dataset.index, 10);
   if (event.target.dataset.index) {
      notes[index].completed = !notes[index].completed;
   }
   if (event.target.getAttribute("id") === "delete") {
      notes.splice(index, 1);
   }
   render();
})