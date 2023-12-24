const toDoForm = document.querySelector(".toDoForm");
const toDoTxt = toDoForm.querySelector("#toDoText");
const toDoTable = document.querySelector(".toDoTable");
const start_date = document.getElementById("date_start");
const end_date = document.getElementById("date_end");

const import_toDo = document.querySelector("#import")

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
const day_end = date.getDate() + 1 < 10 ? "0" + (date.getDate() + 1) : date.getDate()+1;
const start_day_value = year + "-" + month + "-" + day;
start_date.value = start_day_value;
const end_day_value = year + "-" + month + "-" + day_end;
end_date.value = end_day_value;

const TODOS_Ls = "toDos";
let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const td = btn.parentNode;
  const tr = td.parentNode;
  const result = confirm("진짜로 지우게요?");

  if (result) {
    toDoTable.remove(tr);
    toDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(tr.id);
      }
    );
    saveToDos();
    location.reload();
  }
}

function editToDo(event) {
  const btn = event.target;
  const td = btn.parentNode;
  const tr = td.parentNode;
  const text = toDos [tr.id - 1].todo_txt;
  const start = toDos[tr.id - 1].start_date;
  const end = toDos[tr.id - 1].end_date;

  const editObj = {
    start_date: start, end_date: end, todo_txt: text, id: tr.id,
  };

  localStorage.setItem("toDos_temp", JSON.stringify(editObj));
  const url = "./todo-popup.html";
  const name = "edit";
  const option = "width= 600, height = 200, top 100, left=100, location=no"
  window.open(url, name, option)
}

function saveToDos() {
  localStorage.setItem(TODOS_Ls, JSON.stringify(toDos));
}

function addToDo(start_date, end_date, todo_txt) {
  const tr = document.createElement("tr");
  const td_start_date = document.createElement("td");
  const td_end_date = document.createElement("td");
  const td_txt = document.createElement("td");
  const td_edit = document.createElement("td");
  const td_del = document.createElement("td");
  const editBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const start_date_span = document.createElement("span");
  const end_date_span = document.createElement("span");
  const txt_span = document.createElement("span");
  const del_span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.innerText = "x";
  delBtn.addEventListener("click", deleteToDo);
  editBtn.innerText = "EDIT";
  editBtn.addEventListener("click", editToDo);
  start_date_span.innerText = start_date;
  end_date_span.innerText = end_date.slice(5, 10);
  txt_span.innerText = todo_txt;
  del_span.innerText = "X";

  td_start_date.appendChild(start_date_span);
  td_end_date.appendChild(end_date_span);
  td_txt.appendChild(txt_span);
  td_del.appendChild(delBtn);

  td_del.className = "delete-col";
  delBtn.className = "delete-btn";
  toDoTable.appendChild(tr);

  td_edit.appendChild(editBtn);
  td_edit.className = "edit-col";
  editBtn.className = "edit-btn";

  td_start_date.id = newId+"";
  td_end_date.id = newId+"";
  td_txt.id = newId+"";
  td_edit.id = newId+"";
  td_del.id = newId+"";

  tr.appendChild(td_start_date);
  tr.appendChild(td_end_date);
  tr.appendChild(td_txt);
  tr.appendChild(td_edit);
  tr.appendChild(td_del);
  toDoTable.appendChild(tr);
  tr.id = newId+"";

  const toDoObj = {
    start_date, end_date, todo_txt, id: newId  }
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const targetValue = event.target;

  const start_date = targetValue[0].value;
  const end_date = targetValue[1].value;
  const todo_txt = targetValue[3].value;

  const millis_Start = Date.parse(start_date);
  const millis_End = Date.parse(end_date);

  if(millis_End < millis_Start) {
    alert("종료일은 시작일보다 크거나 같아야 합니다.");
  } else if(todo_txt === "") {
    alert("내용을 입력하세요.");
  } else {
    addToDo(start_date, end_date, todo_txt);
    toDoTxt.value = "";
  }
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_Ls);
  if(loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      addToDo(toDo.start_date, toDo.end_date, toDo.todo_txt);
    })
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

if (toDos.length > 0) {
  import_toDo.disabled = true;
}
//
function dataImport() {
  list.forEach(function (todo) {
    addToDo(todo.start_date, todo.end_date, todo.todo_txt);
  })
}

const coll = document.querySelector(".collapsible");
const collContent = document.querySelector(".collapsible-content");

// 클릭 확장 관련 내용
//function collapse() {

coll.addEventListener("click", function(){
  coll.classList.toggle("active");
  if(collContent.style.display === "block") {
    collContent.style.display = "none";
  } else {
    collContent.style.display = "block";
  }
})