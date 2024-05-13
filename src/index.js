import { intervalToDuration, parse, isBefore, endOfYear } from "date-fns";

const dayInputEl = document.getElementById("day");
const monthInputEl = document.getElementById("month");
const yearInputEl = document.getElementById("year");
const birthdayForm = document.getElementById("birthday-form");

const errorMessages = {
  requiredField: "This field is required",
  invalidDay: "Must be a valid day",
  invalidMonth: "Must be a valid month",
  invalidYear: "Must be a valid year",
  yearInThePast: "Must be in the past",
  invalidNumber: "Must be a valid number",
};

const lightRedColor = getComputedStyle(
  document.documentElement
).getPropertyValue("--light-red");

function handleInputEvents(input) {
  const validationFunction = getValidationFunction(input.id);
  checkInputValidity(input, `err-msg-${input.id}`, validationFunction);
}

function getValidationFunction(inputId) {
  switch (inputId) {
    case "day":
      return isValidDay;
    case "month":
      return isValidMonth;
    case "year":
      return isValidYear;
    default:
      return isRequired;
  }
}

function isValidDay(day) {
  const numericDay = parseInt(day);
  return !isNaN(numericDay) && numericDay >= 1 && numericDay <= 31
    ? ""
    : errorMessages.invalidDay;
}

function isValidMonth(month) {
  const numericMonth = parseInt(month);
  return !isNaN(numericMonth) && numericMonth >= 1 && numericMonth <= 12
    ? ""
    : errorMessages.invalidMonth;
}

function isValidYear(year) {
  const numericYear = parseInt(year);
  if (isNaN(numericYear)) {
    return errorMessages.invalidNumber;
  }
  const parsedDate = parse(`${numericYear}-01-01`, "yyyy-MM-dd", new Date());
  const currentDate = new Date();

  return isBefore(parsedDate, endOfYear(currentDate))
    ? ""
    : errorMessages.yearInThePast;
}

function checkInputValidity(input, errorMessageId, validationFunction) {
  let errorMessage =
    input.value.trim() === ""
      ? errorMessages.requiredField
      : validationFunction(input.value);

  const errorMessageEl = document.getElementById(errorMessageId);
  errorMessageEl.innerText = errorMessage;

  const label = document.querySelector(`label[for='${input.id}']`);

  input.style.borderColor = errorMessage ? lightRedColor : "";

  label.style.color = errorMessage ? lightRedColor : "";
}

function getBirthdayDate(e) {
  e.preventDefault();
  const errMsgs = document.querySelectorAll(".err-msg");
  errMsgs.forEach((el) => (el.innerText = ""));

  const birthdayValue = `${dayInputEl.value}/${monthInputEl.value}/${yearInputEl.value}`;

  calculateAge(birthdayValue);
}

function calculateAge(dob) {
  const birthdayDate = parse(dob, "dd/MM/yyyy", new Date());
  const dateToday = new Date();

  if (isBefore(birthdayDate, dateToday)) {
    const interval = intervalToDuration({
      start: birthdayDate,
      end: dateToday,
    });

    renderAge(interval);
  } else {
    const errMsgYearEl = document.getElementById("err-msg-year");
    const yearInputLabel = document.querySelector(`label[for='year']`);
    errMsgYearEl.innerText = errorMessages.yearInThePast;
    yearInputEl.style.borderColor = lightRedColor;
    yearInputLabel.style.color = lightRedColor;
  }
}

function renderAge(age) {
  const { years, months, days } = age;

  const ageYearsEl = document.getElementById("age-years");
  const ageMonthsEl = document.getElementById("age-months");
  const ageDaysEl = document.getElementById("age-days");

  ageYearsEl.innerHTML = years || 0;
  ageMonthsEl.innerHTML = months || 0;
  ageDaysEl.innerHTML = days || 0;
}

birthdayForm.addEventListener("submit", getBirthdayDate);

birthdayForm.addEventListener("focusout", (e) => {
  if (e.target.matches(".birthday-input")) {
    handleInputEvents(e.target);
  }
});

birthdayForm.addEventListener("input", (e) => {
  if (e.target.matches(".birthday-input")) {
    handleInputEvents(e.target);
  }
});

if (module.hot) {
  module.hot.accept();
}
