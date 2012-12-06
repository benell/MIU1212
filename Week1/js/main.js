$('#home').on('pageinit', function(){
	//code needed for home page goes here
	var searchControl = $('.searchButton');
	
	searchControl.live('click', toggleSearch);
	
	function toggleSearch () {
		$('.ui-listview-filter').fadeToggle("slow", "linear");	
	};
	
	
	var getData = function(){
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeLi = document.createElement('li');
			var makeListAButton = document.createElement('a')
			var linksLi = document.createElement('li');
			var key = localStorage.key(i); //because this is in a for loop, i represents the iteration of the loop that we are in.
			console.log("The key is: " + key);
			var value = localStorage.getItem(key);
			console.log("Value is: " + value);
			var theItem = jQuery.parseJSON(value); //Converts the string in local storage back to an object
			var makeSubListUl = document.createElement('ul');
			console.log("The value of theItem: ");
			console.log(theItem);
			var itemSet = theItem.itemStore[1];
			var setElement = "#page" + itemSet;
			var setItem = $(setElement);
			console.log("The Value of setItem is: ");
			console.log(setItem);
			setGame.append(makeLi);
			makeLi.append(makeListAButton);
			makeListAButton.append(makeSubListUl);
			makeSubListUl.setAttribute('data-content-theme','d');
			for(var n in theItem){
				if (theItem[n][1] != 0){
					var makeSubLi = document.createElement('li');
					makeSubListUl.append(makeSubLi);
					var optSubText = theItem[n][0]+" "+theItem[n][1];
					makeSubLi.innerHTML = optSubText;
					makeSubListUl.append(linksLi);
				};
			};
			makeItemLinks(localStorage.key(i), linksLi, makeListAButton); //Create edit and delete links for each item in local storage
		};
	};
	
	function makeItemLinks(key, linksLi, makeListAButton){
		//Edit single item link
		var editLink = makeListAButton;
		editLink.href = "#addItem";
		editLink.key = key;
		editLink.addEventListener("click", editItem);
		/*
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		*/
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		deleteLink.setAttribute('data-split-icon','delete');
		deleteLink.addEventListener("click", deleteItem);
		linksLi.appendChild(deleteLink);
	};
	
		var autofillData = function (){
		console.log("Function: autoFillData, has run");
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		};
	};


	var	deleteItem = function (){
		var ask = confirm("Are you sure want to remove this Item?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Item removed.");
			window.location.reload();
		}else{
			alert("No changes made.");
		};			
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
	
	$('#clearButton').live('click', clearLocal);
	$('#dataButton').live('click', autofillData);
	$('#popButton').live('click', getData);
});	
		
$('#additem').on('pageinit', function(){

	console.log("addItem loaded.");
	//This function grabs the value of the checkbox for the storeData function.
		/*
	function getCheckboxValue(){
			if($('elementID').checked){
				checkValue = $('elementID').value;
			} else {
				checkValue = "No";
			};
		};
	*/
		
		var storeData = function(data){
			console.log("storeData has run");
				var id;
				if(!data){
					id		= Math.floor(Math.random()*100000001); //Creating an ID number allows you to create multiple saves
				}else{
					id = data;
				};
				
				//gather up all our form field values and store them in an object.
				//Object properties contain an array that has the form label and the input values.
				//getSelectedRadio(); //Sets the variable that is used in the object
				getCheckboxValue(); //Same for checkbox
				var item				= {}; //Create the Object
					item.name			= ["Name:", $('#itemName').val()]; //Assign it values based on the elements in the form using the getElementById function.
					item.store			= ["Store:", $('#itemStore').val()];
					item.budget			= ["Budget:", $('#itemBudget').val()];//.val() is the JQM API Attribute that we use to store the user input.
					item.cost			= ["Estimated Cost:", $('#itemCost').val()];
					item.date			= ["Date Added:", $('#itemDate').val()];
			
				//Save data into Local Storage; Use Stringify to convert our object to a string.
				localStorage.setItem(id, JSON.stringify(item));
				alert("Item Saved!");
					
		};
		
		$('#additem').submit(storeData);
		
		/*
				var myForm = $('#additem');
				    myForm.validate({
						invalidHandler: function(form, validator) {
						},
						submitHandler: function() {
							var data = myForm.serializeArray();
							storeData(data);
						}
					});
		*/
		
			//any other code needed for addItem page goes here
});//End of addItem pageinit

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

function editItem(){
		
		//Grab the Data for our item from local storage
		var value = localStorage.getItem(this.key);
		console.log("This is the value of value = localStorage.getItem(this.key):" + " " + value);
		var item = JSON.parse(value);
		console.log("This is the value of item: " + item);
		toggleControls("off");
		//populate the form fields with the current localStorage values.
		$('itemName').value = item.name[1];
		$('itemStore').value = item.store[1];
		$('itemBudget').value = item.budget[1];
		$('itemCost').value = item.cost[1];
		$('itemDate').value = item.date[1];
		
		//repeat format for items to fill
		
		
		//remove the initial listener from the event
		//save.removeEventListener("click", storeData);
		//Change Submit button Value to Edit Button
		$('submit').value = "Save Edit";
		var editSubmit = $('#submit');
		//Save the key value established in this function as a property of the editSubmit event so we can se that value when we save the data we edited.
		//editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
		
};

//$('#about').on('pageinit', function(){

//});
