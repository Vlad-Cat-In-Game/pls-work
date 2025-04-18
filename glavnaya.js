function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {  // Цикл проходиться по всіх елементах з кінця до початку
    let j = Math.floor(Math.random() * (i + 1));  // Вибираємо індекс рандомного елемента
    [array[i], array[j]] = [array[j], array[i]] // Міняємо місцями з поточним елементом.
  } 
}

let question_field = document.querySelector(".quest")

let answers_buttons = document.querySelectorAll(".answer")


let signs = ["+", "-", "*", "/"]

let timer_field = document.querySelector(".timer");

let time = 0;
function timer() {
  setTimeout(function () {
    time++;
    timer_field.innerHTML = "Час: " + time + " сек";
    timer();
  }, 1000)
}
timer();


class Quesion{
    constructor(){


       this.number1 = randint(1, 10)   
       this.number2 = randint(1, 10)  
       this.sign = signs[randint(0,3)]
       this.quesion = this.number1 + " " + this.sign + " " + this.number2
       this.correct = 0  
       if(this.sign == "+"){
            this.correct = this.number1 + this.number2
       }if(this.sign == "-"){
            this.correct = this.number1 - this.number2
       }if(this.sign == "*"){
            this.correct = this.number1 * this.number2
       }if(this.sign == "/"){
            this.correct = Math.round(this.number1 / this.number2)
       }
       this.answers = [
        this.correct,
        randint(this.correct - 5, this.correct - 1),
        randint(this.correct - 5, this.correct - 1),
        randint(this.correct + 1, this.correct + 5),
        randint(this.correct + 1, this.correct + 5),
       ] 
       shuffle(this.answers)
    }
    display(){
        question_field.innerHTML = this.quesion
        for(let i = 0; i < answers_buttons.length; i+=1){
          answers_buttons[i].innerHTML = this.answers[i]
        }
    }
}

let current_question = new Quesion()
current_question.display()
let corr_count = 0
let corr_field = document.querySelector(".correct")
for(let i = 0; i < answers_buttons.length; i+=1){
    answers_buttons[i].addEventListener("click", function(){
       if(answers_buttons[i].innerHTML == current_question.correct){
          answers_buttons[i].style.backgroundColor = "#00ff33"
          anime({
            targets: answers_buttons[i],
            duration: 1000,
            easing: "linear",
            backgroundColor: "#000000"

          })
          corr_count +=1
            corr_field.innerHTML = "Правильні відповіді: " + corr_count
       }else{ answers_buttons[i].style.backgroundColor = "#ff0000"}
                anime({
            targets: answers_buttons[i],
            duration: 1000,
            easing: "linear",
            backgroundColor: "#000000"

          })
        current_question = new Quesion()
        current_question.display()
    })
}
