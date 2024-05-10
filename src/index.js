import {
  intervalToDuration,
  isValid,
  parse,
  isBefore,
  endOfYear,
} from "date-fns";

function handleInputEvents(input) {
  let validationFunction;
  switch (input.id) {
    case "day":
      validationFunction = isValidDay;
      break;
    case "month":
      validationFunction = isValidMonth;
      break;
    case "year":
      validationFunction = isValidYear;
      break;
    default:
      validationFunction = isRequired;
      break;
  }
  checkInputValidity(input, `err-msg-${input.id}`, validationFunction);
}

const birthdayInputs = document.querySelectorAll(".birthday-input");

birthdayInputs.forEach((input) => {
  input.addEventListener("focusout", () => {
    handleInputEvents(input);
  });

  input.addEventListener("input", () => {
    handleInputEvents(input);
  });
});

function checkInputValidity(input, errorMessageId, validationFunction) {
  let errorMessage;
  if (input.value.trim() === "") {
    errorMessage = "This field is required";
  } else {
    errorMessage = validationFunction(input.value);
  }

  const errorMessageEl = document.getElementById(errorMessageId);
  errorMessageEl.innerText = errorMessage;

  const label = document.querySelector(`label[for='${input.id}']`);

  if (errorMessage) {
    input.style.borderColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--light-red");
    label.style.color = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--light-red");
  } else {
    input.style.borderColor = "";
    label.style.color = "";
  }
}

function isValidDay(day) {
  const numericDay = parseInt(day);
  return !isNaN(numericDay) && numericDay >= 1 && numericDay <= 31
    ? ""
    : "Must be a valid day";
}

function isValidMonth(month) {
  const numericMonth = parseInt(month);
  return !isNaN(numericMonth) && numericMonth >= 1 && numericMonth <= 12
    ? ""
    : "Must be a valid month";
}

function isValidYear(year) {
  const numericYear = parseInt(year);
  //this doesn't work correctly because we are hardcoding the day and month
  const parsedDate = parse(`${numericYear}-01-01`, "yyyy-MM-dd", new Date());
  const currentDate = new Date();

  return !isNaN(numericYear) &&
    isValid(parsedDate) &&
    isBefore(parsedDate, endOfYear(currentDate))
    ? ""
    : "Must be in the past";
}

function getBirthdayDate(e) {
  e.preventDefault();
  const errMsgs = document.querySelectorAll(".err-msg");
  Array.from(errMsgs).map((el) => (el.innerText = ""));

  const dayInputEl = document.getElementById("day");
  const monthInputEl = document.getElementById("month");
  const yearInputEl = document.getElementById("year");

  const birthdayValue = `${dayInputEl.value}/${monthInputEl.value}/${yearInputEl.value}`;

  calculateAge(birthdayValue);
}

function calculateAge(dob) {
  const birthdayDate = parse(dob, "dd/MM/yyyy", new Date());
  const dateToday = new Date();

  const interval = intervalToDuration({ start: birthdayDate, end: dateToday });

  const age = {
    years: interval.years || 0,
    months: interval.months || 0,
    days: interval.days || 0,
  };
  renderAge(age);
}

function renderAge(age) {
  const { years, months, days } = age;

  const ageYearsEl = document.getElementById("age-years");
  const ageMonthsEl = document.getElementById("age-months");
  const ageDaysEl = document.getElementById("age-days");

  ageYearsEl.innerHTML = years;
  ageMonthsEl.innerHTML = months;
  ageDaysEl.innerHTML = days;
}

const birthdayForm = document.getElementById("birthday-form");
birthdayForm.addEventListener("submit", getBirthdayDate);

if (module.hot) {
  module.hot.accept();
}
