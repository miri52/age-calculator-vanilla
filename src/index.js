import { intervalToDuration, parse } from "date-fns";

const birthdayInputs = document.querySelectorAll(".birthday-input");

birthdayInputs.forEach((input) => {
  input.addEventListener("focusout", () => {
    checkIsRequired(input, `err-msg-${input.id}`);
  });
  input.addEventListener("input", () => {
    checkIsRequired(input, `err-msg-${input.id}`);
  });
});

function checkIsRequired(input, errorMessageId) {
  let inputValue = input.value;
  let errorMessage = isRequired(inputValue);
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

function isRequired(value) {
  return value.trim() === "" ? "This field is required" : "";
}

const dayInputEl = document.getElementById("day");
dayInputEl.addEventListener("input", checkValue);

function checkValue(e) {
  console.log(e.target.value);
  let inputValue = e.target.value;
}

function getBirthdayDate(e) {
  e.preventDefault();
  const errMsgs = document.querySelectorAll(".err-msg");
  Array.from(errMsgs).map((el) => (el.innerText = ""));

  const dayInputEl = document.getElementById("day");
  const monthInputEl = document.getElementById("month");
  const yearInputEl = document.getElementById("year");

  if (monthErrorMessage) {
    const errMessageEl = document.getElementById("err-msg-month");
    errMessageEl.innerText = monthErrorMessage;
    return;
  }

  if (yearErrorMessage) {
    const errMessageEl = document.getElementById("err-msg-year");
    errMessageEl.innerText = yearErrorMessage;
    return;
  }

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
