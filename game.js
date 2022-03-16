const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
	{
		question: 'Who pees on Monica after she is stung by a jellyfish?',
		choice1: 'Ross',
		choice2: 'Rachel',
		choice3: 'Chandler',
		choice4: 'Joey',
		answer: 3,
	},
	{
		question: "What is the name of Joey's stuffed penguin?",
		choice1: 'Cuddles',
		choice2: 'Hugsy',
		choice3: 'Fuzzy',
		choice4: 'Snuggles',
		answer: 2,
	},
	{
		question: 'How many sisters does Joey have?',
		choice1: 'four',
		choice2: 'two',
		choice3: 'none',
		choice4: 'seven',
		answer: 4,
	},
	{
		question: 'What is Chandler Bings middle name?',
		choice1: 'Rose',
		choice2: 'Michael',
		choice3: 'Mary',
		choice4: 'Murial',
		answer: 4,
	},
	{
		question: 'Phoebe attempts to teach Joey what language?',
		choice1: 'Spanish',
		choice2: 'French',
		choice3: 'Arabic',
		choice4: 'Russian',
		answer: 2,
	},
	{
		question: "Which character famously said, 'PIVOT'? ",
		choice1: 'Joey',
		choice2: 'Chandler',
		choice3: 'Ross',
		choice4: 'Gunther',
		answer: Ross,
	},
	{
		question: 'What holiday does Chandler hate?',
		choice1: 'Halloween',
		choice2: 'Christmas',
		choice3: 'Thanksgiving',
		choice4: 'Easter',
		answer: 3,
	},
	{
		question: 'Monica could not tell time until what age?',
		choice1: 'seven',
		choice2: 'ten',
		choice3: 'eight',
		choice4: 'thirteen',
		answer: 4,
	},
	{
		question:
			'Chandler told Janice he was moving where to avoid seeing her again?',
		choice1: 'Yemen',
		choice2: 'Ethiopia',
		choice3: 'Somalia',
		choice4: 'Egypt',
		answer: 1,
	},
	{
		question:
			'Which one of Monicas boyfriends wanted to become The Ultimate Fighting Champion',
		choice1: 'Pual',
		choice2: 'Richard',
		choice3: 'Pete',
		choice4: 'Julio',
		answer: 3,
	},
	{
		question: 'Monica and Chandler first got together where?',
		choice1: 'New York',
		choice2: 'London',
		choice3: 'Paris',
		choice4: 'Las Vegas',
		answer: 2,
	},
	{
		question: 'What food caused Ross to get sick on Space Mountain?',
		choice1: 'Tacos',
		choice2: 'Pizza',
		choice3: 'Hot Dogs',
		choice4: 'Seafood',
		answer: 4,
	},
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 12;

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNewQuestion();
};

getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
		localStorage.setItem('mostRecentScore', score);

		return window.location.assign('/end.html');
	}

	questionCounter++;
	progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
	progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

	const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionsIndex];
	question.innerText = currentQuestion.question;

	choices.forEach((choice) => {
		const number = choice.dataset['number'];
		choice.innerText = currentQuestion['choice' + number];
	});

	availableQuestions.splice(questionsIndex, 1);

	acceptingAnswers = true;
};

choices.forEach((choice) => {
	choice.addEventListener('click', (e) => {
		if (!acceptingAnswers) return;
		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number'];

		let classToApply =
			selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

		if (classToApply === 'correct') {
			incrementScore(SCORE_POINTS);
		}

		selectedChoice.parentElement.classList.add(classToApply);

		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 1000);
	});
});

incrementScore = (num) => {
	score += num;
	scoreText.innerText = score;
};

startGame();
