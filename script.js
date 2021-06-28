const grid = document.getElementById("grid");
const btns = grid.getElementsByTagName("div");
const tArea = document.getElementById("textA");
const ansArea = document.getElementById("ans");
var ans = 0;
var op = "";

function nos(button){
    if(button.classList[1] == "(-)"){
        if(tArea.value.startsWith("-")){
            tArea.value = tArea.value.substr(
                1,tArea.value.length - 1);
        }
        else
        tArea.value = "-" + tArea.value;
        return;
    }
    var no = button.classList[1];
    tArea.value += no;
}

function ops(button){
    ans = parseFloat(tArea.value);
    var temp = parseFloat(ansArea.innerText);
    switch (button.id) {
        case "ac":
            ans = 0;
            tArea.value = "";
            ansArea.innerText = 0;
            for (let b of btns){
                b.classList.remove("operator");
            }
            op = "";
            return;
        case "back":
            tArea.value = tArea.value.substr(
                0, tArea.value.length - 1
            );
            op = "";
            return;
    }
    if(ans)
    switch (op) {
        case "+":
            ans += temp;
            break;
        case "-":
            ans = temp - ans;
            break;
        case "*":
            ans = temp * ans;
            break;
        case "/":
            ans = temp / ans;
            break;
    
        default:
            break;
    }
    if(button.classList[1] != "="){
        tArea.value = "";
        op = button.classList[1];
    }
    ansArea.innerText = (ans) ? ans:temp;
    console.log(op);
}

function highlight(me){
    if(me.id == "ac" 
    || me.id == "back"
    || me.id == "equ")return;
    for (let item of btns){
        item.classList.remove("operator");
    }
    me.classList.add("operator");
}

for (let button of btns){
    button.innerHTML = "<h5>"+button.classList[1]+"</h5>";
    button.style.gridArea = button.id;
    if(button.classList.contains("no"))
        button.addEventListener(
            "click",function(){nos(button)});
    if(button.classList.contains("func"))
        button.addEventListener(
            "click",function(){
                highlight(button);
                ops(button);
            });
}