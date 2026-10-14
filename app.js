const form = document.getElementById('reservationForm');
const dateInput = document.getElementById('dateInput');
const dialog = document.getElementById('confirmationDialog');
const message = document.getElementById('formMessage');
const nav = document.getElementById('mainNav');
const menuToggle = document.getElementById('menuToggle');

document.getElementById('year').textContent = new Date().getFullYear();
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = localToday;

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  message.textContent = '';
  if (!form.reportValidity()) return;

  const data = Object.fromEntries(new FormData(form).entries());
  if (data.date < localToday) {
    message.textContent = 'Please choose today or a future date.';
    dateInput.focus();
    return;
  }
  data.guests = Number(data.guests);
  data.updates = form.elements.updates.checked;
  data.createdAt = new Date().toISOString();
  data.demoStatus = 'Local demo request — not sent to restaurant';

  let reservations = [];
  try {
    reservations = JSON.parse(localStorage.getItem('emberReservationRequests') || '[]');
    if (!Array.isArray(reservations)) reservations = [];
  } catch (_) {
    reservations = [];
  }
  reservations.unshift(data);
  localStorage.setItem('emberReservationRequests', JSON.stringify(reservations));

  const dateLabel = new Date(`${data.date}T12:00:00`).toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  document.getElementById('confirmationText').textContent =
    `Thanks, ${data.name}. Your request for ${data.guests} guest${data.guests === 1 ? '' : 's'} on ${dateLabel} at ${data.time} has been saved in this browser.`;
  form.reset();
  dateInput.min = localToday;
  dialog.showModal();
});

function closeDialog() {
  if (dialog.open) dialog.close();
}
document.getElementById('closeDialog').addEventListener('click', closeDialog);
document.getElementById('doneButton').addEventListener('click', closeDialog);
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) closeDialog();
});
