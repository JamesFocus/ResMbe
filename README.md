# Ember Steakhouse — Reservation Web App

A responsive restaurant landing page and reservation-request prototype built with HTML, CSS, and vanilla JavaScript.

## Features
- Editorial steakhouse design with responsive mobile navigation
- Experience section and sample menu cards
- Reservation form with required-field validation, date validation, party size, time, occasion, and notes
- Confirmation dialog after a request is saved
- Demo requests saved in the browser's `localStorage` under `emberReservationRequests`
- Tiny Node.js static server; no npm packages required

## Run locally
1. Install Node.js if it is not already installed.
2. Extract the ZIP.
3. Open a terminal in this folder.
4. Run `npm start`.
5. Open `http://localhost:3000` in your browser.

You can also open `index.html` directly, but the local server is the recommended preview.

## Important before launch
This is a front-end prototype, not a live booking service. Reservation requests are saved only in the visitor's browser and are not sent to restaurant staff. To accept real reservations, add a backend API and database, server-side validation, availability/overbooking rules, notification delivery, and an admin dashboard. Replace the sample address, phone, email, menu, prices, and map placeholder with the restaurant's real information. External photos and Google Fonts need an internet connection.
