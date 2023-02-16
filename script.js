// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

  // VARIABLES
let tableHrsEl = $('.tableHrs')
let currentTime = dayjs().format('H')
let workHrsNumber = $('.tableHrs').children().length
let saveBtn = $('.saveBtn')
let savedTasks = []
let headerEl = $('.header-el')
let today = dayjs()

  // CHECK previous saved tasks in Local Storage and update them in the screen//
let tasksFromLocalStorage = JSON.parse(localStorage.getItem("savedTasks"))
if (tasksFromLocalStorage) {
  savedTasks = tasksFromLocalStorage
  console.log(savedTasks)
  // UPDATE saved tasks in the table
  for (let i=0; i<savedTasks.length; i++) {
    $('.tableHrs').find('#' + savedTasks[i].time).children('textarea').text(savedTasks[i].task)
  }
}

  // SAVE entered task in local Storage //
function saveContent(event){
  event.preventDefault()
  let btnClicked = $(event.target)
  let idSaveItem = btnClicked.parent().parent().attr('id')
  let taskEntered = ($('.tableHrs').find('#' + idSaveItem)).children('textarea').val()  
  console.log('element clicked' , btnClicked)
  console.log(taskEntered)
  console.log(idSaveItem)

  // if (taskEntered===" ") {
  //   console.log('no task entered')
  //   // alert('No task added')
  //   return
  // } else {
    let newTask = { 
      time: idSaveItem,
      task: taskEntered
    }
    console.log(newTask)
    savedTasks.push(newTask)
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks))
    // DISPLAY Task saved message for 3 seconds
    tableHrsEl.prepend('<p> Appointment added to <span> localStorage &#10004 </span></p>')
    tableHrsEl.children('p').attr('class','taskMessage')
    let messageTimer = setTimeout(function() {
      tableHrsEl.children('p').remove()
    }, 2000)
    
} 
// }

// CLEAR my day function
function clearContent(){
  console.log('clicked')
  localStorage.clear()
  window.location.reload()
}  

// let currentTime = 16
console.log(currentTime) 
console.log(workHrsNumber)
// ADD Class to color code the table - past, present, future //
for (let i= 0; i<workHrsNumber; i++) {
  let idNumber = parseInt($('.tableHrs').children().eq(i).attr('id'))
  // console.log(idNumber)
    if (currentTime > idNumber) {
      $('.tableHrs').children().eq(i).addClass('past')
    } else if (currentTime < idNumber){
      $('.tableHrs').children().eq(i).addClass('future')
    } else {
      $('.tableHrs').children().eq(i).addClass('present')
    }
}

  // DISPLAY the current date in the header of the page.
$('#currentDay').text(today.format('dddd, MMMM D'))

  // CLEAR my day button
headerEl.append('<button> Clear my Day </Button>')
headerEl.children('button').addClass('px-3 py-1 btn-success')

  // EVENT listeners
headerEl.on('click', 'button', clearContent)
tableHrsEl.on('click', '.saveBtn', saveContent)
