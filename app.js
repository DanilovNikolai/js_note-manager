const btn = document.querySelector("#btn");
const completeTask = document.querySelector("#complete");
const deleteTask = document.querySelector("#delete");
const input = document.querySelector("#input");
const list = document.querySelector("#list");
const task = document.querySelector("#task");
const listTitle = document.querySelector(".notes-list-title");
const notes = [
   {
      title: 'Изучить React',
      completed: false
   }, 
   {
      title: 'Изучить TypeScript',
      completed: false
   }
];

// Функция возвращает HTML с элементом <li>
function getNoteTemplate(note, index) {
  return `
  <li class="note-item">
      <span class="note-item-text ${note.completed ? "completed" : ""}">${
    note.title
  }</span>
      <div class="note-item-action">
        <div class="note-btn-complete ${
          note.completed ? "active" : ""
        }" id="complete" data-index="${index}"><span>&#10004;</span></div>
        <div class="note-btn-delete" id="delete" data-index="${index}"><span>&#10006;</span></div>
      </div>
  </li>`;
}

// Функция рендерит HTML
function render() {
  list.innerHTML = "";
  if (notes.length === 0) {
    listTitle.textContent = "Нет заметок";
  } else {
    listTitle.textContent = "Сохраненные заметки";
  }
  for (let i = 0; i < notes.length; i++) {
    list.insertAdjacentHTML("beforeend", getNoteTemplate(notes[i], i));
  }
}

render();

// При нажатии на кнопку .btn происходит рендер нового элемента <li>, а также очищаются поля ввода
btn.addEventListener("click", () => {
  if (input.value.trim() === "") {
    input.setAttribute("placeholder", "НЕВОЗМОЖНО ВВЕСТИ ПУСТУЮ СТРОКУ");
    return;
  }
  notes.push({ title: input.value, completed: false });
  input.value = "";
  input.setAttribute("placeholder", "Введите название");
  render();
});

// Делегируем прослушку на родителя - список <ul>, все дочерние элементы получают прослушку
list.addEventListener('click', event => {
   if (event.target.dataset.index) {
      const index = Number.parseInt(event.target.dataset.index, 10);
      console.log(index);
      if (event.target.getAttribute("id") === "complete") {
         notes[index].completed = !notes[index].completed;
      } else if (event.target.getAttribute("id") === "delete") {
         notes.splice(index, 1);
      }
      render();
   }
})
