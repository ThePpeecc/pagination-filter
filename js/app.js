//Problem: we have too many students shown, and we cant search through them
//Solution:

//Hold the student list
var studentList = $('.student-list');

//Global variable to hold all students
var globalList = studentList.children();
var currentList = globalList;

/*--- Utility functions ---*/

//Function that hides and shows students at a start and end index
function paginationOfStudents(fromIndex, toIndex, list) {
    //Hide students
    list.hide();
    //Show the students from list
    //and then returns the filterede list
    return list.filter(function(index) {
        return ((index <= toIndex) && (index >= fromIndex)); //If they are between the indexes they get shown
    });

}

//Function that calculate the number of buttons nessesary
function calculateNumberOfButtons(list) {
    //Calculate number of buttons
    var numberOfStudents = list.length;
    //The number of buttons is students devided by 10 plus one for the first set.
    //(Since irl we dont start from 0)
    var numberOfbuttons = Math.floor(numberOfStudents / 10) + 1;
    return numberOfbuttons;
}

//Function that adds buttons
function addbuttons(list) {
    //Remove old buttons
    $('.pagination').empty();
    //Get number of buttons needed
    var numberOfbuttons = calculateNumberOfButtons(list);

    //If we have less than none button, we might as well not show it,
    //since it wont serve any purpose
    if (numberOfbuttons > 1) { //only if we have more than one button
        var buttonList = $('<ul></ul>');
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
            listItem.appendTo(buttonList);
        }
        //And we add the new list to the pagination div
        buttonList.appendTo('.pagination');
    }
}

//Function that adds a html message if no search matches are found
function noMatches() {
  //add a new list item to studentList
  var htmlMessage = $('<li id="noMatches"><h1>No mathes found</h1></li>');
  htmlMessage.appendTo(studentList);
}
//Removes the noMatches html message
function removeNoMatches() {
  $('#noMatches').remove();
}

/*--- Utility functions end ---*/

/*--- animation Functions ---*/

//Shows the students animated
function showNewStudentsAnimated(list) {
    if (list.length > 0) {
      //Show the list
      list.show();
      //Here we calculate the height of the studentList, so the animation will look really sleek.
      studentList.css('height', '' + 81 * list.length + 'px');
    }else {
      noMatches();
      studentList.css('height', '40px');
    }
    //Slowly animate the list down with the new students
    studentList.slideDown(800);
}

//Hides students
function hideStudents(callBack) {
    //Slowly animates the student view up
    studentList.slideUp(800, function() {
        //When done hide all the students and remove the noMathces Html if it is there
        removeNoMatches();
        globalList.hide();
        //And call any code in the callBack
        callBack();
    });
}

/*--- animation Functions end---*/


/*--- event functions ---*/

//Function that hides/shows students per button press
var buttonIndexChange = function() {
    //Stop the default behavior of the buttons (so that we can see the nice animations)
    event.preventDefault();
    //Calculate the start index and end index
    var start = this.text * 10 - 10;
    var end = start + 9;
    //First hide the students
    hideStudents(function() {
        //Call paginationOfStudents to hide all but the new section of students
        //Show the students again
        showNewStudentsAnimated(paginationOfStudents(start, end, currentList));

    });
    //Removes the active class from the current one
    $('.active').removeClass('active');
    //Add the activeClass to the selected button
    $(this).addClass('active');
};

//Function that searches the students
var searchStudents = function() {
    //Stop any animation that is all ready happening
    studentList.stop();

    //Search through their names and e-mails
    currentList = globalList.filter(function(index) {
        if (($(".student-details h3", this).html().search($('.student-search input').val().toLowerCase()) != -1) || //Names
            ($(".email", this).html().search($('.student-search input').val().toLowerCase()) != -1)) { //e-mails
            return true; //If student is a match we return true
        }
        return false; //or else we forget them this time
    });

    //Then first hide all students with animation
    hideStudents(function() {
        //Add new buttons
        addbuttons(currentList);
        //add pagination to the students and then show them.
        showNewStudentsAnimated(paginationOfStudents(0, 9, currentList));
    });
};

/*--- event functions end ---*/


//add event to button and input
$('.student-search button').click(searchStudents);
$('.student-search input').keyup(searchStudents);

//Shows the first group of students
showNewStudentsAnimated(paginationOfStudents(0, 9, currentList));

//add first set of buttons
addbuttons(currentList);
