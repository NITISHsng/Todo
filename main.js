let inputs = document.getElementById("inp");
let text = document.querySelector(".text");
var tusk = [];
var storedTusk = localStorage.getItem('tusk');
if (storedTusk) {
    tusk = JSON.parse(storedTusk);
}
for (var i = 0; i < tusk.length; i++) {
    let ele = document.createElement("div");
    ele.innerHTML = `<span>${tusk[i]}</span> <input type="checkbox" value="yes"><i class="material-icons delete-btn">delete</i>`;
    text.appendChild(ele);
    ele.querySelector("input").addEventListener("click", strike);
    ele.querySelector(".delete-btn").addEventListener("click", remove);
}

document.getElementById("add").onclick = function () {
    if (inputs.value == "") {
        alert("Enter your tusk");
    } else {
        tusk.unshift(inputs.value); 
        localStorage.setItem('tusk', JSON.stringify(tusk)); 
        var ele = document.createElement("div");
        ele.innerHTML = `<span>${inputs.value}</span> <input type="checkbox" value="yes"> <i class="material-icons delete-btn">delete</i>`;
        let firstChild = text.firstChild; 
        text.insertBefore(ele, firstChild);
        inputs.value = "";
        ele.querySelector("input").addEventListener("click", strike);
        ele.querySelector(".delete-btn").addEventListener("click", remove);
    }
}
document.getElementById("dlt-all-tusk").onclick = function () {
  if (confirm("Are you sure you want to delete all your task?")) {
        localStorage.clear();
        text.innerHTML='';
    }
}

function remove() {
    let ele = this.parentNode;
    if (confirm("Are you sure you want to delete your task?")) {
        let index = Array.from(ele.parentNode.children).indexOf(ele); 
        tusk.splice(index, 1); 
        localStorage.setItem('tusk', JSON.stringify(tusk)); 
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

