const issuesForm = document.querySelector(".issuesForm");
const titleInput = issuesForm.querySelector(".title-input");
const contentInput = issuesForm.querySelector(".content-input");
const container = document.querySelector(".container");
const titlelist = document.querySelector(".title-list");
const contentList = document.querySelector(".content-list");
const inputAlign = document.querySelector(".input-align");
const contentAddBtn = document.querySelector(".content-add-btn");
const contentInputLabel = document.querySelector(".content-input-label");
const importData = document.querySelector(".import-btn")

let issues = [];

function addContentInput() {
  const contentInputDiv = document.createElement("div");
  const labelDiv = document.createElement("div");
  const input = document.createElement("input");

  contentInputDiv.className = "content-input-label"
  labelDiv.className = "label"
  input.className = "content-input";
  input.placeholder = "내용을 입력...";
  labelDiv.innerText = "내용";

  inputAlign.appendChild(contentInputDiv);

  contentInputDiv.appendChild(labelDiv);
  contentInputDiv.appendChild(input);
}

function deleteIssue (event) {
  const btn = event.target;
  const upOne = btn.parentNode;
  const divParent = upOne.parentNode;

  const result = confirm("진짜로 지우개요?");
  if(result) {
    issues.splice(parseInt(divParent.id)-1,1);
    issues = issues.filter(function (issue) {
      return issue.id !== parseInt(divParent.id);
    });
    saveIssues();
    location.reload();
  }
}

function editIssue(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;

  const title_txt = issues [ul.id-1].title;
  const contents_list = issues[ul.id-1].content;
  const editObj = {
    title: title_txt, content:contents_list, id: ul.id,
  };
  localStorage.setItem("issue_temp", JSON.stringify(editObj));

  const url = "./issue-popup.html";
  const name = "edit-issue";
  const option = "width= 700, height = 500, top 100, left=100, location=no"
  window.open(url, name, option)
}

function saveIssues() {
  localStorage.setItem("issue_list", JSON.stringify(issues));
}

function addIssue (title, content) {
  const titleDiv = document.createElement("div");
  const ul = document.createElement("ul");
  const editDelDiv = document.createElement("div");
  const delBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const title_span = document.createElement("span");

  const newId = issues.length + 1;

  delBtn.innerText = "x";
  delBtn.className = "delete-btn";
  delBtn.addEventListener("click", deleteIssue);

  editBtn.innerText = "EDIT";
  editBtn.className = "edit-btn";
  editBtn.addEventListener("click", editIssue);

  editDelDiv.className = "edit-del-align";
  editDelDiv.appendChild(editBtn);
  editDelDiv.appendChild(delBtn);

  title_span.innerText = title;
  titleDiv.className = "title-list";
  titleDiv.appendChild(title_span);
  titleDiv.appendChild(editDelDiv);

  titleDiv.id = newId;
  container.appendChild(titleDiv);
  container.appendChild(ul);

  let i;
  for(i = 0; i < content.length; i++) {
    const li = document.createElement("li");
    let spanName = `span${i}`;
    spanName = document.createElement("span");
    spanName.innerText = content[i];
    li.appendChild(spanName);
    li.id = newId;
    ul.appendChild(li);
  }

  const issueObj = { title, content,  id: newId,  };
  issues.push(issueObj);
  saveIssues();
}

function handleSubmit(event) {
  const contentList = [];
  event.preventDefault();
  const currentTitle = event.target[0].value;
  contentList.push(event.target[1].value);

  for(let cnt = 3; cnt < event.target.length-1; cnt++) {
    if(event.target[cnt] !== undefined){
      if(event.target[cnt] != ""){
        const cc = event.target[cnt].value; contentList.push(cc);
      }
    }
  }

  addIssue (currentTitle, contentList);
  location.reload();
  // titleInput.value = "";
  // contentInput.value = "";
}

function loadIssues() {
  const loadedIssues = localStorage.getItem("issue_list");
  if(loadedIssues !== null) {
    const parsedIssues = JSON.parse(loadedIssues);
    parsedIssues.forEach(function(issue) { addIssue(issue.title, issue.content);
    })
  }
}

function init() {
  loadIssues();
  issuesForm.addEventListener("submit", handleSubmit);
  // contentAddBtn.addEventListener("click", addContentInput);
}

init();

if(issues.length > 0) {
  importData.disabled = true;
}

function dataImport() {
  issueList.forEach(function (issue) {
    addIssue(issue.title, issue.content);
  })
}