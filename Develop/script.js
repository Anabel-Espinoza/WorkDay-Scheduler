// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
let tableHrsEl = $('.tableHrs')
let currentTime = dayjs().format('H')
let workHrsNumber = $('.tableHrs').children().length
let saveBtn = $('.saveBtn')

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?


function saveContent(event){
  event.preventDefault()
  let btnClicked = $(event.target)
  let idSaveItem = btnClicked.parent('div').attr('id')

  let taskEntered = ($('.tableHrs').find('#' + idSaveItem)).children('textarea').val()
 
  console.log(btnClicked)
  console.log(taskEntered)
  console.log(idSaveItem)
  // if ($())
}

tableHrsEl.on('click', '.saveBtn', saveContent)
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

// let currentTime = 16
console.log(currentTime) 
console.log(workHrsNumber)
// ADD Class to color code the table - past, present, future //
for (let i= 0; i<workHrsNumber; i++) {
  let idNumber = parseInt($('.tableHrs').children().eq(i).attr('id'))
  console.log(idNumber)
    if (currentTime > idNumber) {
      $('.tableHrs').children().eq(i).addClass('past')
    } else if (currentTime < idNumber){
      $('.tableHrs').children().eq(i).addClass('future')
    } else {
      $('.tableHrs').children().eq(i).addClass('present')
    }
}

// TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  let today = dayjs()
  $('#currentDay').text(today.format('dddd, MMMM D'))
