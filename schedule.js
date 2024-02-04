// Event objects for different dates

const events = {
  "28-feb": [
    {
      startTime: "08:00 AM",
      endTime: "10:00 AM",
      name: "On The Spot Coding",
      eventCategory: "Technical Event",
    },
    {
      startTime: "09:00 AM",
      endTime: "11:30 AM",
      name: "Logo Designing",
      eventCategory: "Technical Event",
    },
    {
      startTime: "12:00 PM",
      endTime: "03:00 PM",
      name: "Exhibition of Projects",
      eventCategory: "Technical Event",
    },
    {
      startTime: "02:00 PM",
      endTime: "06:30 PM",
      name: "Solo Dance",
      eventCategory: "Cultural Event",
    },
    {
      startTime: "10:00 AM",
      endTime: "01:00 PM",
      name: "Couple Cricket",
      eventCategory: "Sports Event",
    },
    {
      startTime: "06:00 PM",
      endTime: "08:30 PM",
      name: "Udit Narayan & Alka Yagnik Performance",
      eventCategory: "Celebrity Performance",
    },
  ],
  "29-feb": [
    {
      startTime: "09:00 AM",
      endTime: "01:30 AM",
      name: "Photography",
      eventCategory: "Cultural Event",
    },
    {
      startTime: "11:00 AM",
      endTime: "2:30 AM",
      name: "Poster Making",
      eventCategory: "Cultural Event",
    },
    {
      startTime: "01:00 PM",
      endTime: "03:00 PM",
      name: "Startup Ideas",
      eventCategory: "Technical Event",
    },
    {
      startTime: "03:00 PM",
      endTime: "05:30 PM",
      name: "Pole Dance by Maanik",
      eventCategory: "Cultural Event",
    },
    {
      startTime: "06:00 PM",
      endTime: "08:00 PM",
      name: "Event Management by Alok Gupta Sir",
      eventCategory: "Expert Talk",
    },
  ],
  "01-mar": [
    {
      startTime: "08:30 AM",
      endTime: "10:30 AM",
      name: "One Piece Spoilers by Siddharth",
      eventCategory: "Expert Talk",
    },
    {
      startTime: "10:30 AM",
      endTime: "01:00 AM",
      name: "Anime Recommendations by Nakul Rohilla",
      eventCategory: "Expert Talk",
    },
    {
      startTime: "12:00 PM",
      endTime: "04:00 PM",
      name: "E-Sports",
      eventCategory: "Technical Event",
    },
    {
      startTime: "04:30 PM",
      endTime: "07:00 PM",
      name: "Group Dance",
      eventCategory: "Cultural Event",
    },
    {
      startTime: "07:00 PM",
      endTime: "09:00 PM",
      name: "Chess",
      eventCategory: "Sports Event",
    },
  ],
};

// Function to convert 12-hour format time to 24-hour format
function convertTo24Hour(time12h) {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");
  if (hours === "12") {
    hours = "00";
  }
  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}`;
}

// Function to create event divs
function createEventDiv(event, index, events, eventsContainer) {
  const startTime12h = event.startTime;
  const endTime12h = event.endTime;

  // Convert 12-hour format times to 24-hour format
  const startTime24h = convertTo24Hour(startTime12h);
  const endTime24h = convertTo24Hour(endTime12h);

  const startHour = parseInt(startTime24h.split(":")[0]);
  const startMinute = parseInt(startTime24h.split(":")[1]);
  const endHour = parseInt(endTime24h.split(":")[0]);
  const endMinute = parseInt(endTime24h.split(":")[1]);

  // Calculate the left position if needed
  let leftPosition = 0;
  if (index > 0) {
    const prevEventData = events[index - 1];
    const prevEndTime24h = convertTo24Hour(prevEventData.endTime);
    const prevEndHour = parseInt(prevEndTime24h.split(":")[0]);
    const prevEndMinute = parseInt(prevEndTime24h.split(":")[1]);

    if (
      startHour <= prevEndHour ||
      (startHour === prevEndHour && startMinute <= prevEndMinute)
    ) {
      const prevEventDiv = eventsContainer.children[index - 1];
      leftPosition = prevEventDiv.offsetLeft + prevEventDiv.offsetWidth + 16; // Add 1rem margin (16px)
    }
  }

  const eventDiv = document.createElement("div");
  eventDiv.classList.add("event");
  // Calculate top position
  eventDiv.style.top = `${(startHour - 8) * 60 + startMinute}px`;
  // Calculate height
  eventDiv.style.height = `${
    (endHour - startHour) * 60 + (endMinute - startMinute)
  }px`;
  eventDiv.style.left = `${leftPosition}px`; // Set the left position
  eventDiv.innerHTML = `<span class="category">${event.eventCategory}</span>
  <h3 class="event-name">${event.name}</h3>
  <span class="event-timing">${event.startTime} - ${event.endTime}</span>`;
  return eventDiv;
}

// Function to dynamically add events for a specific date
function populateEvents(date, categoryFilter) {
  const schedule = document.getElementById(`${date}-schedule`);
  const eventsData = events[date];
  const eventsContainer = schedule.querySelector(".events");

  // Clear existing events
  eventsContainer.innerHTML = "";

  // Filter events based on the selected category
  const filteredEvents =
    categoryFilter === "all"
      ? eventsData
      : eventsData.filter((event) => event.eventCategory === categoryFilter);

  // Populate events
  filteredEvents.forEach((event, index) => {
    const eventDiv = createEventDiv(
      event,
      index,
      filteredEvents,
      eventsContainer
    );
    eventsContainer.appendChild(eventDiv);
  });
}

let currentSelectedDate = "";
// Function to show events for a specific date
function showEvents(date) {
  // Hide all schedules
  document.querySelectorAll(".schedule").forEach((schedule) => {
    schedule.style.display = "none";
  });
  document.getElementById("category-filter").value = "all";
  // Show the selected schedule
  document.getElementById(`${date}-schedule`).style.display = "flex";

  currentSelectedDate = date;
  // Populate events for the selected date
  populateEvents(date, "all"); // Initially display all events
}

// Get references to the buttons
const feb28Button = document.getElementById("feb28");
const feb29Button = document.getElementById("feb29");
const mar01Button = document.getElementById("mar01");

// Add event listeners to the buttons
feb28Button.addEventListener("click", () => {
  toggleButtonClass(feb28Button);
  showEvents("28-feb");
});

feb29Button.addEventListener("click", () => {
  toggleButtonClass(feb29Button);
  showEvents("29-feb");
});

mar01Button.addEventListener("click", () => {
  toggleButtonClass(mar01Button);
  showEvents("01-mar");
});

// Function to toggle a class on the clicked button
function toggleButtonClass(button) {
  // Remove the 'clicked' class from all buttons
  document.querySelectorAll(".btns button").forEach((button) => {
    button.classList.remove("clicked");
  });
  // Add the 'clicked' class to the clicked button
  button.classList.add("clicked");
}
feb28Button.click();
// Show events for the initial date (28 Feb)
showEvents("28-feb");

// Add event listener to the category filter dropdown menu
document.getElementById("category-filter").addEventListener("change", () => {
  filterEventsByCategory(currentSelectedDate);
});

// Function to handle category filter change
function filterEventsByCategory(date) {
  const categoryFilter = document.getElementById("category-filter").value;
  populateEvents(date, categoryFilter);
}
