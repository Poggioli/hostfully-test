# Hostfully test


This project has the four basic operations for booking accommodation: creating a booking, listing, editing, and deleting. It includes validations at both the creation and editing moments, such as:

- Checking for no existing booking in the selected time interval.
- Verifying that the booking lasts at least 1 day.
- Ensuring that the check-out date is after the check-in date.
- Confirming that the booking is made for future dates.

The application consists of two pages: the "Rooms" page, where you can view the list of available accommodations, and the "Bookings" page, where you can see all your booking, edit, and cancel them.

## Development

This project was developed using:
- `node v18.13.0`
- `yarn`
- `shadcn`
- `vite`
- `tailwindcss`

## Tools

I use the [`shadcn`](https://ui.shadcn.com/) + [`tailwindcss`](https://tailwindcss.com/) to develop the interface and [`json-server`](https://www.npmjs.com/package/json-server) to mock an API response.

## Run

To run this project you should install all dependencies

```bash
yarn 
```

Run the website project
```bash
yarn run dev
```

Run the json-server
```bash
yarn run start:db
```

Now you could access the [`http://localhost:5173`](http://localhost:5173/rooms) and use the app.

## Tests

To see tests result, you should run the following command

```bash
yarn test
```
