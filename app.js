var employeeArray = [];
var totalSalary=0;

$(document).ready(function(){
	//Function for hitting the submit button.
	$('#employeeform').submit(function(event){
		event.preventDefault();

		var values = {};


		$.each($('#employeeform').serializeArray(), function(i, field){
			values[field.name] = field.value;
		})

		$('#employeeform').find('input[type=text]').val(" ");
		
		employeeArray.push(values);

		
		appendDom(values);

		addSalary(employeeArray);

	});




//This adds the monthly salaries together. I did have salaryArray as the loop array, but I am trying to get the info out of employeeArray so that the .data works. 
function addSalary(array){
	totalSalary=0;	
	for (var i=0; i<array.length; i++){
	totalSalary+=((array[i].salary)/12);
	}
		$('#salarytotal').find($('h3')).text("Total Salary Paid Per Month: $" + totalSalary);
		return totalSalary;
}


//This is what appears on the DOM
function appendDom(employee){
	//console.log(employee);
	$('#employeeform').append('<div class="employees" data-employeedelete= "'+employee.employeenumber+'"></div>')//This whole div is going to hold only one person. So, if you want to do the data-id thing, you should probably put it here. You will also want to loop through the array containing employees, and splice out salary
	var $el = $('#employeeform').children().last();
	$('.employees').data("");

	$el.append("<br>");
	$el.append($("<tr></tr>").text(employee.employeename));
	$el.append("<span>" + employee.employeenumber + "&nbsp</span>");
	$el.append("<span>" + employee.jobtitle + "&nbsp</span>");
	$el.append("<span>" + employee.salary + "</span>");
	$el.append("<button class='delete' data-id='"+employee.employeenumber+"'>Delete</button>");		
}

//Code for what happens when the delete button is pressed.
	$('#employeeform').on('click', '.delete', function(){ 
		console.log("PRE: ", totalSalary);
		var deleteemployee =  $(this).parent().data("employeedelete");
		for(var j=0; j<employeeArray.length; j++){
			if($(this).data("id")==deleteemployee){

				console.log(employeeArray);
				console.log(employeeArray[j]);

				var deletedSalary = parseInt(employeeArray[j].salary);

				totalSalary -= deletedSalary/12; 
				employeeArray=employeeArray.splice(j,1);
				$('#salarytotal').find($('h3')).text("Total Salary Paid Per Month: $" + totalSalary);
			}else {console.log("Something's Wrong")}
		}
		//console.log(totalSalary);
		//console.log(deleteemployee); //The deleteemployee is finding the correct data tag no matter which button is clicked. The employeArray is being spliced correctly. However, if you click anything other than the first delete button, you get error "something wrong" from else statement.
		//This is coming up undefined. Looks like issue is here. Also explains getting the else statment. 
		//console.log(employeeArray);//This was working, but now it isn't. Not getting the splice. 
		console.log("POST: ", totalSalary);
		$(this).parent().remove(); //This works, so the click itself is also working.
	})
});














