$('#home').on('pageinit', function(){
	//code needed for home page goes here
});

$('#about').on('pageinit', function(){
	$("clearStorage").on('click', clearLocal());
});	
		
$('#addItem').on('pageinit', function(){

		var myForm = $('#itemForm'),
			formErrorLink = $('#formErrorLink');
		    myForm.validate({
			invalidHandler: function(form, validator) {
				formErrorLink.click(); // Code following this is not needed for this form, but is here for reference.
			/*
	for(var key in validator.submitted){
					var label = $('label[for^="'+ key +'"]');
					console.log(label.text())
				}
*/
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	$("#formCancel").on('click',function(){
		$('#formReset').click();
	})
	
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

var storeData = function(data){
console.log("storeData has run");
console.log(data)
		var id;
		if(!data.key){
			id		= Math.floor(Math.random()*100000001); //Creating an ID number allows you to create multiple saves
		}else{
			id = data.key;
		};
		localStorage.setItem(id, data);
		alert("Item Saved!");
		$('#formReset').click();
		
			
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){
	if(localStorage.length === 0){
		alert("There is no data to clear.");
	}else{
		var reply = confirm("Clear Local Storage Data?")
		if (reply === true){
			localStorage.clear();
			alert("Data Cleared.");
			window.location.reload();
			return false;
		}else{
			return false;
		};
	};
};


