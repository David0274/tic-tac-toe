const game=document.getElementById('game');
const cells=document.querySelectorAll('.cell');
const status1=document.getElementById('status');
const restart=document.getElementById('restartbtun');
const winsound=document.getElementById('winsound');
const losesound=document.getElementById('losesound');
let board=["","","","","","","","",""];
let current="X";
let games=true;
const win=[[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6],];
cells.forEach(cell=>cell.addEventListener('click',playermove));

function cello(){
    var duration=1*10000;
    var end=Date.now()+duration;
    (function frame(){
        confetti({
            particleCount:5,
            angle:60,
            spread:55,
            origin:{x:0},
        });
                confetti({
            particleCount:5,
            angle:120,
            spread:55,
            origin:{x:1},
        });
        if(Date.now()<end){
            requestAnimationFrame(frame);
        }
        })();
    }

    


restart.addEventListener('click',restartgame);
function playermove(e){
    const index=e.target.getAttribute('data-index');
    if(board[index]!==""||!games)return;
    board[index]=current;
    e.target.textContent=current;
    if(checkwin(current)){
        status1.textContent="u win";
        games=false;
winsound.play();
        cello();return;
        
    
    }
    if(isdraw()){
        showtieimg();
        status1.textContent="tie";
        games=false;return;
    }
    setTimeout(computermove,500);
}
function computermove(){
    if(!games)return;
    const empty=board.map((val,idx)=>val===""?idx:null).filter(val=>val!==null);
if(empty.length===0)return;
const ridx=empty[Math.floor(Math.random()*empty.length)];
board[ridx]="O";
cells[ridx].textContent="O";
if(checkwin("O")){
        status1.textContent="computer win";
        losesound.play();
        showloose();
        lighting();
        startthunder(5000);
        games=false;return;
        
    
    }
if(isdraw()){
        status1.textContent="tie";
        showtieimg();
        games=false;return;
    }
    }
    function checkwin(player){
        return win.some(pattern=>pattern.every(index=>board[index]===player));
    }
    function isdraw(){
        return board.every(cell=>cell!=="");
    }
    function restartgame(){
        board=["","","","","","","","",""];
        cells.forEach(cell=>cell.textContent="");
        hidetieimg();
status1.textContent="";
games=true;
    }
    function showloose(){
        const screen=document.getElementById("wimg");
        //screen.style.pointerEvents="auto";
        //screen.style.opacity="1";
        screen.classList.remove("hide");

        screen.classList.add("show");
       // setTimeout(()=>{
            //screen.style.opacity="0";
            //setTimeout(()=>{
                //screen.style.pointerEvents="none";
            //},1000);
        //},17000);
         setTimeout(()=>{   
     screen.classList.remove("show");

        screen.classList.add("hide");
            },17000);
    }
    function lighting(){
        const flash=document.getElementById("flash");
        flash.classList.add("flash");
        setTimeout(()=>{   
     flash.classList.remove("flash");

      
            },17000);
    }
    let thint=null;
    function position (img){
        const x=Math.random()*(window.innerWidth-250);
        const y=Math.random()*(window.innerHeight-250);
        img.style.left=`${x}px`;
        img.style.top=`${y}px`;
}
function startthunder(duration=4000){
    const thunder=document.querySelectorAll('.thunder');
    thint=setInterval(()=>{
        thunder.forEach(img=>{
            position(img);
            img.classList.add('show');
            setTimeout(()=>{
                img.classList.remove('show');
            },300);
        }
        );
    },500);
 setTimeout(()=>{
                clearInterval(thint);
                thunder.forEach(img=>img.classList.remove('show'));
            },duration);

}
function showtieimg(){
    document.querySelectorAll('.tieimg').forEach(img=>{
        img.style.opacity="1";
        img.style.transform="scale(1)";
    });
}
function hidetieimg(){
    document.querySelectorAll('.tieimg').forEach(img=>{
        img.style.opacity="0";
        img.style.transform="scale(0.8)";
    });
}