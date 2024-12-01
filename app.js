// Model
class GameModel {
  constructor() {
    this.lives = 3;
    this.questions = [
      { question: "Is the earth round?", answer: true },
      { question: "Is 2+2=5?", answer: false },
      { question: "Is the sky blue?", answer: true },
      { question: "Is fire cold?", answer: false },
      { question: "Does water freeze at 0°C?", answer: true },
      { question: "Is 7 a prime number?", answer: true },
      { question: "Is Python a snake?", answer: true },
      { question: "Is JavaScript the same as Java?", answer: false },
      { question: "Is the moon a star?", answer: false },
      { question: "Can humans breathe underwater unaided?", answer: false },
    ];
    this.currentQuestionIndex = 0;
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  checkAnswer(isRight, cbRight, cbWrong) {
    
    const currentQuestion = this.getCurrentQuestion();
    console.log("isRight", currentQuestion.answer, isRight);
    if (currentQuestion.answer === isRight) {
      cbRight()
      this.currentQuestionIndex++;
      return true;
    } else {
      cbWrong()
      this.currentQuestionIndex++;
      this.lives--;
      return false;
    }
  }

  nextQuestion() {
    this.currentQuestionIndex < this.questions.length && this.currentQuestionIndex++;
  }

  isGameOver() {
    return this.lives <= 0 || this.currentQuestionIndex >= this.questions.length;
  }
}

// View
class GameView {
  constructor() {
    this.car = document.getElementById("car");
    this.questionElement = document.getElementById("question");
    this.questionIndexElement = document.getElementById("qIndex");
    this.livesElement = document.getElementById("lives");
    this.bubble1 = document.getElementById("bubble-1");
    this.bubble2 = document.getElementById("bubble-2");
    this.correctMessage = document.getElementById("correct-message");
    this.wrongMessage = document.getElementById("wrong-message");
    this.startMessage = document.getElementById("start-message");
    this.gameOverMessage = document.getElementById("game-over-message");
    this.startButton = document.getElementById("start-btn");
    this.gameOver = false;
    setTimeout(() => {this.moveBubbles()},1000)
    // this.moveBubbles()
    this.showStartMessage()
    // this.showGameOverMessage(true)
  }

  renderQuestion(question) {
    this.questionIndexElement.textContent = `Q ${model.currentQuestionIndex + 1}/10`
    this.questionElement.textContent = `Question: ${question}`;
  }

  renderLives(lives) {
    this.livesElement.textContent = `❤️ X ${lives}`;
  }

  showCorrectMessage() {
    this.correctMessage.style.animation = "fade-in-out 1s";
    setTimeout(() => {
      this.correctMessage.style.animation = "none"; // Reset animation for reuse
    }, 2000);
  }

  showStartMessage() {
    this.startMessage.style.animation = "fade-in-out 1s";
    setTimeout(() => {
      this.startMessage.style.animation = "none"; // Reset animation for reuse
    }, 2000);
  }

  showWrongMessage() {
    this.wrongMessage.style.animation = "fade-in-out 1s";
    setTimeout(() => {
      this.wrongMessage.style.animation = "none"; // Reset animation for reuse
    }, 2000);
  }

  showGameOverMessage(isWin) {
    this.gameOverMessage.style.animation = "none";
    this.gameOverMessage.style.opacity = 1;
    this.bubble1.style.opacity = 0;
    this.bubble2.style.opacity = 0;
    this.gameOverMessage.textContent = "Game Over! " + (isWin ? "You won!" : "You lost!");
    this.gameOverMessage.style.color = isWin ? "green" : "red";
    setTimeout(() => {
      // this.gameOverMessage.style.animation = "none"; // Reset animation for reuse
    }, 5000);
  }

  moveCar(direction, model, view) {
    const currentLeft = parseInt(this.car.style.left, 10) || 125;
    if (direction === "left") {
      this.car.style.left = `${Math.max(25, currentLeft - 100)}px`;
      setTimeout(() => {
        car.style.left = `125px`;
      }, 500);
    } else if (direction === "right") {
      this.car.style.left = `${Math.min(225, currentLeft + 100)}px`;
      setTimeout(() => {
        car.style.left = `125px`;
      }, 500);
    } else if (direction === "reset") {
      this.car.style.left = `${Math.min(125)}px`;
    }
    let that = this;
    setTimeout(() =>{
      this.checkCollision(model, view);
    }, 200);
    
  }

  checkCollision(model, view) {
    const carRect = this.car.getBoundingClientRect();
    const bubble1Rect = this.bubble1.getBoundingClientRect();
    const bubble2Rect = this.bubble2.getBoundingClientRect();

    console.log("car", carRect.left,
      carRect.right,
      carRect.bottom,
      carRect.top,
      carRect.left < bubble1Rect.right,
      carRect.right > bubble1Rect.left,
      carRect.bottom > bubble1Rect.top,
      carRect.top < bubble1Rect.bottom
    );
    console.log("bubble1", bubble1Rect.right,
      bubble1Rect.left,
      bubble1Rect.top,
      bubble1Rect.bottom)

    if (
      carRect.left <= bubble1Rect.right &&
      carRect.right > bubble1Rect.left &&
      carRect.bottom > bubble1Rect.top &&
      carRect.top < bubble1Rect.bottom
    ) {
      setTimeout(() => {
        // alert("You chose True!");
        // this.nextQuestion();
        model.checkAnswer(true, () => {
          // alert("You chose True!");
          view.correctMessage.style.animation = "fade-in-out 1s";
          setTimeout(() => {
            // alert("You chose True!");
            view.correctMessage.style.animation = "none"; // Reset animation for reuse
          }, 2000);
        }, () => {
          // alert("You chose True!");
          view.wrongMessage.style.animation = "fade-in-out 1s";
          setTimeout(() => {
            // alert("You chose True!");
            view.wrongMessage.style.animation = "none"; // Reset animation for reuse
          }, 2000);
        })
      }, 200);
      
    } else if (
      carRect.left < bubble2Rect.right &&
      carRect.right > bubble2Rect.left &&
      carRect.bottom > bubble2Rect.top &&
      carRect.top < bubble2Rect.bottom
    ) {
      setTimeout(() => {
        // alert("You chose false!");
        // this.nextQuestion();
        model.checkAnswer(false, () => {
          view.correctMessage.style.animation = "fade-in-out 1s";
          setTimeout(() => {
            view.correctMessage.style.animation = "none"; // Reset animation for reuse
          }, 2000);
        }, () => {
          // alert("You chose True!");
          view.wrongMessage.style.animation = "fade-in-out 1s";
          setTimeout(() => {
            // alert("You chose True!");
            view.wrongMessage.style.animation = "none"; // Reset animation for reuse
          }, 2000);
        })
      }, 200);
    }


    setTimeout(() => {
      view.renderLives(model.lives);

      if (model.isGameOver()) {
        view.gameOver = true;
        if (model.lives > 0) {
          view.showGameOverMessage(true);
          view.gameOver()
          this.startButton.style.display = "inline";
          setTimeout(() => {
              
            // location.reload();
          // alert("You won! Game over.");
          }, 15000);
          
        } else {
          view.showGameOverMessage(false);
          this.startButton.style.display = "inline";
          setTimeout(() => {
            // alert("Game over. You lost!");
            // location.reload();
          }, 15000);
          
        }
        // location.reload();
      } else {
        const question = model.getCurrentQuestion();
        view.renderQuestion(question.question);
      }
    }, 200);


  }

  moveBubbles() {
    this.bubble1.style.transition = "top 4s linear";
    this.bubble2.style.transition = "top 4s linear";
    this.bubble1.style.top = "350%";
    this.bubble2.style.top = "350%";

    // Reset position and check if no collision occurred
    setTimeout(() => {
      const bubble1Top = parseInt(this.bubble1.style.top, 10);
      const bubble2Top = parseInt(this.bubble2.style.top, 10);
      console.log("======>",bubble1Top, bubble2Top, window.innerHeight);
      
      if (bubble1Top >= window.innerHeight - 400 || bubble2Top >= window.innerHeight - 400) {
        // alert("No collision! Moving to next question.");
        this.nextQuestion();
      }
    }, 5000);
  }

  nextQuestion() {
    // questionIndex = (questionIndex + 1) % questions.length;
    // bubble1.innerText = questions[questionIndex].text1;
    // bubble2.innerText = questions[questionIndex].text2;

    this.bubble1.style.transition = "none";
    this.bubble2.style.transition = "none";
    this.bubble1.style.top = "-0px";
    this.bubble2.style.top = "-0px";
    // debugger
    if(this.gameOver){
      this.startButton.style.display = "inline";
      return
    }
    setTimeout(() => {
      this.moveBubbles();
    }, 100);
  }

  resetGame() {
    this.bubble1.style.animation = "none";
    this.bubble2.style.animation = "none";
    setTimeout(() => {
      this.bubble1.style.animation = "bubble-fall 4s linear";
      this.bubble2.style.animation = "bubble-fall 4s linear";
    }, 100);

    this.car.style.left = "125px";
  }
}

// Controller
class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  init() {
    this.view.renderLives(this.model.lives);
    this.askQuestion();

    // Add event listeners for buttons
    document.getElementById("left-btn").addEventListener("click", () => {
      this.handleAnswer(false);
    });

    document.getElementById("start-btn").addEventListener("click", () => {
      window.location.reload();
      this.view.moveBubbles()
    });

    document.getElementById("right-btn").addEventListener("click", () => {
      this.handleAnswer(true);
    });

    // Add event listeners for key events
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        this.handleAnswer(false);
      } else if (event.key === "ArrowRight") {
        this.handleAnswer(true);
      }
    });
  }

  askQuestion() {
    const question = this.model.getCurrentQuestion();
    this.view.renderQuestion(question.question);
  }

  handleAnswer(isRight) {
    this.view.moveCar(isRight ? "right" : "left", this.model, this.view);
    // const isCorrect = this.model.checkAnswer(isRight);

    this.view.renderLives(this.model.lives);

    // if (this.model.isGameOver()) {
    //   if (this.model.lives > 0) {
    //     setTimeout(() => {
    //       this.view.showGameOverMessage(true);
    //       // alert("You won! Game over.");
    //       location.reload();
    //     }, 10000);
        
    //   } else {
    //     setTimeout(() => {
    //       this.view.showGameOverMessage(false);
    //       // alert("Game over. You lost!");
    //       location.reload();
    //     }, 10000);
    //   }
    //   // location.reload();
    // } else {
    //   this.askQuestion();
    // }
    // this.view.moveCar("reset");
  }
}

// Initialize the game
const model = new GameModel();
const view = new GameView();
const controller = new GameController(model, view);
