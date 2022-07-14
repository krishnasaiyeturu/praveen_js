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
// star = 6
// drop down = 7


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

    },
    {
        id:6,
        type:6,
        question: "6. How Many Sides Do Three Triangles And Three Rectangles Have In Total?",

    },
    {
        id:7,
        type:7,
        question: "7. How Many Sides Do Three Triangles And Three Rectangles Have In Total?",
        choices: ["Very Bad","Bad","Average","Good","Best"],

    },
    {
        id:8,
        type:4,
        question: "8. How Many Sides Do Three Triangles And Three Rectangles Have In Total?",
    },


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

            let textarea_html =  `<textarea class="form-control active" name="" id="text_area_${currentQuestion}" cols="30" rows="10"></textarea>`;
            choiceContainer.innerHTML = textarea_html;

        }else if(questions[currentQuestion].type == 4){

           let radio_html ='';
           for(let i=1;i<=10;i++){

            if(questions[currentQuestion].id in answerList && answerList[questions[currentQuestion].id].includes(i) ){
                radio_html += `<label><input type="radio" id="${currentQuestion}'_'${i}" name="rating${currentQuestion}" value="${i}" checked/><span class="border rounded px-3 py-2">${i}</span></label>`
            }else{
                radio_html += `<label><input type="radio" id="${currentQuestion}'_'${i}" name="rating${currentQuestion}" value="${i}" /><span class="border rounded px-3 py-2">${i}</span></label>`
            }
           
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
           
            let tag_with_radio = '';
            for(let i=0;i<questions[currentQuestion].choices.length;i++){
                choices_html += `<th width="15%"><label>${questions[currentQuestion].choices[i]}</label></th>`;

                
            }

            for(let j=0;j<questions[currentQuestion].tag.length;j++){
                let radio_buttons = '';
                
                for(let k=0;k<questions[currentQuestion].choices.length;k++){

                    if(questions[currentQuestion].id in answerList && questions[currentQuestion].tag[j] in answerList[questions[currentQuestion].id] && questions[currentQuestion].choices[k] == answerList[questions[currentQuestion].id][questions[currentQuestion].tag[j]]  ){
                        radio_buttons +=`<td><input type="radio" id="${currentQuestion}${j}" name="${questions[currentQuestion].tag[j]}" value="${questions[currentQuestion].choices[k]}" class="likertRadio" checked></td>`

                    }else{
                        radio_buttons +=`<td><input type="radio" id="${currentQuestion}${j}" name="${questions[currentQuestion].tag[j]}" value="${questions[currentQuestion].choices[k]}" class="likertRadio"></td>`
                    }


                }


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

        }else if(questions[currentQuestion].type == 6){
            let star_rating ="";

          for(let i =10;i>=1;i--){
            // alert(answerList[currentQuestion]*20)
            
            // if(questions[currentQuestion].id in answerList && answerList[questions[currentQuestion].id]*20 == i*10){
            //     console.log(answerList[questions[currentQuestion].id]*20 >= i*10,i)
            //     star_rating += `<input id="score${i*10}" class="ratingControl__radio" type="radio" name="rating${currentQuestion}" value="${i*10}" checked/>
            //     <label for="score${i*10}" class="ratingControl__star" title="Half 1 Star"></label>`
            //     // $(`#score${i*10}`).click()

            // }else{

                star_rating += `<input id="score${i*10}" class="ratingControl__radio" type="radio" name="rating${currentQuestion}" value="${i*10}" />
                <label for="score${i*10}" class="ratingControl__star" title="Half Star"></label>`

            // }
           
          }

     

          choiceContainer.innerHTML = `<div class="ratingControl">${star_rating}</div>`;
          if(questions[currentQuestion].id in answerList){
            // alert(`${answerList[questions[currentQuestion].id]*20}`)
            document.getElementById(`score${answerList[questions[currentQuestion].id]*20}`).checked = true;
            // $(`#score${answerList[questions[currentQuestion].id]*10}`).sttr("checked", "checked");
          }

        }else if(questions[currentQuestion].type == 7){

            let options_html = "<option>Select Value</option>";

            for(let i=0;i<questions[currentQuestion].choices.length;i++){
                if(questions[currentQuestion].id in answerList && answerList[questions[currentQuestion].id] == questions[currentQuestion].choices[i]){
                    options_html += `<option value="${questions[currentQuestion].choices[i]}" selected>${questions[currentQuestion].choices[i]}</option>`;
                }else{
                    options_html += `<option value="${questions[currentQuestion].choices[i]}">${questions[currentQuestion].choices[i]}</option>`;
                }
               
            }
          
             choiceContainer.innerHTML = `<select id="select_${currentQuestion}" class="form-control">${options_html}</select>`;


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

    if(questions[currentQuestion].type == 1 && $('.active').map((_,el) => el.value).get().length !=0 ){
        // alert($('.active').map((_,el) => el.value).get());
        answerList[question_id.getAttribute('value')] = $('.active').map((_,el) => el.value).get();
    }else if(questions[currentQuestion].type == 2 && $('.active').map((_,el) => el.value).get().length !=0){
        answerList[question_id.getAttribute('value')] = $('.active').map((_,el) => el.value).get();
    }else if(questions[currentQuestion].type == 4 && document.querySelector(`input[name="rating${currentQuestion}"]:checked`) != null){
        answerList[question_id.getAttribute('value')] = document.querySelector(`input[name="rating${currentQuestion}"]:checked`).value;
    }else if(questions[currentQuestion].type == 5 && document.querySelector(`.likertRadio:checked`) != null ){
        answerList[question_id.getAttribute('value')] = {};
        for(let i=0;i<questions[currentQuestion].tag.length;i++){
            if(document.querySelector(`input[id="${currentQuestion}${i}"]:checked`)){
                answerList[question_id.getAttribute('value')][questions[currentQuestion].tag[i]] = document.querySelector(`input[id="${currentQuestion}${i}"]:checked`).value;
            }
            
        }
        // answerList[question_id.getAttribute('value')] = document.querySelector(`input[name="rating${currentQuestion}"]:checked`).value;
    }else if (questions[currentQuestion].type == 3 && document.querySelector(`#text_area_${currentQuestion}`).value != ""){
        answerList[question_id.getAttribute('value')] = document.querySelector(`#text_area_${currentQuestion}`).value;
    }else if(questions[currentQuestion].type == 6 && document.querySelector(`input[name="rating${currentQuestion}"]:checked`) != null){
        answerList[question_id.getAttribute('value')] = document.querySelector(`input[name="rating${currentQuestion}"]:checked`).value/20;
    }else if(questions[currentQuestion].type == 7 && document.querySelector(`#select_${currentQuestion}`).value != ""){
        answerList[question_id.getAttribute('value')] = document.querySelector(`#select_${currentQuestion}`).value;
    }


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





