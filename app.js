// To take voice input through btn
const startbtn = document.querySelector("#start");
const stopbtn = document.querySelector("#stop");
const speakbtn = document.querySelector("#speak");

function weather(location) {
  const weatherCont = document.querySelector(".temp").querySelectorAll("*");

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      weatherCont[0].textContent = `Location : ${data.name}`;
      weatherCont[1].textContent = `Country : ${data.sys.country}`;
      weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
      weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
      weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherCont[5].textContent = `Original Temperature : ${ktc(
        data.main.temp
      )}`;
      weatherCont[6].textContent = `feels like ${ktc(data.main.feels_like)}`;
      weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
      weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
      weatherStatement = `sir the weather in ${data.name} is ${
        data.weather[0].description
      } and the temperature feels like ${ktc(data.main.feels_like)}`;
    } else {
      weatherCont[0].textContent = "Weather Info Not Found";
    }
  };

  xhr.send();
}
function ktc(k) {
  k = k - 273.15;
  return k.toFixed(2);
}
weather("Phaltan");
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
  console.log("vr active");
};

recognition.onresult = function (event) {
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript;
  transcript = transcript.toLowerCase();
  console.log(`my words : ${transcript}`);
  if (transcript.includes("hello jarvis")) {
    readOut("Hello Sir");
  }
  if (transcript.includes("open youtube")) {
    readOut("opening youtube sir");
    window.open("https://www.youtube.com/");
  }

  if (transcript.includes("open linkedin profile")) {
    readOut("opening linkedin profile sir");
    window.open("https://www.linkedin.com/in/vishwajeet-ranaware-859973228/");
  }
  if (transcript.includes("open google")) {
    readOut("opening google sir");
    window.open("https://www.google.com/");
  }
  if (transcript.includes("search for")) {
    readOut("here's the result");
    let input = transcript.split("");
    input.splice(0, 11);
    // input.pop();
    input = input.join("").split(" ").join("+");
    window.open(`https://www.google.com/search?q=${input}`);
    console.log(input);
  }
  if (transcript.includes("play for")) {
    readOut("here's the result");
    let input = transcript.split("");
    input.splice(0, 9);
    // input.pop();
    input = input.join("").split(" ").join("+");
    window.open(`https://www.youtube.com/results?search_query=${input}`);
    console.log(input);
  }
};

recognition.onend = function () {
  console.log("vr deactive");
};

// recognition.continuous = true; // deactive auto off recording feature when we are not taking

startbtn.addEventListener("click", () => {
  recognition.start();
});

stopbtn.addEventListener("click", () => {
  recognition.stop();
});

//Make Jarvis speak
function readOut(message) {
  const speech = new SpeechSynthesisUtterance(); // API to readout message
  speech.text = message;
  speech.volume = 5;
  window.speechSynthesis.speak(speech);
  console.log("Speaking Out");
}

speakbtn.addEventListener("click", () => {
  readOut("Hi my name is Jarvis");
});
