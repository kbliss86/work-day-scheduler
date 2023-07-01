
//wrapped entire js code in a function so it will not execute until page load
$(function () {
  //using day.js to pull up the current date and formatiing it to display in a user friendly way
  var curDay = dayjs();
  $('#currentDay').text(curDay.format('dddd, MMMM DD, YYYY'));
  var currentHour = dayjs().format('H');
  
  //array for formating the times slots
  var timeSlots = [9,10,11,12,13,14,15,16,17]
  var timeSlotsIndex = 0
  
  //function for switching the class of the HTML elements so they can display the correct color for past/present/future
  function classSwitch() {
    var currentTimeSlot = "hour-"+timeSlots[timeSlotsIndex];
    var elementID = '#' + currentTimeSlot
    //pulls data from local storage depending on the element id
    var savedInput = localStorage.getItem(currentTimeSlot);
  
      if (currentHour < timeSlots[timeSlotsIndex]) {
        $( function() {
          $(elementID).ready(function() {
          $(elementID).switchClass( ".past", "future", 0);
          });
        } );
      } else if ( currentHour === timeSlots[timeSlotsIndex]) {
        $( function() {
          $(elementID).ready(function() {
          $(elementID).switchClass( ".past", "present", 0);
          });
        } );
      };
      //inserts the data from local storage to the text areas for each task
    $(elementID).children("textarea").text(savedInput);
    timeSlotsIndex++;
      //stops the function after the last timeslot is modified
    if (timeSlotsIndex <= timeSlots.length) {
        classSwitch();
    }
  
  };
  //calls the classSwitch function on page load
  $(document).ready(function() {
    classSwitch();
  });
  
  //save button for saving teh data in the text area
  $(".saveBtn").on( "click", function(event) {
      event.preventDefault();
      //$this is used to target the current element being clicked on and finding the parent ID name
      var timeSlotEl = $(this).closest('.time-block').attr('id');
      //uses name gathered in the "timeSlotEl" variable to pull the ID for the parent Element in HTML
      var timeSlotId = document.getElementById(timeSlotEl);
      //uses the parent element to select the text area child of the parent identified in the timeSLotID variable
      var textSlotEl = timeSlotId.querySelector('textarea')
      //assigns the value in the text area to the saveInput variable
      var saveInput = textSlotEl.value;
        //saves the value in local storage with the name of the parent element as the name and the text value as the value
        localStorage.setItem(timeSlotEl, saveInput);
  } );
  
});
