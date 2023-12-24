const toDoPopupForm = document.querySelector(".toDoPopupForm");
const toDoTextEdit = document.querySelector("#toDoText-edit");
const startDateEdit = document.querySelector("#date_start_edit");
const endDateEdit = document.querySelector("#date_end_edit");

const getTempValue = localStorage.getItem("toDos_temp");

const tmpObj = JSON.parse(getTempValue);
const getToDos = localStorage.getItem("toDos");
const todoEdit = JSON.parse(getToDos);

toDoTextEdit.value = tmpObj.todo_txt;
startDateEdit.value = tmpObj.start_date;
endDateEdit.value = tmpObj.end_date;

function editTodo (start_date, end_date, todo_txt){
	const id = tmpObj.id-1;
	todoEdit[id].start_date = start_date;
	todoEdit[id].end_date = end_date; 
	todoEdit[id].todo_txt = todo_txt;
	todoEdit[id].id = id;
	localStorage.setItem("toDos", JSON.stringify(todoEdit));
	// opener.parent.location.reload(); cros origin
	window.opener.top.location.href="./todos.html"
	window.close();
}

function handleSubmitPopup(event) { 
	event.preventDefault();
	const start_date = event.srcElement[0].value;
	const end_date = event.srcElement[1].value;
	const todo_txt = event.srcElement[2].value;
	console.log(start_date)
	console.log(end_date);
	console.log(todo_txt);
	const millis_Start = Date.parse(start_date);
	const millis_End = Date.parse(end_date);
	if(millis_End < millis_Start) {
		alert("종료일은 시작일보다 크거나 같아야 합니다.");
	} else if(todo_txt === "") {
		alert("내용을 입력하세요.");
	} else {
		editTodo(start_date, end_date, todo_txt);
	}
}

function edit() { 
	toDoPopupForm.addEventListener("submit", handleSubmitPopup);
	location.onunload = refreshParent();
}