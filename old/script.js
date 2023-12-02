

let pole = document.getElementById("pole")
let dropbtn = document.getElementById("drop")
let dropbtn2 = document.getElementById("drop2")
let player1name = document.getElementById("player1name")
let player2name = document.getElementById("player2name")
let p1chance = document.getElementById("p1chance")
let p2chance = document.getElementById("p2chance")

let snakesound = document.getElementById("snakesound")
let laddersound = document.getElementById("ladder")
let backgroundsound = document.getElementById("backgroundsound")
let nechetnie = [11,12,13,14,15,16,17,18,19,20,31,32,33,34,35,36,37,38,39,51,52,53,54,55,56,57,58,59,71,72,73,74,75,76,77,78,79,91,92,93,94,95,96,97,98,99]
let nechetnie2 = [20,40,60,80,11,12,13,14,15,16,17,18,19,31,32,33,34,35,36,37,38,39,51,52,53,54,55,56,57,58,59,71,72,73,74,75,76,77,78,79,91,92,93,94,95,96,97,98,99]

let ltrNum = 81



// Create game field -------------------------------------------------------------------------
function createField () {
    
    for(i=100; i > 0; i--) {
        let newkletka = document.createElement("div")
        // newkletka.style.background = "blue"
        newkletka.style.color = "#fff"
        newkletka.style.paddingTop = "6px"
        newkletka.style.paddingLeft = "7px"
        newkletka.setAttribute("class", "kletka")
        let span = document.createElement("span")
        
        //generete numbers in snake style
            if ((i - 1) % 20 < 10){ //     if ((i > 0 && i <= 10) || (i > 20 && i <= 30) || (i > 40 && i <= 50) || (i > 60 && i <= 70) || (i > 80 && i <= 90) ){
                span.textContent = ltrNum  
                ltrNum++
                for(a=0; a<5; a++) {
                    if([91,71,51,31].includes(ltrNum)) {
                        ltrNum -= 30
                    }
                }
            } else {
                span.textContent =  i
            }

        newkletka.setAttribute("id", span.textContent) // add id to every block
        pole.appendChild(newkletka)
        newkletka.appendChild(span)
    }
}
createField ()

// Get random number  -------------------------------------------------------------------------
function getRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }


// Initiate players

let firstCell = document.getElementById("1")  // firstCell
let player1 = document.createElement("div")
let player2 = document.createElement("div")
player1.setAttribute("id", "player1")
player1.setAttribute("class", "player1")
player1.setAttribute("draggable", "true")
player2.setAttribute("id", "player2")
player2.classList.add("player1", "player2")
player2.setAttribute("draggable", "true")
pole.appendChild(player1)
pole.appendChild(player2)





let randomnumber;

let playersData = [
    {
    margleft: 0,
    fishka: document.getElementById("player1"),
    currentposition: 1,
    bufferposition: 1,
    lastpoint: 1,
    marginbottom: 0,
    isAnimating: false

    },
    {
    margleft: 0,
    fishka: document.getElementById("player2"),
    currentposition: 1,
    bufferposition: 1,
    lastpoint: 1,
    marginbottom: 0
    }
]



let gamer1 = playersData[0]

let gamer2 = playersData[1]



let actualgamer = gamer1

console.log(actualgamer.fishka)
let checker = 1







// currentplayer == actualgamer


function moover (currentplayer, rannum) {
    // if ([10,20,30,40,50,60,70,80,90].includes(currentplayer.currentposition) && (currentplayer.currentposition !==  rannum + currentplayer.bufferposition)) {
        
    //     currentplayer.fishka.style.marginBottom = currentplayer.marginbottom+"px"
    //     currentplayer.marginbottom += 71.8

     if (currentplayer.currentposition ===  (rannum + currentplayer.bufferposition)){
        return
     }else if (currentplayer.margleft === 660) {
        currentplayer.fishka.style.marginBottom = currentplayer.marginbottom+"px"
        currentplayer.marginbottom += 71.8
        currentplayer.margleft--
    } else if (currentplayer.margleft === 15 && (currentplayer.currentposition !==  rannum + currentplayer.bufferposition)) {
        currentplayer.fishka.style.marginBottom = currentplayer.marginbottom+"px"
        currentplayer.marginbottom += 71.8
        currentplayer.margleft++
    } else if (nechetnie2.includes(currentplayer.currentposition) && (currentplayer.margleft !== 660) ) {
        currentplayer.fishka.style.marginLeft = currentplayer.margleft +"px"
        currentplayer.margleft--
    } else if (!(nechetnie2.includes(currentplayer.currentposition)) && (currentplayer.margleft !== 15 ) ) {
        currentplayer.fishka.style.marginLeft = currentplayer.margleft +"px"
        currentplayer.margleft++
    }

    // if([11,31,51,71,91].includes(currentplayer.lastpoint + rannum)){
    //     console.log("на 11 итд")
    // }
}




function backmoover (currentplayer) {
    if ([11,21,31,41,51,61,71,81,91].includes(currentplayer.currentposition) && (currentplayer.currentposition !==  randomnumber + currentplayer.bufferposition)) {
        currentplayer.marginbottom -= 71.8
        currentplayer.fishka.style.marginBottom = currentplayer.marginbottom+"px"

    
    } else if (nechetnie2.includes(currentplayer.currentposition)) {
        currentplayer.margleft++
        currentplayer.fishka.style.marginLeft = currentplayer.margleft +"px"
        console.log("++++")

    } else {
        currentplayer.margleft--
        currentplayer.fishka.style.marginLeft = currentplayer.margleft +"px"
        console.log("----")
    
    }
    
}


function positionChecker (checkpos) {  
    const rect = checkpos.fishka.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const elementsUnderAbsolute = document.elementsFromPoint(x, y); 
    elementsUnderAbsolute.forEach(div => {
        if (div.classList.contains("kletka")) {
            checkpos.currentposition = Number(div.id)
        }
    });
}


function stopper (currentplayer, randnumber, intervalname) {
    
    if ( currentplayer.currentposition ===  randnumber + currentplayer.bufferposition || 
        currentplayer.currentposition === 100 ) {
        currentplayer.bufferposition += randnumber
      
        if([11,21,31,41,51,61,71,81,91].includes(currentplayer.currentposition)) {
            clearInterval(intervalname)
        } else {
            setTimeout(function() {clearInterval(intervalname)} , 135)
        }
        
        

    currentplayer.lastpoint = currentplayer.currentposition

    if (currentplayer.lastpoint === 4) {
        sneak (actualgamer,14)
    } else if (currentplayer.lastpoint === 9) {
        sneak (actualgamer,31)
    } else if (currentplayer.lastpoint === 28) {
        sneak (actualgamer,84)
    } else if (currentplayer.lastpoint === 21) {
        sneak (actualgamer,42)
    } else if (currentplayer.lastpoint === 36) {
        sneak (actualgamer,44)
    } else if (currentplayer.lastpoint === 51) {
        sneak (actualgamer,67)
    } else if (currentplayer.lastpoint === 71) {
        sneak (actualgamer,91)
    } else if (currentplayer.lastpoint === 80) {
        sneak (actualgamer,100)
    } else if (currentplayer.lastpoint === 16) {
        ladder (actualgamer,6)
    } else if (currentplayer.lastpoint === 49) {
        ladder (actualgamer,30)
    } else if (currentplayer.lastpoint === 47) {
        ladder (actualgamer,26)
    } else if (currentplayer.lastpoint === 56) {
        ladder (actualgamer,53)
    } else if (currentplayer.lastpoint === 62) {
        ladder (actualgamer,19)
    } else if (currentplayer.lastpoint === 63) {
        ladder (actualgamer,60)
    }  else if (currentplayer.lastpoint === 87) {
        ladder (actualgamer,24)
    } else if (currentplayer.lastpoint === 93) {
        ladder (actualgamer,73)
    } else if (currentplayer.lastpoint === 95) {
        ladder (actualgamer,75)
    } else if (currentplayer.lastpoint === 98) {
        ladder (actualgamer,78)
    } 
} 

console.log(currentplayer.lastpoint)    
}


function sneak (currentplayer, stop) {
    laddersound.play()
    setTimeout(function() {
    let snkk = setInterval(function(){ 
    positionChecker(currentplayer);
    moover (currentplayer, stop);

    if ( currentplayer.currentposition ===  stop ) {


        currentplayer.bufferposition += (stop - currentplayer.bufferposition)
        currentplayer.fishka.style.marginLeft = currentplayer.margleft + "px"

        if([11,21,31,41,51,61,71,81,91].includes(currentplayer.currentposition)) {
            clearInterval(snkk)
        } else {
            setTimeout(function() {clearInterval(snkk)} , 135)
        }

        // setTimeout(function() {clearInterval(snkk)} , 135)


        currentplayer.lastpoint = currentplayer.currentposition   
        
} 
},1)
} ,1000)
}


function ladder (currentplayer, stop) {
    snakesound.play()
    console.log("на змее")
    setTimeout(function() {
    let snkk = setInterval(function(){ 
    positionChecker(currentplayer);
    backmoover (currentplayer);

    if ( currentplayer.currentposition ===  stop ) {
        currentplayer.bufferposition -= (currentplayer.bufferposition - stop)
        currentplayer.fishka.style.marginLeft = currentplayer.margleft + "px"

        if([11,21,31,41,51,61,71,81,91].includes(currentplayer.currentposition)) {
            clearInterval(snkk)
        } else {
            setTimeout(function() {clearInterval(snkk)} , 135)
        }
        

        // setTimeout(function() {clearInterval(snkk)} , 135)


        console.log(currentplayer.bufferposition, currentplayer.currentposition)     
} 
},1)
} ,1000)
}


function action () {

    
    backgroundsound.play()

    this.classList.add("rotated");
    setTimeout(() => {
        this.classList.remove("rotated");
    }, 300);

    //gamers switcher
    dropbtn.disabled = true
    if(checker === 3) {
        checker = 1
    }

    if (checker === 1) {
        actualgamer = gamer1
    } else if (checker === 2) {
        actualgamer = gamer2
    }


    if ( checker === 2) {
        player1name.classList.add("activeplayer")
        p1chance.classList.add("activechance")
        player2name.classList.remove("activeplayer")
        p2chance.classList.remove("activechance")
    } else if (checker === 1){
        player2name.classList.add("activeplayer")
        p2chance.classList.add("activechance")
        player1name.classList.remove("activeplayer")
        p1chance.classList.remove("activechance")
    }

    console.log(actualgamer)


randomnumber = getRandomNumber() // создаем рандомное число
let dvalue = document.getElementById("drop-value")
dvalue.textContent = randomnumber // выводим рандомное число

    let move = setInterval(function(){   // начинаем повторение
         positionChecker (actualgamer)  //получаем поизцию активного игрока
         moover (actualgamer, randomnumber)   // moover
         stopper (actualgamer, randomnumber,move)   // stoper
        },1)
        checker++
        console.log(checker)
     
}



dropbtn.addEventListener("click", action)

// dropbtn2.addEventListener("click", action2)



