let top_color='rgb(4, 69, 175)';
function themeGreen() {
    document.body.classList.remove('blue');
    document.body.classList.add('green');
    top_color=	'rgb(0,100,0)';
  }
  
  function themeBlue() {
    document.body.classList.remove('green')
    document.body.classList.add('blue')
    top_color=	'rgb(4, 69, 175)';
    
  }

 let themeChange= document.getElementById('theme');
 themeChange.addEventListener('change',()=>{

if(themeChange.value=='green'){
    themeGreen();
    configTopBar();
}else{
    themeBlue();
    configTopBar();
}
 })
  
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
const finalanswerList = {};


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
        if(questions[currentQuestion].type == "Checkbox"){
            console.log("multiple select");
            console.log($(`#${event.keyCode}`).attr('class').split(/\s+/));

            if($(`#${event.keyCode}`).attr('class').split(/\s+/).includes('active')){
                console.log("remove class")
                $(`#${event.keyCode}`).removeClass('active');
               }else{
                console.log("add class")
                $(`#${event.keyCode}`).addClass('active');
                }
        }else if (questions[currentQuestion].type == "Radio"){
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
function configTopBar(){
topbar.config({
    autoRun      : false,
    barThickness : 4,
    barColors    : {
        '0'      : top_color,
    },
    shadowBlur   : 10,
    shadowColor  : top_color
  })
topbar.show();
}
configTopBar();

// single select = 1   - Radio
// multiple select = 2   - Checkbox
// text box = 3    - TextArea
// nps = 4   -   NPS
// matrix question = 5  -  Likert
// star = 6   - Rating
// drop down = 7  - Picklist
// input box =  8  -  Text
// multiple select drop down =  9 Multi-Select Picklist

// var questions = "";

// var surveyID = document.getElementById("myHiddenId").value;
// var questions =  [{"Position":"1","qstnID":"aES3V0000008PQCWA2","qstnNo":"SQ-001893","type":"NPS","question":"NPS Survey Question?","choices":"","Tag":""},{"Position":"2","qstnID":"aES3V0000008PQHWA2","qstnNo":"SQ-001894","type":"Radio","question":"Customer Satisfaction Survey?","choices":"Not satisfied at all; Somewhat unsatisfied; Neutral, Somewhat satisfied; Completely satisfied","Tag":""},{"Position":"3","qstnID":"aES3V0000008PQMWA2","qstnNo":"SQ-001895","type":"Likert","question":"Please provide your feedback about Syngenta Experience","choices":"Very Bad; Bad; Average; Good; Best","Tag":"Responses; Deliverability; Customer Satisfaction"},{"Position":"4","qstnID":"aES3V0000008PQNWA2","qstnNo":"SQ-001896","type":"Picklist","question":"Select Picklist example?","choices":"One; Two; Three; Four; Five","Tag":""},{"Position":"5","qstnID":"aES3V0000008PQRWA2","qstnNo":"SQ-001897","type":"Multi-Select Picklist","question":"Multi-Select Picklist?","choices":"One; Two; Three; Four; Five","Tag":""},{"Position":"6","qstnID":"aES3V0000008PQOWA2","qstnNo":"SQ-001898","type":"Checkbox","question":"Check Box example?","choices":"One; Two; Three; Four; Five","Tag":""},{"Position":"7","qstnID":"aES3V0000008PQWWA2","qstnNo":"SQ-001899","type":"Rating","question":"Rating example?","choices":"","Tag":""},{"Position":"8","qstnID":"aES3V0000008PQbWAM","qstnNo":"SQ-001900","type":"Text","question":"Text Question example?","choices":"","Tag":""},{"Position":"9","qstnID":"aES3V0000008PQgWAM","qstnNo":"SQ-001901","type":"TextArea","question":"TextArea example","choices":"","Tag":""}];

// displayQuestion();

var questions ="";

fetch(`https://online.syngenta.com/ampscript1?surveyID=${surveyID}`).then(res => res.text()).then((text) =>{
    console.log(text);
    console.log(JSON.parse(text));
    questions = JSON.parse(text)
    for(let i=0;i<questions.length;i++){
        finalanswerList[`qstnID${questions[i].Position}`] = questions[i].qstnID
        finalanswerList[`qstnNo${questions[i].Position}`] = questions[i].qstnNo
        finalanswerList[`qstnTitle${questions[i].Position}`] = questions[i].question
        finalanswerList[`qstnType${questions[i].Position}`] = questions[i].type
        finalanswerList[`qstn${questions[i].Position}`]  = ""
        finalanswerList[`surveyID`]  = surveyID
        finalanswerList[`thankURL`]  = `https://www.syngenta.co.za/`
        finalanswerList[`submit`] = "Submit"
        finalanswerList[`currency`] = "USD"



    }
    displayQuestion();

}).catch((err) =>{
    console.log(err);
})










// topbar.progress('+.'+progress_value)






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
        h5Question.setAttribute('value', questions[currentQuestion].Position);
        h5Question.className = 'list-group-item list-group-item-action list-group-item-warning .disabled';
        h5Question.innerHTML = questions[currentQuestion].question;
        questionContainer.appendChild(h5Question);

        ok_button = `<button id="okButton" class="btn" onclick="checkAnswer()">OK</button>`;
        sumbit_button = `<button id="okButton" class="btn" onclick="submitAnswer()">Submit</button>`;

        submit_button = `<input class="button" type="submit" id="submit" name="submit" value="Submit"  />`;

        if(currentQuestion+1 == questions.length){
            saveBtncontainer.innerHTML = sumbit_button;
        }else{
            saveBtncontainer.innerHTML= ok_button ;

        }

        if(questions[currentQuestion].type == "Radio"){

            let choices = questions[currentQuestion].choices.split(";")

            for (let i = 0; i < choices.length; i++) {
                var btnChoices = document.createElement('button');
                btnChoices.innerHTML = '';
                btnChoices.className = 'list-group-item list-group-item-action';
                btnChoices.innerHTML = choices[i];
                btnChoices.setAttribute('value', choices[i]);
                choiceContainer.appendChild(btnChoices);
                btnChoices.setAttribute('id',choice_id+i);
                btnChoices.onclick = selectAnswer;
                console.log(questions[currentQuestion].Position in answerList )
                if(questions[currentQuestion].Position in answerList && answerList[questions[currentQuestion].Position]== choices[i] ){
                    btnChoices.classList.add('active');
                }
                
            }

        }else if(questions[currentQuestion].type == "Checkbox"){
            let choices = questions[currentQuestion].choices.split(";")

            for (let i = 0; i < choices.length; i++) {
                var btnChoices = document.createElement('button');
                btnChoices.innerHTML = '';
                btnChoices.className = 'list-group-item list-group-item-action';
                btnChoices.innerHTML = choices[i];
                btnChoices.setAttribute('value', choices[i]);
                choiceContainer.appendChild(btnChoices);
                btnChoices.setAttribute('id',choice_id+i);
                btnChoices.onclick = multipleselectAnswer;
                
                if(questions[currentQuestion].Position in answerList && answerList[questions[currentQuestion].Position].includes(choices[i] )){
                 
                    btnChoices.classList.add('active');
                }
                
            }

        }else if(questions[currentQuestion].type == "TextArea"){

            let textarea_html = `<textarea class="form-control active" name="" id="text_area_${currentQuestion}" cols="30" rows="10"></textarea>`;
            choiceContainer.innerHTML = textarea_html;

            if(questions[currentQuestion].Position in answerList){

                document.querySelector(`#text_area_${currentQuestion}`).value = answerList[questions[currentQuestion].Position]
            }
  

        }else if(questions[currentQuestion].type == "NPS"){

           let radio_html ='';
           for(let i=1;i<=10;i++){

            if(questions[currentQuestion].Position in answerList && answerList[questions[currentQuestion].Position].includes(i) ){
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
        }else if(questions[currentQuestion].type == "Likert"){

            let choices = questions[currentQuestion].choices.split(";")
            let tag = questions[currentQuestion].Tag.split(";")
            let choices_html = `<th>&nbsp;</th>`;
           
            let tag_with_radio = '';
            for(let i=0;i<choices.length;i++){
                choices_html += `<th width="15%"><label>${choices[i]}</label></th>`;

                
            }

            for(let j=0;j<tag.length;j++){
                let radio_buttons = '';
                
                for(let k=0;k<choices.length;k++){

                    if(questions[currentQuestion].Position in answerList && tag[j] in answerList[questions[currentQuestion].Position] && choices[k] == answerList[questions[currentQuestion].Position][tag[j]]  ){
                        radio_buttons +=`<td><input type="radio" id="${currentQuestion}${j}" name="${tag[j]}" value="${choices[k]}" class="likertRadio" checked></td>`

                    }else{
                        radio_buttons +=`<td><input type="radio" id="${currentQuestion}${j}" name="${tag[j]}" value="${choices[k]}" class="likertRadio"></td>`
                    }


                }


                tag_with_radio += `<tr style="text-align:center;">
                <th style="text-align:left;">
                <label id="label_"${currentQuestion}>${tag[j]}</label>
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

        }else if(questions[currentQuestion].type == "Rating"){
            let star_rating ="";

          for(let i =10;i>=1;i--){

                star_rating += `<input id="score${i*10}" class="ratingControl__radio" type="radio" name="rating${currentQuestion}" value="${i*10}" />
                <label for="score${i*10}" class="ratingControl__star" title="Half Star"></label>`

           
          }

     

          choiceContainer.innerHTML = `<div class="ratingControl">${star_rating}</div>`;
          if(questions[currentQuestion].Position in answerList){
            // alert(`${answerList[questions[currentQuestion].Position]*20}`)
            document.getElementById(`score${answerList[questions[currentQuestion].Position]*20}`).checked = true;
            // $(`#score${answerList[questions[currentQuestion].Position]*10}`).sttr("checked", "checked");
          }

        }else if(questions[currentQuestion].type == "Picklist"){
            let choices = questions[currentQuestion].choices.split(";")
            let options_html = "<option>Select Value</option>";

            for(let i=0;i<choices.length;i++){
                if(questions[currentQuestion].Position in answerList && answerList[questions[currentQuestion].Position] == choices[i]){
                    options_html += `<option value="${choices[i]}" selected>${choices[i]}</option>`;
                }else{
                    options_html += `<option value="${choices[i]}">${choices[i]}</option>`;
                }
               
            }
          
             choiceContainer.innerHTML = `<select id="select_${currentQuestion}" class="form-control">${options_html}</select>`;


        }else if(questions[currentQuestion].type == "Text"){

            // <input type="hidden" name="qstnID${questions[currentQuestion].Position}" value="${questions[currentQuestion].qstnID}">
            // <input type="hidden" name="qstnNo${questions[currentQuestion].Position}" value="${questions[currentQuestion].qstnNo}">`

            let input_html = `<input type="text" class="form-control active" name="" id="input_${currentQuestion}" >`;
            choiceContainer.innerHTML = input_html;

            if(questions[currentQuestion].Position in answerList){

                document.querySelector(`#input_${currentQuestion}`).value = answerList[questions[currentQuestion].Position]
            }
        }else if(questions[currentQuestion].type == "Multi-Select Picklist"){
            let choices = questions[currentQuestion].choices.split(";")
            let options_html = "";

            for(let i=0;i<choices.length;i++){
                if(questions[currentQuestion].Position in answerList && answerList[questions[currentQuestion].Position].includes(choices[i])){
                    options_html += `<option value="${choices[i]}" selected>${choices[i]}</option>`;
                }else{
                    options_html += `<option value="${choices[i]}">${choices[i]}</option>`;
                }
               
            }
          
             choiceContainer.innerHTML = `<select id="select_${currentQuestion}" class="form-control" multiple>${options_html}</select>`;


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

    if(questions[currentQuestion].type == "Radio" && $('.active').map((_,el) => el.value).get().length !=0 ){
        // alert($('.active').map((_,el) => el.value).get());
        answerList[question_id.getAttribute('value')] = $('.active').map((_,el) => el.value).get();
    }else if(questions[currentQuestion].type == "Checkbox" && $('.active').map((_,el) => el.value).get().length !=0){
        answerList[question_id.getAttribute('value')] = $('.active').map((_,el) => el.value).get();
    }else if(questions[currentQuestion].type == "NPS" && document.querySelector(`input[name="rating${currentQuestion}"]:checked`) != null){
        answerList[question_id.getAttribute('value')] = document.querySelector(`input[name="rating${currentQuestion}"]:checked`).value;
    }else if(questions[currentQuestion].type == "Likert" && document.querySelector(`.likertRadio:checked`) != null ){
        let tag = questions[currentQuestion].Tag.split(";")
        answerList[question_id.getAttribute('value')] = {};
        for(let i=0;i<tag.length;i++){
            if(document.querySelector(`input[id="${currentQuestion}${i}"]:checked`)){
                answerList[question_id.getAttribute('value')][tag[i]] = document.querySelector(`input[id="${currentQuestion}${i}"]:checked`).value;
            }
            
        }
        // answerList[question_id.getAttribute('value')] = document.querySelector(`input[name="rating${currentQuestion}"]:checked`).value;
    }else if (questions[currentQuestion].type == "TextArea" && document.querySelector(`#text_area_${currentQuestion}`).value != ""){
        answerList[question_id.getAttribute('value')] = document.querySelector(`#text_area_${currentQuestion}`).value;
    }else if(questions[currentQuestion].type == "Rating" && document.querySelector(`input[name="rating${currentQuestion}"]:checked`) != null){
        answerList[question_id.getAttribute('value')] = document.querySelector(`input[name="rating${currentQuestion}"]:checked`).value/20;
    }else if(questions[currentQuestion].type == "Picklist" && document.querySelector(`#select_${currentQuestion}`).value != ""){
        answerList[question_id.getAttribute('value')] = document.querySelector(`#select_${currentQuestion}`).value;
    }else if (questions[currentQuestion].type == "Text" && document.querySelector(`#input_${currentQuestion}`).value != ""){

        answerList[question_id.getAttribute('value')] = document.querySelector(`#input_${currentQuestion}`).value;
    }else if (questions[currentQuestion].type == "Multi-Select Picklist" && document.querySelector(`#select_${currentQuestion}`).value != ""){
        answerList[question_id.getAttribute('value')] =$(`#select_${currentQuestion}`).val();
    }


    progress_value = ((Object.keys(answerList).length*100)/questions.length);
    topbar.progress('.'+progress_value)
    // alert(JSON.stringify(answerList),progress_value)
    setTimeout(nextQuestion,500);


}


function submitAnswer(){
    checkAnswer()
    // alert(JSON.stringify(answerList))

    for(let i=0;i<questions.length;i++){
        finalanswerList[`qstn${questions[i].Position}`]  = answerList[`${questions[i].Position}`]
    }

    let form_data = new FormData();

    for ( var key in finalanswerList ) {
        form_data.append(key, finalanswerList[key]);
    }
    
    
    fetch("https://online.syngenta.com/GL_SurveySubmission",{
    method: "POST",
    body: form_data
})
.then(function(res){ console.log(res) })
.catch(function(res){ console.log(res) })

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
    window.location.replace(finalanswerList[`thankURL`]);
}





