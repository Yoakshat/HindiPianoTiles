const paragraphs = [
  "Prakriti ki god mein sab khush hote hain. Jeevan mein shiksha aur gyaan ki mahatvapoorn bhoomika hai. Har subah sooraj ki raushni mein nai urja hoti hai.",
  "Khushiyon ka srot hamesha humare aaspas hota hai. Swasthya sabse bada dhan hai. Mitrata jeevan ki sabse sundar uphar hai.",
  "Padhna likhna gyaan ka srot hai. Mehnat karne wale kabhi haar nahi maante. Samay sabse kimti cheez hai jo vapas nahi aata.",
  "Parivar sabse pehle aata hai. Pyaar aur samman se rishte mazboot hote hain. Sanskar bachpan se hi sikhaye jaane chahiye.",
  "Sapne dekhna zaroori hai lekin unhe poora karne ki mehnat bhi karni padti hai. Safalta ka koi shortcut nahi hota. Dhairya rakho aur mehnat karte raho."
];

class TypingFlow {
  constructor() {
    this.container = document.getElementById('wordsContainer');
    this.progress = document.querySelector('.progress');
    this.currentParagraph = 0;
    this.currentWord = 0;
    this.words = [];
    this.init();
  }

  init() {
    this.loadParagraph();
    this.bindEvents();
  }

  loadParagraph() {
    this.container.innerHTML = '';
    const words = paragraphs[this.currentParagraph].split(' ');
    words.forEach(w => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = w;
      this.container.appendChild(span);
    });
    this.words = Array.from(this.container.querySelectorAll('.word'));
    this.currentWord = 0;
    this.highlightWord(true);
  }

  highlightWord(initial=false) {
    const containerCenter = this.container.offsetWidth / 2;

    this.words.forEach((w, i) => {
      if(i === this.currentWord){
        w.style.color = '#000';
        w.classList.add('current');
      } else {
        w.style.color = 'rgba(0,0,0,0.3)';
        w.classList.remove('current');
      }
    });

    const currentWord = this.words[this.currentWord];
    if(currentWord){
      const wordCenter = currentWord.offsetLeft + currentWord.offsetWidth / 2;
      const scrollTarget = wordCenter - containerCenter;
      this.container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
    }

    this.updateProgress();
  }

  nextWord() {
    this.currentWord++;
    if(this.currentWord >= this.words.length) {
      this.nextParagraph();
    } else {
      this.highlightWord();
    }
  }

  nextParagraph() {
    this.currentParagraph++;
    if(this.currentParagraph >= paragraphs.length) this.currentParagraph = 0;
    this.loadParagraph();
  }

  updateProgress() {
    const totalWords = paragraphs.reduce((acc,p)=>acc+p.split(' ').length,0);
    const done = paragraphs.slice(0,this.currentParagraph).reduce((acc,p)=>acc+p.split(' ').length,0) + this.currentWord;
    this.progress.style.width = `${(done/totalWords)*100}%`;
    this.progress.style.background = 'linear-gradient(90deg, #00ffcc, #007aff)';
  }

  bindEvents() {
    document.addEventListener('keydown', e => {
      if(['Space','Enter','ArrowRight'].includes(e.code)) {
        e.preventDefault();
        this.nextWord();
      }
    });
    document.addEventListener('click', ()=>this.nextWord());
    setInterval(()=>this.nextWord(),2500);
  }
}

window.addEventListener('load', ()=> new TypingFlow());
