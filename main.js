let inputs = document.getElementById("inp");
let text = document.querySelector(".text");
var task = [];
var storedTask = localStorage.getItem('task');
if (storedTask) {
    task = JSON.parse(storedTask);
}
for (var i = 0; i < task.length; i++) {
    document.getElementById("dlt-all-task").style.display='block'; 
    let ele = document.createElement("div");
    ele.innerHTML = `<span>${task[i].text}</span> <input type="checkbox" ${task[i].checked ? "checked" : ""}> <i class="material-icons delete-btn">delete</i>`;
    if (task[i].checked) {
        ele.querySelector("span").style.textDecoration = "line-through";
        ele.querySelector("span").style.textDecorationColor = "red";
        ele.querySelector("span").style.color = "green";
    }
    text.appendChild(ele);
    ele.querySelector("input").addEventListener("click", strike);
    ele.querySelector(".delete-btn").addEventListener("click", remove);
}

document.getElementById("add").onclick = function () {
    if (inputs.value == "") {
        alert("Enter your task");
    } else {
        document.getElementById("dlt-all-task").style.display='block'; 
        task.unshift(inputs.value); 
        localStorage.setItem('task', JSON.stringify(task)); 
        var ele = document.createElement("div");
        ele.innerHTML = `<span>${inputs.value}</span> <input type="checkbox" value="yes"> <i class="material-icons delete-btn">delete</i>`;
        let firstChild = text.firstChild; 
        text.insertBefore(ele, firstChild);
        inputs.value = "";
        ele.querySelector("input").addEventListener("click", strike);
        ele.querySelector(".delete-btn").addEventListener("click", remove);
    }
}
document.getElementById("dlt-all-task").onclick = function () {
  if (confirm("Are you sure you want to delete all your task?")) {
        localStorage.clear();
        text.innerHTML='';
        document.getElementById("dlt-all-task").style.display='none'; 
    }
}

function remove() {
    let ele = this.parentNode;
    if (confirm("Are you sure you want to delete your task?")) {
        let index = Array.from(ele.parentNode.children).indexOf(ele); 
        task.splice(index, 1); 
        localStorage.setItem('task', JSON.stringify(task)); 
        ele.remove(); 
    }
}
function strike() {
    let ele = this.parentNode;
    let index = Array.from(ele.parentNode.children).indexOf(ele);
    if (this.checked) {
        ele.querySelector("span").style.textDecoration = "line-through";
        ele.querySelector("span").style.textDecorationColor = "red";
        ele.querySelector("span").style.color = "green";
        task[index] = { text: task[index].text, checked: true };
    } else {
        ele.querySelector("span").style.textDecoration = "none";
        ele.querySelector("span").style.color ="white";
        task[index] = { text: task[index].text, checked: false };
    }
    localStorage.setItem('task', JSON.stringify(task));
}


