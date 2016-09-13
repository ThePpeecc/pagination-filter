//Problem: we have too many students shown, and we cant search through them
//Solution:

//Global variable to hold all students
var globalList = $(".student-list").children();
var currentList = globalList;

//Function that hides/shows students per button press
var buttonIndexChange = function() {
    //Calculate the start index and end index
    var start = this.text * 10 - 10;
    var end = start + 9;
    //Call showHideStudents
    showHideStudents(start, end, currentList);
    //Removes the active class from the current one
    $('.active').removeClass('active');
    //Add the activeClass to the new button
    $(this).addClass('active');
}

//Function that searches the students
var searchStudents = function() {
    //First hide all students
    hideStudents();
    //Search through their names and e-mails
    currentList = globalList.filter(function ( index ) {
      if (($(".student-details h3", this).html().search($('.student-search input').val().toLowerCase()) != -1)//Names
      || ($(".email", this).html().search($('.student-search input').val().toLowerCase()) != -1)) { //e-mails
        return true; //If student is a match we return true
      }
      return false; //Or else we forget them this time
    })
    //Show the new list of matched students
    currentList.show()
    //Add new buttons
    addbuttons(currentList);
}

//Function that hides and shows students at a start and end index
function showHideStudents(fromIndex, toIndex, list) {
    //Hide the students
    hideStudents();
    //Filter through the students, and only show the students between those numbers
    list.filter(function(index) {
        return ((index <= toIndex) && (index >= fromIndex));
    }).show();
}

function calculateNumberOfButtons( list ){
  //Calculate number of buttons
  var numberOfStudents = list.length;
  var numberOfbuttons = Math.floor(numberOfStudents / 10) + 1;
  return numberOfbuttons;
}

//Hides students
function hideStudents() {
    globalList.hide();
}

//Function that adds buttons
function addbuttons(list) {
    //Remove old buttons
    $('.pagination ul').empty();

    //Get number of buttons needed
    var numberOfbuttons = calculateNumberOfButtons(list)
    //For all buttons
    for (var i = 1; i <= numberOfbuttons; i++) {
        //Create button and listItem
        var listItem = $('<li></li>');
        var newbutton = $('<a href="#">' + i + '</a>');
        //Add click event
        newbutton.click(buttonIndexChange);
        //If button is the first one
        if (i === 1) newbutton.addClass('active');
        //Add button to html
        newbutton.appendTo(listItem);
        listItem.appendTo('.pagination ul');
    }
    //Shows the first group of students
    showHideStudents(0, 9, list);
}

//add event to button
$('.student-search button').click(searchStudents);
$('.student-search input').keyup(searchStudents);

addbuttons(currentList);
