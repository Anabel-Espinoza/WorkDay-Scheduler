$(document).ready(function() {

    // VARIABLES
  let tableHrsEl = $('.tableHrs')
  let currentTime = dayjs().format('H')
  let workHrsNumber = $('.tableHrs').children().length
  let saveBtn = $('.saveBtn')
  let savedTasks = []
  let headerEl = $('.header-el')
  let today = dayjs()
  let currentDate = $('#currentDay')

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
    let newTask = { 
        time: idSaveItem,
        task: taskEntered
    }
    console.log(newTask)
    savedTasks.push(newTask)
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks))
      // DISPLAY Task saved message for 2 seconds
    tableHrsEl.prepend('<p> Appointment added to <span> localStorage &#10004 </span></p>')
    tableHrsEl.children('p').attr('class','taskMessage')
    let messageTimer = setTimeout(function() {
      tableHrsEl.children('p').remove()
    }, 2000)  
  } 

  // CLEAR my day function
  function clearContent() {
    console.log('clicked')
    localStorage.clear()
    window.location.reload()
  }  

  // COLOR code the table - past, present, future //
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
  function ordinalDate(day) {
    if(day === 1 || day === 11 || day === 21 || day === 31) {
      return 'st'
    } else if (day === 2 || day === 12 || day === 22) {
      return 'nd'
    } else if (day === 3 || day === 13 || day === 23) {
      return 'rd'
    } else {
      return 'th'
    }
  }
  let ordinalEnd = (ordinalDate(today.format('DD')))
  console.log(ordinalEnd)
  // UPDATE clock in header
  function headerTime() {
    today = dayjs()
    currentDate.text(today.format('dddd, MMMM DD') + ordinalEnd + ' at ' + today.format('h:mm:ss a'))   
  }
  setInterval(headerTime,1000)
  
    // CLEAR my day button
  headerEl.append('<button> Clear my Day </Button>')
  headerEl.children('button').addClass('px-3 py-1 btn clearBtn')

    // EVENT listeners
  headerEl.on('click', 'button', clearContent)
  tableHrsEl.on('click', '.saveBtn', saveContent)

});