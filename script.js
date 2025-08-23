const cells=document.querySelectorAll('.cell');
const status1=document.getElementById('status');
const restartbtn=document.getElementById('restart');
let cp='X';
let board=["","","","","","","","",""];
let isga=true;
const wincomb=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6],
];
function cellclick(e){
    const ind=e.target.dataset.index;
    if(board[ind]!==""||!isga)return;
    board[ind]=cp;
    e.target.textContent=cp;
    checkwin();
}
function checkwin() {
    let win=false;
    for (let combo of wincomb) {
        const [a,b,c]=combo;
        if(board[a]&&board[a]===board[b]&&board[b]===board[c]){
            win=true;
            break;
        }
    }
    if(win){
       status1.textContent =`player ${cp} wins`;
       isga=false;
    }
    else if(!board.includes("")){
        status1.textContent ="its a tie";
       isga=false;
    }
    else{
cp=cp==='X'?'O':'X';
status1.textContent =`player ${cp} `;
    }
}
function restart(){
     cp='X';
 board=["","","","","","","","",""];
 isga=true;
 status1.textContent =`player ${cp} `;
 cells.forEach(cell=>cell.textContent="");
}
cells.forEach(cell=>cell.addEventListener('click',cellclick));
restartbtn.addEventListener('click',restart);