// importing country codes from the country codes file
import { countryList } from './countryCodes.js';

// accessing the divs through their id's
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('form');
  const amountInput = document.querySelector('input[type="number"]');
  const fromSelect = document.querySelector('select[name="from"]');
  const toSelect = document.querySelector('select[name="to"]');
  const msg = document.querySelector('.msg');

  // to fill the dropdown list with currencies
  function fillCurrencyDropdown(selectElement) {
      for (const currencyCode in countryList) {
          selectElement.innerHTML += `<option value="${currencyCode}">${currencyCode}</option>`;
      }
  }

  // fill from and to list also
  fillCurrencyDropdown(fromSelect);
  fillCurrencyDropdown(toSelect);

  // update flags according to their currencies
  function updateFlagImages() {
      const fromFlagImg = document.querySelector('.from img');
      const toFlagImg = document.querySelector('.to img');
      
      fromFlagImg.src = `https://flagsapi.com/${countryList[fromSelect.value]}/flat/64.png`;
      toFlagImg.src = `https://flagsapi.com/${countryList[toSelect.value]}/flat/64.png`;
  }

  // adding the event listener for change event on currency select dropdowns
  [fromSelect, toSelect].forEach(select => select.addEventListener('change', updateFlagImages));

  // updating flag images initially
  updateFlagImages();

  // adding the event listener for form submission
  form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const amount = amountInput.value;
      const fromCurrency = fromSelect.value;
      const toCurrency = toSelect.value;

      const apiURL = `https://v6.exchangerate-api.com/v6/0de83bb6414a8f2f9ee68a96/latest/${fromCurrency}`;
      
      try {
          const response = await fetch(apiURL);
          const data = await response.json();

          if (data.result === 'success') {
              const exchangeRate = data.conversion_rates[toCurrency];
              if (exchangeRate) {
                  const convertedAmount = (amount * exchangeRate).toFixed(2);
                  msg.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
              } else {
                  msg.textContent = 'Failed to fetch exchange rate for the selected currency. Please try again later.';
              }
          } else {
              msg.textContent = 'Failed to fetch exchange rate data. Please try again later.';
          }
      } catch (error) {
          console.error('Error fetching exchange rate:', error);
          msg.textContent = 'Failed to fetch exchange rate data. Please try again later.';
      }
  });
});
