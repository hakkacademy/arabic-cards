const dict = {
  "ا": "әлиф","ب": "бә","ت": "тә","ث": "сә","ج": "жим","ح": "ха","خ": "хо",
  "د": "дәл","ذ": "зәл","ر": "ро","ز": "зәй","س": "син","ش": "шин","ص": "сод",
  "ض": "дод","ط": "то","ظ": "зо","ع": "айн","غ": "ғайн","ف": "фә","ق": "қоф",
  "ك": "кәф","ل": "ләм","م": "мим","ن": "нун","هـ": "һә","و": "уау","ي": "йа"
};

const audioByLetter = {
  "ا": "assets/audio/alif.mp3",
  "ب": "assets/audio/ba.mp3",
  "ت": "assets/audio/ta.mp3",
  "ث": "assets/audio/tha.mp3",
  "ج": "assets/audio/jim.mp3",
  "ح": "assets/audio/kha.mp3",
  "خ": "assets/audio/kho.mp3",
  "د": "assets/audio/dal.mp3",
  "ذ": "assets/audio/thal.mp3",
  "ر": "assets/audio/ro.mp3",
  "ز": "assets/audio/zay.mp3",
  "س": "assets/audio/sin.mp3",
  "ش": "assets/audio/shin.mp3",
  "ص": "assets/audio/sod.mp3",
  "ض": "assets/audio/dod.mp3",
  "ط": "assets/audio/to.mp3",
  "ظ": "assets/audio/tho.mp3",
  "ع": "assets/audio/ayn.mp3",
  "غ": "assets/audio/ghayn.mp3",
  "ف": "assets/audio/fa.mp3",
  "ق": "assets/audio/qof.mp3",
  "ك": "assets/audio/kaf.mp3",
  "ل": "assets/audio/lam.mp3",
  "م": "assets/audio/mim.mp3",
  "ن": "assets/audio/nun.mp3",
  "هـ": "assets/audio/ha.mp3",
  "و": "assets/audio/uau.mp3",
  "ي": "assets/audio/ya.mp3"
};

const player = new Audio();
let audioUnlocked = false;

function playCurrent() {
  const { arabicLetter } = cards[i];
  const src = audioByLetter[arabicLetter];
  if (!src) return;

  if (player.src.endsWith(src)) {
    player.currentTime = 0;
  } else {
    player.src = src;
  }
  player.play().catch(() => {});
}

let cards = Object.entries(dict).map(([arabicLetter, transcription]) => ({ arabicLetter, transcription }));

let i = 0;
let showTranscription = false;

const buttonArabicLetter = document.getElementById('arabicLetter');
const buttonTranscription = document.getElementById('transcription');
const buttonPrevious = document.getElementById('previous');
const buttonNext = document.getElementById('next');
const buttonShuffle = document.getElementById('shuffle');
const sectionCounter = document.getElementById('counter');
const sectionCard = document.getElementById('card');

function render(){
  const { arabicLetter, transcription } = cards[i];
  buttonArabicLetter.textContent = arabicLetter;
  buttonTranscription.textContent = transcription;
  buttonArabicLetter.hidden = showTranscription;
  buttonTranscription.hidden = !showTranscription;
  sectionCounter.textContent = `${i+1} / ${cards.length}`;
}
function flip(){ 
  showTranscription = !showTranscription; 
  render(); 
  if (showTranscription) {
    playCurrent();
  }
}
function next(){ i = (i + 1) % cards.length; showTranscription = false; render(); }
function previous(){ i = (i - 1 + cards.length) % cards.length; showTranscription = false; render(); }
function shuffle(){
  for (let j = cards.length - 1; j > 0; j--) {
    const k = Math.floor(Math.random() * (j + 1));
    [cards[j], cards[k]] = [cards[k], cards[j]];
  }
  i = 0; showTranscription = false; render();
}

sectionCard.addEventListener('click', flip);
buttonNext.addEventListener('click', next);
buttonPrevious.addEventListener('click', previous);
buttonShuffle.addEventListener('click', shuffle);

render();