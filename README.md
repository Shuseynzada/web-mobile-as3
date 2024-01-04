# Flash Cards Web & Mobile App

Author: Shamkhal Huseynzade

## Introduction

This project is a web and mobile application developed using React with Vite and TypeScript. The primary goal of this project is to create a flash card application that displays questions and answers on each side of the cards. Users can perform operations like adding, updating, and deleting cards, and the application is integrated with a fake REST API using json-server. Additionally, the website includes a Home page for displaying the creator's projects and a Contact page for saving messages in the json-server. HTTP requests are made using the axios library.

## Components

### App.js

This file contains router logic using `react-router-dom` for navigating between different pages of the application.

### Home.tsx

The Home page fetches projects from the json-server to display them.

#### Project.tsx

This component is responsible for displaying projects in a user-friendly way.

### Layout.tsx

The Layout component uses `react-router`'s Outlet component to nest any route element between Navbar and Footer components.

#### Navbar

The Navbar component is shown at the top of every page and contains navigation links to other routes.

### Container.tsx

This component acts as a container for structuring flash card components. It includes a search filter, sorting options, and action buttons for adding cards and sharing selected cards. The data for all fetched cards is handled here using the `useFetch` hook. It also handles infinite scrolling.

#### Cards.tsx

This component displays the data for each card, including the card's ID, actions like editing, toggling the card, deleting, and selecting the card. The middle of the card displays the question, and when toggled, it shows the answer, the card's status, and dates.

#### AddCardModal

This modal component opens when the "Add Card" button is clicked. It includes fields for card properties and is used to add new cards to the application.

### ContactPage.tsx

The ContactPage component is used for the contact page. When the form is submitted, it sends a POST request to the json-server to store the messages.

## Custom Hooks

### useFetch

The `useFetch` hook is used for fetching data with pagination. It takes three inputs: `url` (the API endpoint URL), `initialPage` (the starting page for fetching, default is 1), and `limit` (the number of items to fetch at a time). It returns data, the current page number, loading state, error state, and a `hasMore` state to control whether to continue fetching more data.

### useInView

The `useInView` hook is used for checking whether the last card is on the screen. It is primarily used for implementing infinite scrolling. It takes one input, `threshold` (a number between 0 and 1, indicating the portion of the item that must be shown), and returns a callback ref element and a boolean state indicating whether the element is in view.

## Json-server Endpoint

- `GET /flashcards`: Retrieve all flashcards.
- `GET /flashcards/{id}`: Get the content of a specific flashcard by ID.
- `POST /flashcards`: Add new flashcards to the database.
- `POST /messages`: Add new contact messages.
- `GET /projects`: Get all projects.

## Getting Started

To run the project, follow these steps:

1. Start the json-server by running the following command:
   ```
   json-server db.json
   ```

2. Start the web application:
   ```
   npm run dev
   ```

This will launch the application, and you can access it in your web browser.

Feel free to explore and enjoy using the flash card application!

## License

No Lisence
