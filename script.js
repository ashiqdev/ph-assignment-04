// Grab All selectors

const firstClass = document.getElementById('first-class');
const economyClass = document.getElementById('economy-class');

const firstClassCount = firstClass.getElementsByClassName('quantity')[0];
const economyClassCount = economyClass.getElementsByClassName('quantity')[0];

const firstClassIncBtn = firstClass.getElementsByClassName(
  'increment-button'
)[0];

const economyClassIncBtn = economyClass.getElementsByClassName(
  'increment-button'
)[0];

const firstClassDecBtn = firstClass.getElementsByClassName(
  'decrement-button'
)[0];

const economyClassDecBtn = economyClass.getElementsByClassName(
  'decrement-button'
)[0];

const priceOfFirstClass = document.getElementById('priceOfFirst').innerText;

const priceOfEconomyClass = document.getElementById('priceOfEconomy').innerText;

const subTotal = document.getElementById('subtotal');
const vat = document.getElementById('vat');
const grandTotal = document.getElementById('grandTotal');

const bookingBtn = document.getElementById('booking');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalBtn = document.getElementById('close-modal');

const subAmount = document.getElementById('sub-amount');
const taxAmount = document.getElementById('tax-amount');
const totalAmount = document.getElementById('total-amount');

const alert1 = document.querySelector('.alert1');
const alert2 = document.querySelector('.alert2');

let firstClassCost = 0;
let economyClassCost = 0;
let subTotalAmount = 0;
let appliedVat = 0;
let total = 0;

/**
 * @name increment - Increment number of tickets
 * @param {String} number
 * @returns {Number} - returns the incremented number
 */
function increment(number) {
  const initialNumberOfTicket = parseInt(number.value);
  const totalNumberOfTicket = initialNumberOfTicket + 1;
  number.value = totalNumberOfTicket;

  if (number.value > 0) {
    alert1.classList.add('hidden');
    alert2.classList.add('hidden');
  }
  return totalNumberOfTicket;
}

/**
 * @name decrement - Decrement number of tickets
 * @param {String} number
 * @returns {Number} - returns the decremented number
 */
function decrement(number) {
  const initialNumberOfTicket = parseInt(number.value);
  if (initialNumberOfTicket === 0) {
    return;
  }
  const totalNumberOfTicket = initialNumberOfTicket - 1;
  number.value = totalNumberOfTicket;
  return totalNumberOfTicket;
}

/**
 * @name calculatePrice - calculate total charge of tickets
 * @param {Number} numberOfTicket
 * @param {String} flag - a flag to determine whether it is firstClass or economyClass
 * @returns {Number} - returns total charge of tickets
 */
function calculatePrice(numberOfTicket, flag) {
  if (flag === 'first') {
    return numberOfTicket * parseInt(priceOfFirstClass);
  } else {
    return numberOfTicket * parseInt(priceOfEconomyClass);
  }
}

/**
 * @name openModal - open the modal based on conditions
 */
function openModal() {
  const first = Number(firstClassCount.value);
  const economy = Number(economyClassCount.value);

  // if both values are zero booking is not allowed
  if (first === 0 && economy === 0) {
    alert1.classList.remove('hidden');
    alert2.classList.remove('hidden');

    return;
  }

  subAmount.textContent = '$ ' + subTotalAmount;
  taxAmount.textContent = '$ ' + appliedVat;
  totalAmount.textContent = '$ ' + total;

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

/**
 * @name closeModal - close the modal based on conditions
 */
function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

firstClassIncBtn.addEventListener('click', function () {
  const numberOfTicket = increment(firstClassCount);
  firstClassCost = calculatePrice(numberOfTicket, 'first');
});

firstClassDecBtn.addEventListener('click', function () {
  const numberOfTicket = decrement(firstClassCount);
  if (numberOfTicket === undefined) return;

  firstClassCost = calculatePrice(numberOfTicket, 'first');
});

economyClassIncBtn.addEventListener('click', function () {
  const numberOfTicket = increment(economyClassCount);
  economyClassCost = calculatePrice(numberOfTicket, 'economy');
});

economyClassDecBtn.addEventListener('click', function () {
  const numberOfTicket = decrement(economyClassCount);
  if (numberOfTicket === undefined) return;

  economyClassCost = calculatePrice(numberOfTicket, 'economy');
});

// calculate total, subtotal and vat amount
document.addEventListener('click', function (e) {
  if (e.target.matches('.increment-button') || '.decrement-button') {
    subTotalAmount = economyClassCost + firstClassCost;
    subTotal.textContent = subTotalAmount;

    appliedVat = subTotalAmount * 0.1;
    vat.textContent = appliedVat;

    total = subTotalAmount + appliedVat;
    grandTotal.textContent = total;
  }
});

// handle confirmation modal
bookingBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
