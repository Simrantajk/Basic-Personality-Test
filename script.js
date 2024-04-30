
const questions = [
    {
        question: "I prefer to spend time with a large group of people.",
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    }, {
        question: "I often trust my instincts and intuition.",
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    },
    {
        question: "I tend to make decisions based on logic and reason.",
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    },
    {
        question: "I like to have a plan and stick to it.",
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    },
    {
        question: "I enjoy trying new and adventurous activities.",
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    },
    {
        question: "I often seek out social interactions and parties.",
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    },
    {
        question: "I value harmony and avoid conflicts whenever possible.",
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    },
    {
        question: "I prefer to have a structured and organized daily routine.",
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    },
    {
        question: "I enjoy analyzing complex problems to find solutions.",
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    },
    {
        question: "I often consider the feelings of others when making decisions.",
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    },
    // Add two more questions here:
    {
        question: "I find it easy to adapt to new situations and changes.",
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    },
    {
        question: "I enjoy working independently and don't mind solitude.",
        options: ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    },

    // Add more questions and options here
];

let currentQuestionIndex = 0;
const userAnswers = [];

function startTest() {
    document.getElementById("registration-page").style.display = "none";
    document.getElementById("test-page").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");
        questionElement.innerHTML = `
                    <p>${currentQuestion.question}</p>
                    ${currentQuestion.options.map(option => `
                        <input type="radio" name="answer" value="${option}">${option}<br>
                    `).join('')}
                `;
        document.getElementById("question-container").innerHTML = '';
        document.getElementById("question-container").appendChild(questionElement);
    } else {
        showResults();
    }
}

function submitTest() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userAnswers.push(selectedOption.value);
        currentQuestionIndex++;
        loadQuestion();
    } else {
        alert("Please select an answer.");
    }
}
function showResults() {
    const resultPage = document.getElementById("results-page");
    resultPage.style.display = "block";

    // Calculate the MBTI personality type based on user's answers
    const mbtiType = calculateMBTIType(userAnswers);

    const personalityType = document.getElementById("personality-type");
    personalityType.textContent = `Your MBTI Personality Type: ${mbtiType}`;

    document.getElementById("test-page").style.display = "none";
}

// Function to calculate MBTI personality type
function calculateMBTIType(answers) {
    const dichotomies = [
        { dimension: "Extraversion (E) - Introversion (I)", options: ["E", "I"] },
        { dimension: "Sensing (S) - Intuition (N)", options: ["S", "N"] },
        { dimension: "Thinking (T) - Feeling (F)", options: ["T", "F"] },
        { dimension: "Judging (J) - Perceiving (P)", options: ["J", "P"] },
    ];

    let mbtiType = "";

    dichotomies.forEach(dichotomy => {
        const counts = { [dichotomy.options[0]]: 0, [dichotomy.options[1]]: 0 };

        // Map answers to their associated dimension and option
        answers.forEach((answer, index) => {
            const question = questions[index]; // Get the question associated with the answer
            const optionIndex = question.options.indexOf(answer);

            // Check if the option is associated with the current dimension
            if (optionIndex !== -1) {
                const option = dichotomy.options[optionIndex];
                counts[option]++;
            }
        });

        const dominantOption = counts[dichotomy.options[0]] > counts[dichotomy.options[1]]
            ? dichotomy.options[0]
            : dichotomy.options[1];

        mbtiType += dominantOption;
    });

    return mbtiType;
}


