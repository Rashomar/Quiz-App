const checkButton = document.getElementById("check");
const nextButton = document.getElementById("next");
const output = document.getElementById('quiz');

let arr = [];
let questionArr = [];
let answersArr = [];
let wrongAnswersArr =[];
let mixedAns = [];

output.innerHTML=
        `<div class="question"> Question </div>
        <div class="answers"> Answers </div>`;

let i = 0;
req();
nextButton.addEventListener('click',function(e){

		nextButton.disabled=true;

		function setDisabled() {
		   nextButton.disabled = false;
		}

		setTimeout(setDisabled, 600);
		  

		let quest = document.querySelector('.question');
		let answers = document.querySelector('.answers');
		 
		 questionArr=[];
		 answersArr=[];
		 mixedAns = [];
		 wrongAnswersArr=[];


	  	let mapObj = {
		   "&quot;":'"',
		   "&#039;":"'",
		   "&amp;":"&",
		   "&prime;":"′",
		   "&deg;":"°",
		   "&eacute":"é",
		   "&auml;":"ä",
		};
		arr[0][i].correct_answer = arr[0][i].correct_answer.replace(/&quot;|&#039;|&amp;|&prime;|&deg;|&eacute;|&auml;/gi, function(matched){
		  return mapObj[matched];
		});	


	 	questionArr.push(arr[0][i].question);
		answersArr.push(arr[0][i].correct_answer);
		for(let j=0; j<arr[0][i].incorrect_answers.length;j++){
		 wrongAnswersArr.push(arr[0][i].incorrect_answers[j]);
		}
	     	
	     mixedAns = answersArr.concat(wrongAnswersArr);
	     mixedAns = shuffleArray(mixedAns);
	      

		 let outputArr = [];
		 mixedAns.map(function(x){
		 	  outputArr.push(
		          `<label>
		            <input type="radio" name="answer" value="${x}">
		            ${x}
		          </label>`
		        );
		 	});
		 quest.innerHTML = questionArr;
		 answers.innerHTML =outputArr.join(" ");
	
		i++;

		if(i==10){
			i=0;
			arr=[];
			req();
		}
}); //end nextButton.addEventListener



	function req(){
		fetch('https://opentdb.com/api.php?amount=10').then(function(response){
		  return response.json().then(function(data){

		   	arr.push(data.results);
		
			}); //end return response
		}).catch(function() {
	        console.log("error");
	    }); //end fetch and catch
	} // end req function



checkButton.addEventListener('click',function(e){
  let element = document.querySelectorAll("input");

	for(let i=0; i<element.length; i++){
		if(element[i].value == answersArr) {
	  		element[i].parentElement.style.color="green";
	  }
	  else{
	  		element[i].parentElement.style.color = "red";
	  }
	}
}); //end checkButton.addEventListener


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}