import { intervalToDuration, parse } from "date-fns";

function getBirthdayDate(e) {
  e.preventDefault();
  const dayInputEl = document.getElementById("day");
  const monthInputEl = document.getElementById("month");
  const yearInputEl = document.getElementById("year");

  const birthdayValue = `${dayInputEl.value}/${monthInputEl.value}/${yearInputEl.value}`;
  //dd/mm/yyyy
  calculateAge(birthdayValue);
}

function calculateAge(dob) {
  const birthdayDate = parse(dob, "dd/MM/yyyy", new Date());
  const dateToday = new Date();

  const interval = intervalToDuration({ start: birthdayDate, end: dateToday });

  const ageYears = interval.years || 0;
  const ageMonths = interval.months || 0;
  const ageDays = interval.days || 0;

  const ageYearsEl = document.getElementById("age-years");
  const ageMonthsEl = document.getElementById("age-months");
  const ageDaysEl = document.getElementById("age-days");

  ageYearsEl.innerHTML = ageYears;
  ageMonthsEl.innerHTML = ageMonths;
  ageDaysEl.innerHTML = ageDays;
}

const birthdayForm = document.getElementById("birthday-form");
birthdayForm.addEventListener("submit", getBirthdayDate);

if (module.hot) {
  module.hot.accept();
}
