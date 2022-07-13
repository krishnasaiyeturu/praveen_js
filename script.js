let currentQuestion = 0;
let currentScore = 0; 
let resultContainer = document.querySelector('#result-container');
const questionContainer = document.querySelector('#question-container');
const choiceContainer = document.querySelector('#choice-container');
const answerContainer = document.querySelector('#answer-container');
const saveBtncontainer = document.querySelector('#savebuttoncontainer');

let choice_id = 65; //for letter A
let progress_value = 0;
const answerList = {};


document.addEventListener('keypress', function(e) {
    $(document).keyup(function(event){
        console.log(event.keyCode)
        if(event.keyCode == 13){                
            // alert("keypressed");
     
            if(currentQuestion + 1 == questions.length ){
                submitAnswer();
            }else{
                checkAnswer();
            }
            
        }
        
    });


    $(document).keyup(function(event){
        console.log(event.keyCode)
   
        event.stopImmediatePropagation();
        if(questions[currentQuestion].type == 2){
            console.log("multiple select");
            console.log($(`#${event.keyCode}`).attr('class').split(/\s+/));

            if($(`#${event.keyCode}`).attr('class').split(/\s+/).includes('active')){
                console.log("remove class")
                $(`#${event.keyCode}`).removeClass('active');
               }else{
                console.log("add class")
                $(`#${event.keyCode}`).addClass('active');
                }
        }else if (questions[currentQuestion].type == 1){
            console.log("single")
            if(document.querySelector('.active')){
                document.querySelector('.active').classList.remove('active')
            }
            $(`#${event.keyCode}`).addClass('active') 
        }

    });



});

document.getElementById("previousQuestion").disabled = true;


// Top progress bar configuration

topbar.config({
    autoRun      : false,
    barThickness : 4,
    barColors    : {
        '0'      : 'rgb(4, 69, 175)',
    },
    shadowBlur   : 10,
    shadowColor  : 'rgb(4, 69, 175);'
  })
topbar.show();


// single select = 1
// multiple select = 2
// text box = 3
// nps = 4
// matrix question = 5


var questions = [
      {
        id:1,
        type:2,
        question: "1. If there are 6 apples and you take away 4, how many do you have?",
        choices: ["A. 4", 
        "B. 2", 
        "C. 6",
        "D. None of the above"],
    },  
    {
        id:2,
        type:1,
        question: "2. How Many Bones Does An Adult Human Have?",
        choices: ["A. 310", 
        "B. 257", 
        "C. 167",
        "D. 206"],
    },
    {   
        id:3,
        type:5,
        question: "3. Which Country Does The Sport Football Come From?",
        choices: ["Very Bad","Bad","Average","Good","Best"],
        tag : ["Response","react","comple" ],
    },
    {
        id:4,
        type:4,
        question: "4. How Many Sides Do Three Triangles And Three Rectangles Have In Total?",
    },
    {
        id:5,
        type:3,
        question: "5. How Many Sides Do Three Triangles And Three Rectangles Have In Total?",

    }


];



// topbar.progress('+.'+progress_value)

displayQuestion();




function displayQuestion() {
    if (currentQuestion === questions.length) {
        document.getElementById("nextQuestion").disabled = true;

    } 
    else {
        questionContainer.innerHTML = '';
        choiceContainer.innerHTML = '';
        document.body.style.background = 'transparent';
        let h5Question = document.createElement('h5');
        h5Question.setAttribute('id', 'questionId');
        h5Question.setAttribute('value', questions[currentQuestion].id);
        h5Question.className = 'list-group-item list-group-item-action list-group-item-warning .disabled';
        h5Question.innerHTML = questions[currentQuestion].question;
        questionContainer.appendChild(h5Question);

        ok_button = `<button id="okButton" class="btn" onclick="checkAnswer()">OK</button>`;
        sumbit_button = `<button id="okButton" class="btn" onclick="submitAnswer()">Submit</button>`;

        if(currentQuestion+1 == questions.length){
            saveBtncontainer.innerHTML = sumbit_button;
        }else{
            saveBtncontainer.innerHTML= ok_button ;

        }

        if(questions[currentQuestion].type == 1){

            for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
                var btnChoices = document.createElement('button');
                btnChoices.innerHTML = '';
                btnChoices.className = 'list-group-item list-group-item-action';
                btnChoices.innerHTML = questions[currentQuestion].choices[i];
                btnChoices.setAttribute('value', questions[currentQuestion].choices[i]);
                choiceContainer.appendChild(btnChoices);
                btnChoices.setAttribute('id',choice_id+i);
                btnChoices.onclick = selectAnswer;
                console.log(questions[currentQuestion].id in answerList )
                if(questions[currentQuestion].id in answerList && answerList[questions[currentQuestion].id]==questions[currentQuestion].choices[i] ){
                    btnChoices.classList.add('active');
                }
                
            }

        }else if(questions[currentQuestion].type == 2){

            for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
                var btnChoices = document.createElement('button');
                btnChoices.innerHTML = '';
                btnChoices.className = 'list-group-item list-group-item-action';
                btnChoices.innerHTML = questions[currentQuestion].choices[i];
                btnChoices.setAttribute('value', questions[currentQuestion].choices[i]);
                choiceContainer.appendChild(btnChoices);
                btnChoices.setAttribute('id',choice_id+i);
                btnChoices.onclick = multipleselectAnswer;
                
                if(questions[currentQuestion].id in answerList && answerList[questions[currentQuestion].id].includes(questions[currentQuestion].choices[i] )){
                 
                    btnChoices.classList.add('active');
                }
                
            }

        }else if(questions[currentQuestion].type == 3){

            let textarea_html =  `<textarea class="form-control active" name="" id="" cols="30" rows="10"></textarea>`;
            choiceContainer.innerHTML = textarea_html;

        }else if(questions[currentQuestion].type == 4){

           let radio_html ='';
           for(let i=1;i<=10;i++){
            radio_html += `<label><input type="radio" name="rating${currentQuestion}" value="${i}" /><span class="border rounded px-3 py-2">${i}</span></label>`
           }

          let nps_question = `
           
            <div class="rating-input-wrapper d-flex justify-content-between mt-2">
                ${radio_html}
            </div>
            <div class="rating-labels d-flex justify-content-between mt-1">
              <label>Very unlikely</label>
              <label>Very likely</label>
            </div>`

            choiceContainer.innerHTML = nps_question;
        }else if(questions[currentQuestion].type == 5){

            let choices_html = `<th>&nbsp;</th>`;
            let radio_buttons = '';
            let tag_with_radio = '';
            for(let i=0;i<questions[currentQuestion].choices.length;i++){
                choices_html += `<th width="15%"><label>${questions[currentQuestion].choices[i]}</label></th>`;

                radio_buttons +=`<td><input type="radio" id="qstn_4_${i}" name="qstn_4_${i}" value=${questions[currentQuestion].choices[i]} class="likertRadio"></td>`
            }

            for(let j=0;j<questions[currentQuestion].tag.length;j++){
                tag_with_radio += `<tr style="text-align:center;">
                <th style="text-align:left;">
                <label id="label_"${currentQuestion}>${questions[currentQuestion].tag[j]}</label>
               </th>                              
               ${radio_buttons}                
              </tr> `
            
            }   

            let matrix_feedback = `<table border="0">
            <tbody>
              <tr style="text-align: center;">
              ${choices_html}
              </tr>
              ${tag_with_radio}
         </tbody>
         </table>`

         choiceContainer.innerHTML = matrix_feedback;

        }

   

    }
}

function selectAnswer(){
    if(document.querySelector('.active')){
        document.querySelector('.active').classList.remove('active')
    }
  
    this.classList.add('active');
}

function multipleselectAnswer(){
   console.log(typeof(this.classList))
   console.log([...this.classList].includes('active'));
   if([...this.classList].includes('active')){
    this.classList.remove('active');
   }else{
    this.classList.add('active');
   }
   
}


function checkAnswer() {
    let question_id = document.querySelector('#questionId');

    if(questions[currentQuestion].type in [1,2,3] ){
        answerList[question_id.getAttribute('value')] = $('.active').map((_,el) => el.value).get()
    }else if(questions[currentQuestion].type == 4){
        answerList[question_id.getAttribute('value')] = document.querySelector(`input[name="rating${currentQuestion}"]:checked`).value;
    }else if(questions[currentQuestion].type == 5){

    }
    // else{
    //     answerList[question_id.getAttribute('value')] = $('.active').map((_,el) => el.value).get()

    // }
    progress_value = ((Object.keys(answerList).length*100)/questions.length) - 1
    topbar.progress('.'+progress_value)
    // alert(JSON.stringify(answerList))
    setTimeout(nextQuestion,500);


}


function submitAnswer(){
    checkAnswer()
    alert(JSON.stringify(answerList))
    reloadApp();

}


   
function nextQuestion() {
    if (currentQuestion == questions.length-2) {
        document.getElementById("nextQuestion").disabled = true;
    }{
        document.getElementById("previousQuestion").disabled = false;
        ++currentQuestion;
        displayQuestion(); 

    }
  
}

function previousQuestion() {
    document.getElementById("nextQuestion").disabled = false;
    if(currentQuestion > 0){
        --currentQuestion;
        displayQuestion(); 
    }else{
        document.getElementById("previousQuestion").disabled = true;
    }  
    
}



function reloadApp(){
    window.location.reload();
}





