
$(function () {
  var curDay = dayjs();
  $('#currentDay').text(curDay.format('dddd, MMMM DD, YYYY'));
  var currentHour = dayjs().format('H');
  // var currentHour = 12;
  console.log(currentHour);
  
  var timeSlots = [9,10,11,12,13,14,15,16,17]
  var timeSlotsIndex = 0
  
  function classSwitch() {
    var currentTimeSlot = "hour-"+timeSlots[timeSlotsIndex];
    var elementID = '#' + currentTimeSlot
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
    $(elementID).children("textarea").text(savedInput);
    timeSlotsIndex++;
  
    if (timeSlotsIndex <= timeSlots.length) {
        classSwitch();
    }
  
  };
  $(document).ready(function() {
    classSwitch();
  });
  
  $(".saveBtn").on( "click", function(event) {
      event.preventDefault();
      var timeSlotEl = $(this).closest('.time-block').attr('id');
      var timeSlotId = document.getElementById(timeSlotEl);
      var textSlotEl = timeSlotId.querySelector('textarea')
      var saveInput = textSlotEl.value;
  
        localStorage.setItem(timeSlotEl, saveInput);
  } );
  
});
