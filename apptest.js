var employeeArray = [];
var salaryArray = [];
var totalSalary=0;
//This is what happens when you hit the "submit" button.
$(document).ready(function(){
	$('#employeeform').submit(function(event){
		event.preventDefault();

		var values = {};

		//console.log($('#employeeform').serializeArray());

		$.each($('#employeeform').serializeArray(), function(i, field){
			values[field.name] = field.value;
		})

		$('#employeeform').find('input[type=text]').val(" ");
		//console.log(values);
		employeeArray.push(values);

		//console.log(employeeArray);
		appendDom(values);

		//salaryArray.push(values.salary);
		//console.log(salaryArray);


		$('#salarytotal').find($('h3')).text("Total Salary Paid Per Month: $" + addSalary());
			
					//This adds the monthly salaries together. I did have salaryArray as the loop array, but I am trying to get the info out of employeeArray so that the .data works. 
		function addSalary(){
			for (var i=0; i<employeeArray.length; i++){
			totalSalary+=(parseInt(employeeArray[i].salary)/12);
			}
				return Math.round(totalSalary);

		}

	})	

	
	//This is what happens when the delete button is clicked.

	$('#employeeform').on('click', '.delete', function(){
		$(this).siblings().remove();  //$this.parent().remove();
		$(this).remove();
		var deleteemployee =  $(this).siblings().data("employeedelete");

		for(var i=0; i<employeeArray; i++){
			if(employeeArray[i].employeenumber==deleteemployee){
				employeeArray.splice(i);
			}
		}
		
	});

});

//This is what appears on the DOM
function appendDom(employee){
	//console.log(employee);
	$('#employeeform').append('<div class="employees" data-employeedelete= "'+employee.employeenumber+'"></div>')//This whole div is going to hold only one person. So, if you want to do the data-id thing, you should probably put it here. You will also want to loop through the array containing employees, and splice out salary
	var $el = $('#employeeform').children().last();
	$('.emplyees').data("");

	$el.append("<br>");
	$el.append($("<tr></tr>").text(employee.employeename));
	$el.append("<span>" + employee.employeenumber + "&nbsp</span>");
	$el.append("<span>" + employee.jobtitle + "&nbsp</span>");
	$el.append("<span>" + employee.salary + "</span>");
	$el.append("<button class='delete'>Delete</button>");



















