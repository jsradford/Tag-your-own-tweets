//response options for the question 2 dropdown
var emotions=["Don't know",'confused','sad','certain','happy','angry','energized'] 

function configSurvey(){
    textbox('question1','What emotions does this tweet elicit for you?')
    dropdown('question2','What is the dominant emotion communicated in the tweet?',emotions)
    singleChoice('question3','If you saw this tweet in your timeline, how likely would you be to like this tweet?',['Not likely','Somewhat Likely','Very Likely'])
    textbox('question4','Other thoughts?')
    surveyOutput=["textbox","dropdown","singleChoice",'textbox']
}

/*function nextTweet(){
    saveSurvey()
    nextTweet()
}*/

//save input from the survey
function saveSurvey(){
    output=[]
    output.push(tweet.id_str)                               //start with the tweet id itself
    for (i=0; i<=surveyOutput.length; i++){
        if (surveyOutput[i]=='textbox'){
            output.push(saveTextbox(i+1));              //if its a textbox, add the results from the saveTextbox function
        }else if (surveyOutput[i]=='dropdown'){
            output.push(saveDropdown(i+1));             //if its a dropdown, add the results from the saveDropdown function
        }else if (surveyOutput[i]=='singleChoice'){
            output.push(saveSingleChoice(i+1));         //if its a single choice, add the results from the saveSingleChoice function
        }
    }
    submit(output)                                      //save the data
    $.when($('#survey').empty()).then(configSurvey())      //when saving is done, delete the old survey and create a new one.
}


function textbox(element_id, question){
    //element_id is a unique name for the survey item - "quesiton1"
    //question is the text of the question prompt - "Are you okay?" 
    
    $('#survey').append('<br><div id='+element_id+'><div id="'+element_id+'header"></div><input id="'+element_id+'input"></input>  </div><br>') //add a new survey item element
    $('#'+element_id+'header').html(question); //add the text of the question to the header div
    
    //create an textbox and add it to the question 
    var input = document.createElement("input");            //create an input element
    input.id=element_id                                     //set its id
    input.type='text'                                       //make it a text input
    $('#'+element_id+'input').append(input);                //add the input to the question
}; 

//save the textbox data
function saveTextbox(question_num){
    //question_num is the order the question appears in the survey. Is it the '1' (1st), '2' (2nd), or '10' (10th) question.
    
    element_id='question'+question_num                      //reconstruct the element id
    var response=$('#'+element_id+'input').val();           //get the contents of the textbox
    return response
}

//Add a single choice response question
function singleChoice(element_id, question,options){
    //element_id is a unique name for the survey item - "quesiton1"
    //question is the text of the question prompt - "Are you okay?"
    //options are a list of the options that can be selected - ['Yes','No']

    $('#survey').append('<br><div id='+element_id+'><div id="'+element_id+'header"></div><div id="'+element_id+'choices"> </div> </div><br>')//add a new survey item element
	$('#'+element_id+'header').html(question);              //add the text of the question to the header div
  	$('#'+element_id+'choices').append("<table>");          //start with a table
  	
  	//For each option, append it as a new choice
  	for (x in options) {
  		var choices = document.createElement("input");      //create an input 
    	choices.type = "radio";                             //set to radio buttons
    	choices.value = options[x];                         //add the option as the value for the radio button
    	choices.name = options[x];                          //add the option as the name for the radio button
    	$('#'+element_id+'choices').append('<tr> <td>');    //create a new table row
    	$('#'+element_id+'choices').append(options[x]);     //add the option text
    	$('#'+element_id+'choices').append(choices);        // add the radio button
    	$('#'+element_id+'choices').append('</td> </tr>');  //end the new row
	};
};

//Save the single choice question response for question number question_num
function saveSingleChoice(question_num){
     //question_num is the order the question appears in the survey. Is it the '1' (1st), '2' (2nd), or '10' (10th) question.
     
    element_id='question'+question_num                      //reconstruct the element id
    selected=document.querySelectorAll('#'+element_id+"choices input[type=radio]:checked") //get all radio buttons that were selected
    if (selected.length==1){
        return(selected[0].name)                            //if one was selected, return its name
    }else{
        return('none')                                      //if none were selected, return 'none'
    }
}

//Create a dropdown question
function dropdown(element_id,question,options){
    //element_id is a unique name for the survey item - "quesiton1"
    //question is the text of the question prompt - "Are you okay?"
    //options are the options that can be selected in a dropdown - ['Yes','No']
   
    $('#survey').append('<br><div id='+element_id+'><div id="'+element_id+'header"></div><div id="'+element_id+'choices"> </div> </div><br>') //add a new survey item element
	$('#'+element_id+'header').html(question);              //add the text of the question to the header div
  	var selector = document.createElement("select");        //create a select element (i.e. a dropdown)
  	selector.id=element_id+'response';                      //set its id to 'response'
  	
  	//For each option, append it to the list of dropdown options
  	for (x in options) {	                                
  		var choices = new Option();                         //create an Option object
    	choices.value = options[x];                         //set its value to the current option in the list
    	choices.name = options[x];                          //set its name to the current option in the list
    	choices.text  = options[x];                         //set its text to the current option in the list
    	selector.options.add(choices);                      //add the option to the dropdown
    };
    $('#'+element_id+'choices').append(selector);           //add the dropdown to the survey item
};

//Save the dropdown response
function saveDropdown(question_num){
     //question_num is the order the question appears in the survey. Is it the '1' (1st), '2' (2nd), or '10' (10th) question.
     
    element_id='question'+question_num                      //reconstruct the element id
    var answer=$('#'+element_id+'response').val();          //get whatever was selected in the dropdown
    return answer
}




