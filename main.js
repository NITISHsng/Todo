let inputs = document.getElementById("inp");
let text = document.querySelector(".text");
var task = [];
var storedTask = localStorage.getItem('task');
if (storedTask) {
    task = JSON.parse(storedTask);
}
for (var i = 0; i < task.length; i++) {
    let ele = document.createElement("div");
    ele.innerHTML = `<span>${task[i]}</span> <input type="checkbox" value="yes"><i class="material-icons delete-btn">delete</i>`;
    text.appendChild(ele);
    ele.querySelector("input").addEventListener("click", strike);
    ele.querySelector(".delete-btn").addEventListener("click", remove);
}

document.getElementById("add").onclick = function () {
    if (inputs.value == "") {
        alert("Enter your task");
    } else {
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
    if (this.checked) {
        ele.querySelector("span").style.textDecoration = "line-through";
        ele.querySelector("span").style.textDecorationColor = "red";
        ele.querySelector("span").style.color = "green";
    } else {
        ele.querySelector("span").style.textDecoration = "none";
        ele.querySelector("span").style.color ="white";
    }
}

