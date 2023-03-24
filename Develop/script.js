// Grabbing elements from the DOM and dates from dayjs.

const timeBlock = $('.time-block');
const saveBtn = $('.saveBtn');
const currentDay = $('#currentDay');
var currentHour = dayjs()['$H'];
var currentTime = dayjs().format("dddd MMM DD YYYY");


// Event listener to save text content to local storage. 

timeBlock.on('click', function(event) {
  let target = event.target;
  let savedNote = this.children[1].value;
  if (target.tagName == "BUTTON" || target.tagName == "I") {
    localStorage.setItem(this.id, savedNote);
  };
})


// Function to populate the empty note with value from local storage.

function populateNote() {

  // Loops through the ids of the div by hour and grabs local storage by matching the id to the key value. It then sets the value of the text area to the value of the local storage item.

  for (let i=0;i<timeBlock.length;i++) {
    let key = timeBlock[i].id;
    let text = timeBlock[i].children[1];
    let storedNote = localStorage.getItem(key);

    text.value = storedNote;
  }
}


// Function to change color of note blocks to indicate past, present, or future. 

function changeColor() {
  for (let i=0; i<timeBlock.length; i++) {

    // Grab the note hour from the note's text content and set it to an integer.
    let noteHour = parseInt(timeBlock[i].children[0].textContent)


    // Convert note hour to 24 hour time.
    if (noteHour >= 1 && noteHour <= 5) {
      noteHour += 12
    }

    // Apply classes relative to the current hour.
    if (noteHour < currentHour) {
      timeBlock[i].classList.add("past");
    } else if (noteHour == currentHour) {
      timeBlock[i].classList.add("present");
    } else if (noteHour > currentHour) {
      timeBlock[i].classList.add("future");
    }
  }
}


// Function to populate the header with the current day.

function displayDay() {
    headerDate = currentDay[0];
    headerDate.textContent = currentTime;
    console.log(currentTime);
};


populateNote();
changeColor();
displayDay();
