function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

console.log(shuffle([1, 2, 3, 4, 5, 6]));

let openCards = [];
let match = 0;
let moveCounter = 0;
let time = 0;
let timerId = 0;
let timerOut = true;
const timer = document.querySelector("#timer");
const moves = document.querySelector("#moves");
const hearts = document.querySelector("#heart li");


// timer
const initClock = () => {

    timerId = setInterval(() => {
        time++;
        timerCount();
    }, 1000);
};
const timerCount = () => {
    const timer = document.querySelector("#timer");
    const min = Math.floor(time / 60);
    const sec = time % 60;
    if (sec < 10) {
        timer.innerHTML = `${min}:0${sec}`;
    } else {
        timer.innerHTML = `${min}:${sec}`;
    }
};
const stopClock = () => {
    clearInterval(timerId);
};
// moves يحسب كل حركة وحده كل بطاقة طلعت انماتش
const moveAdd = () => {
    moveCounter++;
    const moves = document.querySelector("#moves");
    console.log('Moves: ${moves}');
    moves.innerHTML = moveCounter;
}
// mach سويت تشيك فور ماتش اذا في تطابق بين البطاقتين فقط اذا تشابه يكتب جمب الكلاس تشابه اذا لا مافي تشابه يكتب انماتش ةيقفل البطاقتين
const checkForMatch = () => {

    if (
        openCards[0].firstElementChild.className ===
        openCards[1].firstElementChild.className
    ) {
        console.log("mach");
        openCards[0].classList.toggle("match");
        openCards[1].classList.toggle("match");
        openCards = [];


    } else {
        moveAdd();
        console.log("unmach");
        setTimeout(() => {
            openCards[0].classList.remove("open");
            openCards[1].classList.remove("open");
            openCards = [];
        }, 1000);
    }
};
// open جبت ال ديك اي دي عشان ياخذ كل الكاردات سويت ليسنر اذا ضطت على اول كارد يبدا يحسب الوقت فقط لاول بطاقة بعد قلت اذا فقط بطاقتين طلعت متشابهة يسوي تشيك فور ماتش ويكت ماتش سوا تشيك وطلعت ان ماتش يكتب ان ماتش
const deck = document.querySelector("#deck")
deck.addEventListener("click", function (event) {
    if (timerOut) {
        console.log(timerOut)
        initClock();
        timerOut = false;
    }
    console.log(event.target, "test");
    event.target.classList.add("open")
    openCards.push(event.target);
    if (openCards.length === 2) {
        checkForMatch();
    }


    console.log(openCards, "openCards");
})
const allcards = document.querySelectorAll(".card")
const restart = document.querySelector("#restart")
restart.addEventListener("click", function () {
    
    const temp = document.querySelector('.open');
    temp.classList.remove('open');
   // console.log(temp);

   // get all the matched cards 
   const matchedCards =  document.querySelectorAll('.match');
   for(let v = 0; v < matchedCards.length; v++)
   {
       // remove match class from the matched card
       matchedCards[v].classList.remove('match');
   }

  
 
    
    stopClock();
    timerOut = true;
    time = 0;
    timerCount();
    reShuffle();
    // هنا حطيت ريلود عشان لمن اسوي ريستات يصفر كل شي
   // location.reload();   
})

// reshufle
function reShuffle() {

    let j,x;


    for(let i = allcards.length; i ; i--)
    {
        // console.log(i);
        // get random number 
        j = Math.floor(Math.random() * i);
        // the existing node before inserting new node before 
        x = i -1;
        // console.log(j);
        allcards[j].parentNode.insertBefore(allcards[j],allcards[x]);
    }

// ensure that there no open cards after shuffling 
    const temp = document.querySelector('.open');
    temp.classList.remove('open');
    // console.log('after shuffle--');
    // console.log(allcards);
    //allcards.parentNode.insertBefore();

    // for (let card of shuffled) {
    //     deck.appendChild(card);
    // }
    // console.log(reShuffle);
}

