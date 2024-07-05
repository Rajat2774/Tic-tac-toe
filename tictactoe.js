let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset-btn");
let newbtn=document.querySelector("#new-btn");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO=true; //playerX,playerO
let count=0; //to check for a draw

const winning=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        count++;
        if(turnO){
            box.innerText="O";
            box.style.color="#ffa552";
            turnO=false;
        }
        else{
            box.innerText="X";
            box.style.color="#02C39A";
            turnO=true;
        }
        box.disabled=true;
        let isWinner=checkWinner();
        if(count==9 && !isWinner){
            draw();
        }
    });
});
const checkWinner=(count)=>{
     for(pattern of winning){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;
        if(pos1val!="" && pos2val!="" && pos3val!=""){
            if(pos1val==pos2val && pos2val==pos3val){
                showWinner(pos1val);
                return true;
            }
        }
     }
};
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}  
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}   
const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes(); //to disable other boxes once a winner is decided
}
const draw=()=>{
    msg.innerText="No Winner!! It's a Draw";
    msgcontainer.classList.remove("hide");
    disableBoxes();
}
const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgcontainer.classList.add("hide");
}
reset.addEventListener("click",resetGame);
newbtn.addEventListener("click",resetGame);
