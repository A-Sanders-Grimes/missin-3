# Reactor Core - Car Models Explorer (React 19)

Mission M3 · Reactor Core — Web Development I / Advanced JavaScript & React.

«Everything is a component.» — Rebuilt from Mission 2 using React 19 components, props, state, and effects.

---

## 🚀 How to Run It

1. **Install dependencies:** Run `npm install` in your terminal inside the project root folder.
2. **Start the development server:** Run `npm run dev` to start the local Vite development server.
3. **Open in browser:** Click the local server link (e.g., `http://localhost:5173`) printed in your terminal.
4. **Explore:** Type a car manufacturer name (e.g., `honda`, `toyota`, `ford`) into the search bar and hit search or press Enter to view models sorted and grouped alphabetically.

---

## 📂 Project Architecture & What Each Part Does

This application is broken down into clean, modular, single-responsibility components and hooks:

* **`src/main.jsx`**: The entry point of the React application. It mounts the root `App` component into the DOM inside `React.StrictMode` for highlighting potential problems.
* **`src/App.jsx`**: The main orchestrator component. It manages global state (`query`, `rawData`, `isLoading`, `error`) and handles the asynchronous API fetch logic. It also uses `useMemo` to cleanly derive sorted and grouped car data from raw API results instead of duplicating state.
* **`src/components/Header.jsx`**: A stateless presentational component that displays the application title and subtitle banner.
* **`src/components/SearchBar.jsx`**: Handles user input and form submission. It includes input validation and disables itself during loading states to prevent race conditions.
* **`src/components/CarCard.jsx`**: Receives the processed car data and renders the manufacturer summary header, wrapping the grouped model display.
* **`src/components/ModelGroup.jsx`**: Renders individual alphabetical sections (e.g., Letter H, Letter T) along with badge pills for each car model using stable, unique keys.
* **`src/hooks/useLocalStorage.js` (Bonus Feature)**: A custom React hook that synchronizes search history with the browser's `localStorage`, persisting recent user searches across page reloads.
* **`src/style.css`**: Contains custom dark-mode styling, responsive layouts, badges, and scrollable container rules adapted from Mission 2.

---

## 🤖 AI Declaration

I used **Gemini** as an AI pair programming assistant to help design and structure this project. 
* **Assistance provided:** Gemini helped structure the React 19 component hierarchy, implement derived state calculation via `useMemo` to satisfy the rubric requirements, write the custom `useLocalStorage` hook for the bonus objective, and configure the Vite environment setup.
* **Verification:** I reviewed, tested, and verified all components, asynchronous error handling, and styling behavior locally in the browser.
