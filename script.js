const buttonQ = document.getElementById('button1');
const buttonA = document.getElementById('button2');
const buttonR = document.getElementById('button3');
const buttonT = document.getElementById('twitter');
const buttonN = document.getElementById('button4');
const buttonL = document.getElementById('loader');
const buttonV = document.getElementById('voice-loader');
const audioElement = document.getElementById('audio');

let jokeA;
let jokeQ;

function toggleButton ( ) {
  // console.log(evt);
  // buttonQ.hidden = !buttonQ.hidden
  buttonA.hidden = !buttonA.hidden
  buttonR.hidden = !buttonR.hidden
  buttonT.hidden = !buttonT.hidden
  buttonN.hidden = !buttonN.hidden
  buttonV.hidden = !buttonV.hidden
}

// VoiceRSS Speech Function, passing joke to VoiceRSS API
function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, '%20');
  // VoiceRSS Speech Parameters
  VoiceRSS.speech({
    key: 'a99f2c458e384dde927b41a7fd746afa',
    src: jokeString,
    hl: 'fr-fr',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });

  if (joke == jokeQ){
    audioElement.addEventListener('ended', toggleButton);
  } else {
    audioElement.removeEventListener('ended', toggleButton);
  }

}
  // Get Jokes from Joke API
async function getJoke() {
  // const proxyUrl = 'https://vast-hollows-76788.herokuapp.com/';
  const apiUrl = 'https://www.blagues-api.fr/api/random';
  buttonL.hidden = false;
  buttonV.hidden = true;
  buttonQ.hidden = true;
  try {
    const reponse = await fetch(apiUrl, {
      headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjg1MjQ0MDM1NDE3NTA1Nzk5IiwibGltaXQiOjEwMCwia2V5IjoiU1BjTDhJbkFsWTN5elcwalNzelRqR3BnVm81RnRjNUJuMVg2N3R4UHdoODlpU1NjeEEiLCJjcmVhdGVkX2F0IjoiMjAyMy0wMi0wNFQxMTowMDoxOSswMDowMCIsImlhdCI6MTY3NTUwODQxOX0.H2wRMX0WWaIvmZwOPrD6z5X_XJUtNkXnxLQGHVLAGmw
            `
            // 'Access-Control-Allow-Origin': '*'
          }
    });
    const data = await reponse.json();
    jokeQ = data.joke;
    jokeA = data.answer;
    buttonL.hidden = true;
    buttonV.hidden = false

    // console.log(data);
    /* Expected output:
    {
      "id": 1,
      "type": "dev",
      "joke": "Un développeur ne descend pas du métro.",
      "answer": "Il libère la RAM..."
    }
    */   
    tellMe(jokeQ);
  
  } catch (error) {
    console.log(error)
  } 
};

// Answer the joke
function answerJoke(){
 if(jokeA){
   tellMe(jokeA);
 } else {
   alert('Raconte moi une blaque')
 }

}

// Tweet the joke
function tweetJoke () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=
  ${jokeQ} - ${jokeA}`;
  window.open(twitterUrl, '_blank')
  toggleButton()
}

// Event Listeners
buttonQ.addEventListener('click', getJoke);
buttonN.addEventListener('click', ()=>{toggleButton();getJoke();});
buttonA.addEventListener('click', answerJoke);
buttonR.addEventListener('click', ()=>{tellMe(jokeQ);toggleButton()});
buttonT.addEventListener('click', tweetJoke);



