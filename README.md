# Booking Accommodation System

This project implements the basic operations for booking accommodations, including creating, listing, editing, and deleting bookings. It incorporates validations during both creation and editing, such as checking for existing bookings in the selected time interval and ensuring the booking lasts at least 1 day.

## Features

- View a list of available accommodations on the "Rooms" page.
- Manage your bookings on the "Bookings" page, including editing and canceling.

## Development

This project was developed using the following technologies:

- Node.js v18.13.0
- Yarn
- Shadcn for UI development
- Vite for project scaffolding
- Tailwind CSS for styling

## Tools

I utilized the following tools:

- [Shadcn](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/) for the UI.
- [json-server](https://www.npmjs.com/package/json-server) to mock API responses.

## Getting Started

### Requirements

Make sure you have the following installed:

- Node.js v18.13.0
- Yarn

### Installation

Install project dependencies:

```bash
yarn
```

Run the json-server:

```bash
yarn run start:db
```

Run the website project:

```bash
yarn run dev
```

Access the app at [http://localhost:5173](http://localhost:5173)


## Usage

- Explore available accommodations on the "Rooms" page.
- Manage your bookings on the "Bookings" page.
- Edit or cancel existing bookings.

## Tests

To run tests, use the following command:

```bash
yarn test:silent
```