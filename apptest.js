var employeeArray = [];
var totalSalary=0;
var counter=0;

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

		counter++;
		
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
	$('#employeestore').append('<div class="employees col-md-3"</div>')//This whole div is going to hold only one person. So, if you want to do the data-id thing, you should probably put it here. You will also want to loop through the array containing employees, and splice out salary
	var $el = $('#employeestore').children().last();
	$el.data("counter", counter);
	employee.counter=$el.data("counter");

	$el.append("<br>");
	$el.append("<p>" + "Employee Name: " + employee.employeename + "</p>");
	$el.append("<p>" + "Employee Number: " + employee.employeenumber + "&nbsp</p>");
	$el.append("<p>" + "Title: " + employee.jobtitle + "&nbsp</p>");
	$el.append("<p>" + "Salary: " + employee.salary + "</p>");
	$el.append("<button class='delete btn btn-danger' data-id='"+employee.employeenumber+"'>Delete</button>");		
}

//Code for what happens when the delete button is pressed.
	$('#employeestore').on('click', '.delete', function(){ 
		console.log("PRE: ", totalSalary);
		var $el = $(this).parent();
		var deleteemployee =  $el.data("counter");
		for(var j=0; j<employeeArray.length; j++){
			if(employeeArray[j].counter==deleteemployee){
				employeeArray.splice(j,1);
			}else {console.log("Something's Wrong")}
		}
		
			$el.remove();	

				$('#salarytotal').find($('h3')).text("Total Salary Paid Per Month: $" + addSalary(employeeArray));
		
		//console.log(totalSalary);
		//console.log(deleteemployee); //The deleteemployee is finding the correct data tag no matter which button is clicked. The employeArray is being spliced correctly. However, if you click anything other than the first delete button, you get error "something wrong" from else statement.
		//This is coming up undefined. Looks like issue is here. Also explains getting the else statment. 
		//console.log(employeeArray);//This was working, but now it isn't. Not getting the splice. 
	})
});












