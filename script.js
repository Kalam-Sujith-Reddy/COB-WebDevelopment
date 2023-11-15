window.addEventListener('DOMContentLoaded', function() {
  const timerElement = document.getElementById('timer');
  const textToTypeElement = document.getElementById('textToType');
  const userInputElement = document.getElementById('userInput');
  const correctWordsElement = document.getElementById('correctWords');
  const incorrectWordsElement = document.getElementById('incorrectWords');
  const accuracyElement = document.getElementById('accuracy');
  const startButton = document.getElementById('startButton');

  let timer;
  let startTime;
  let endTime;
  let totalWords = 0;
  let correctWords = 0;
  let incorrectWords = 0;

  const texts = [
    "Football clubs around the world form the backbone of the sport, each with its unique history, identity, and fan culture. From the storied giants of Europe like Real Madrid, FC Barcelona, and Manchester United, whose successes have shaped football's narrative for decades, to emerging powerhouses like Paris Saint-Germain and the resurgence of AC Milan, these clubs serve as symbols of regional pride and global competition.",
    "India's history is a tapestry woven with the threads of ancient civilizations, empires, and diverse cultures. The ancient period saw the flourishing of the Indus Valley Civilization and the profound influence of the Vedas. The Golden Age, marked by the Gupta Empire, witnessed significant advancements in science, literature, and art.",
    "Engineering is a diverse and dynamic field that applies scientific principles to design, create, and innovate solutions to a wide array of real-world problems. Engineers use their knowledge of mathematics, physics, and technology to conceptualize, develop, and implement solutions in fields ranging from civil and mechanical engineering to electrical, aerospace, and biomedical engineering.",
  ];

  function startTest() {
    startButton.disabled = true;
    userInputElement.focus();
    userInputElement.value = '';
    totalWords = 0;
    correctWords = 0;
    incorrectWords = 0;
    updateResult();

    const randomIndex = Math.floor(Math.random() * texts.length);
    textToTypeElement.textContent = texts[randomIndex];

    startTime = new Date().getTime();
    timer = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const remainingTime = 60 - Math.floor(elapsedTime / 1000);

    if (remainingTime >= 0) {
      timerElement.textContent = `0:${remainingTime.toString().padStart(2, '0')}`;
    } else {
      clearInterval(timer);
      timerElement.textContent = '0:00';
      startButton.disabled = false;
      userInputElement.blur();
    }
  }

  function updateResult() {
    correctWordsElement.textContent = correctWords;
    incorrectWordsElement.textContent = incorrectWords;
    accuracyElement.textContent = `${((correctWords / totalWords) * 100).toFixed(2)}%`;
  }

  userInputElement.addEventListener('input', function() {
    const typedWords = userInputElement.value.trim().split(' ');
    const expectedWords = textToTypeElement.textContent.trim().split(' ');

    totalWords = correctWords+incorrectWords;
    correctWords = 0;
    incorrectWords = 0;

    typedWords.forEach(function(word, index) {
      if (word === expectedWords[index]) {
        correctWords++;
      } else {
        incorrectWords++;
      }
    });

    updateResult();
  });

  startButton.addEventListener('click', startTest);
});