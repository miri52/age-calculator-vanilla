import { intervalToDuration, parse } from "date-fns";

function isRequired(value) {
  if (!value) {
    return "This field is required";
  } else {
    return "";
  }
}

const dayInputEl = document.getElementById("day");
dayInputEl.addEventListener("input", checkValue);
dayInputEl.addEventListener("focusout", checkIsRequired);

function checkValue(e) {
  console.log(e.target.value);
  let inputValue = e.target.value;
}

function checkIsRequired(e) {
  console.log(e);
  console.dir(e);
  let inputValue = e.target.value;
  let dayErrorMessage = isRequired(inputValue);
  const errMessageEl = document.getElementById("err-msg-day");
  errMessageEl.innerText = dayErrorMessage;
}

function getBirthdayDate(e) {
  e.preventDefault();
  const errMsgs = document.querySelectorAll(".err-msg");
  Array.from(errMsgs).map((el) => (el.innerText = ""));

  const dayInputEl = document.getElementById("day");
  const monthInputEl = document.getElementById("month");
  const yearInputEl = document.getElementById("year");

  // const dayErrorMessage = isRequired(dayInputEl.value);
  const monthErrorMessage = isRequired(monthInputEl.value);
  const yearErrorMessage = isRequired(yearInputEl.value);

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
