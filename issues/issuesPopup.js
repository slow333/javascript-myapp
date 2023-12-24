const issuesPopupForm = document.querySelector(".issuesPopupForm");
const titleInput = document.querySelector(".title-input");
const getTempValue = localStorage.getItem("issue_temp");
const issueTemp = JSON.parse(getTempValue);
const getIssues = localStorage.getItem("issue_list");
const issueList = JSON.parse(getIssues);
console.log("issueList ", issueList);
const divInputAlign = document.querySelector(".input-align");


function loadInputs () {
  titleInput.value = issueTemp.title;
  // console.log("기존 값", issueList[issueTemp.id-1])
  // console.log("contents => ", issueTemp.content.length)

  let i;
  for(i=0; i < issueTemp.content.length; i++){
    const divContentInputLabel = document.createElement("div");
    divContentInputLabel.className= "content-input-label";
    let inputName = `input${i}`;
    inputName = document.createElement("input");
    let labelName = `label${i}`;
    labelName = document.createElement("div");
    labelName.className = "label";
    labelName.innerText = "내용";
    inputName.className = "content-input";
    inputName.value = issueTemp.content[i];
    divInputAlign.appendChild(divContentInputLabel);
    divContentInputLabel.appendChild(labelName);
    divContentInputLabel.appendChild(inputName);
  }
}
loadInputs();

function editIssue (title, contentList){
  const id = issueTemp.id-1;
  issueList[id].title = title;
  issueList[id].content = contentList;
  issueList[id].id = id;

  localStorage.setItem("issue_list", JSON.stringify(issueList));
  window.opener.top.location.href="./issues.html";
  window.close();
}

function handleSubmitPopup(event) {
  event.preventDefault();
  console.log("event => ", event);
  const targetValue = event.target

  let contentList = [];
  const title = targetValue[0].value;

  var i;
  for(i = 1; i < targetValue.length-1; i++){
    if(targetValue[i] !== undefined) {
      if(targetValue[i] != null)
      {
        contentList.push(targetValue[i].value)
      }
    }
  }
  editIssue (title, contentList);
}

function edit() {
  issuesPopupForm.addEventListener("submit", handleSubmitPopup);
}