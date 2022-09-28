const word_el = document.querySelector("#word");
const correctLetters = [];
const wrongLetters =[];
const popup = document.querySelector("#popup-container")
const message_el = document.querySelector("#succes-message")
let selectedWord = getRandomWord();
const wrong_el = document.querySelector("#wrong-letter")
const items = document.querySelectorAll('.none')
const message_wl=document.querySelector("#message")
const playAgain = document.querySelector("#play-again")

// rastgele kelime listesi
function getRandomWord() {
    const words = ["apple","melon","grape","banana","orange","pear","lemon"];
    return words [Math.floor(Math.random() * words.length)]; 
};

// hatalı harf komplikasyonu
function displayWrongLetter (){
    
    wrong_el.innerHTML = `
        ${wrongLetters.length>0?'<h2 class="wrh2">Hatalı harfler</h2>':''}
        ${wrongLetters.map(letter=>`<span class="wrletter">${letter}</span>`)}
        `;


    items.forEach((item,index)=>{
        const errorCode = wrongLetters.length;

        if(index<errorCode){
            item.style.display ='block';
        }else{
            item.style.display ='none';
        }
    }) 
    if(wrongLetters.length === items.length) {
        popup.style.display ='flex';
        message_el.innerText = 'Maalesef Kaybettiniz.'

    };  
}; 

// doğru harf komplikasyonu
function displayWord (){
    
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter=>
            `<div class="letter">
                ${correctLetters.includes(letter) ? letter :''}
            </div>`
        ).join('')}
    `;
    const w = word_el.innerText.replace(/\n/g,'');
    if(w === selectedWord) {
        popup.style.display ='flex';
        message_el.innerText = 'tebrikler kazandınız.'
    };
}; 

function messageWrongTime () {
    message_wl.style.display ='flex';

    setTimeout(function() {
        message_wl.style.display ='none';
    },2000);
};

playAgain.addEventListener('click',function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    displayWrongLetter ();
    popup.style.display = 'none';


});

// ekranda yazılı harfi algılama
window.addEventListener('keydown',function(e){
    if(e.keyCode >= 65 && e.keyCode<=90){
        const letter = e.key
            if(selectedWord.includes(letter)){
                if(!correctLetters.includes(letter)){
                    correctLetters.push(letter)
                    displayWord(letter);
                }else{
                    messageWrongTime();
                };
            }else {
                if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)
                displayWrongLetter (letter);

            }else{
                messageWrongTime ();
            }};
    };
});

displayWord();
displayWrongLetter();
