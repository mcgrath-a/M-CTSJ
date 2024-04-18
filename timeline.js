var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

let correctAnswers = 0;
let totalAnswers = 0;

function disableButtons(index) {
  const buttons = document.querySelectorAll(`
    button[onclick*="checkAnswer('true', 'true', ${index})"], 
    button[onclick*="checkAnswer('true', 'false', ${index})"], 
    button[onclick*="checkAnswer('false', 'true', ${index})"], 
    button[onclick*="checkAnswer('false', 'false', ${index})"]`);

  buttons.forEach(button => {
    button.disabled = true;
  });
}

function checkAnswer(answer, correctAnswer, index) {
    console.log("checkAnswer called"); // Add this line
  disableButtons(index);
  totalAnswers ++;
  if (answer === correctAnswer) {
    document.getElementById('timeline-text-' + index).style.display = 'block';
    correctAnswers++;
    document.getElementById('correct-answers').innerText = correctAnswers;
    document.getElementById('feedback-' + index).innerHTML = "Correct!  &#9989";
  } else {
    document.getElementById('feedback-' + index).innerHTML = "Incorrect ! &#10060";
    document.getElementById('timeline-text-' + index).style.display = 'block';
  }
  

  console.log(totalAnswers)

  //have to change to 10 once finsihed 
  if (totalAnswers === 10) {
    setTimeout(function (){
        showResultsPopup();
    },4000);
   
  }
}
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
  }

  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const infoButtons = document.getElementsByClassName("read-more");

    const closeButtons = document.getElementsByClassName("close");

    for (let i = 0; i < infoButtons.length; i++) {
      infoButtons[i].addEventListener("click", function () {
        const modalId = 'modal-' + this.id.split('-')[2];
        openModal(modalId);
      });
    }

    for (let i = 0; i < closeButtons.length; i++) {
      closeButtons[i].addEventListener("click", function () {
        const modal = this.parentElement.parentElement;
        closeModal(modal.id);
      });
    }
  });

//confeti code
//credits from https://codepen.io/matteobruni/pen/qBMWaPg
function Confetti(confettiFunc){

    const duration = 15 * 1000, 
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 500000 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const run = () => {
  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confettiFunc(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
    );
    confettiFunc(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    );
  }, 250);
}; run();
}


async function showResultsPopup() {
    const confettiModule = await import("https://cdn.jsdelivr.net/npm/tsparticles-confetti/+esm");
    const confetti = confettiModule.confetti;
    // Start confetti animation
    Confetti(confetti);
  
    // Create a pop-up element
    var popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "#ffffff";
    popup.style.border = "1px solid #ccc";
    popup.style.borderRadius = "5px";
    popup.style.padding = "20px";
    popup.style.zIndex = "1000";
    popup.style.textAlign = "center";
    popup.style.width = "50%"; // Change the percentage as needed
    popup.style.height = "30%"; // Change the percentage as needed
  
    // Add the number of correct answers to the pop-up
    var result = document.createElement("p");
    result.innerHTML = correctAnswers + " / " + totalAnswers;
    popup.appendChild(result);


  
    // Create a congratulatory message
    var message = document.createElement("p");
    message.style.fontSize = "24px";
    message.style.fontWeight = "bold";
    message.style.marginBottom = "20px";
    message.innerHTML = "Congratulations! You have completed the timeline.";
    popup.appendChild(message);
  
    // Add a description based on the user's performance
    var description = document.createElement("p");
    description.style.fontSize = "18px";
    description.style.marginBottom = "20px";
    if (correctAnswers === totalAnswers) {
      description.innerHTML = "You scored " + correctAnswers + " out of 10. Wow, you know your stuff! Are you a historian?";
    } else if (correctAnswers > totalAnswers / 2) {
      description.innerHTML = "You scored " + correctAnswers + " out of 10. Impressive! You've answered more than half of the questions correctly. Keep exploring history!";
    } else {
      description.innerHTML = "You scored " + correctAnswers + " out of 10. Don't worry, history is a vast subject. Keep learning and try again!";
    }
    
    popup.appendChild(description);
  
    // Add the pop-up to the body
    document.body.appendChild(popup);

     // Create a "Close" button
  var closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.style.marginTop = "20px";
 

  // Assign an event listener to the "Close" button
  closeButton.addEventListener("click", function () {
    document.body.removeChild(popup);
  });

  // Add the "Close" button to the pop-up
  popup.appendChild(closeButton);

  // Add the pop-up to the body
  document.body.appendChild(popup);

  document.addEventListener('DOMContentLoaded', function () {
    const noselectElements = document.querySelectorAll('.noselect');
    noselectElements.forEach(function (element) {
      element.addEventListener('contextmenu', function (event) {
        event.preventDefault();
      });
    });
  });
  

  }
  



