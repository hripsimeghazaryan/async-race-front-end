deployed UI: https://hripsimeghazaryan.github.io/async-race-front-end/

computed score: 355

## 🏁 Basic Structure (85 points)

### 1. View Configuration (30 points)

- [x] **Two Views (10 points):** Implement two primary views: "Garage" and "Winners".
- [x] **Garage View Content (5 points):** The "Garage" view must display its name, the current page number, and the total number of cars in the database (how many car user has in his garage).
- [x] **Winners View Content (5 points):** The "Winners" view should similarly display its name, the current page number, and the total count of records in the database (how many records the winners table contains).
- [x] **Persistent State (10 points):** Ensure the view state remains consistent when navigating between views. This includes preserving page numbers and input states. For example, page number shouldn't be reset, input controls should contain that they contained before switching, etc.

### 2. Garage View Functionality (55 points)

#### Car Management (45 points)

- [x] **CRUD Operations (20 points):** Enable users to create, update, and delete cars, and display the list of cars. A car has two attributes: "name" and "color". For "delete"-operation car should be deleted from "garage" table as well as from "winners".
- [x] **Color Selection (10 points):** Allow color selection from an RGB palette ([like here](https://colorspire.com/rgb-color-wheel/)), displaying the selected color on the car's image along with its name.
- [x] **Management Buttons (5 points):** Provide buttons near each car's image for updating its attributes or deleting it.
- [x] **Pagination (10 points):** Implement pagination for the "Garage" view, displaying 7 cars per page.

#### Car Generation (10 points)

- [x] **Random Car Creation (10 points):** There should be a button to create random cars (100 cars per click). Name should be assembled from two random parts, for example "Tesla" + "Model S", or "Ford" + "Mustang" (At least 10 different names for each part). Color should be also generated randomly.

## 🚗 Car Animation (50 points)

- [x] **Engine Control Buttons (10 points):** Place start/stop engine buttons near each car's image.
- [x] **Start Engine Animation (20 points):** User clicks to the engine start button -> UI is waiting for car's velocity answer -> animate the car and makes another request to drive. In case api returned 500 error car animation should be stopped.
- [x] **Stop Engine Animation (10 points):** User clicks to the engine stop button -> UI is waiting for answer for stopping engine -> car returned to it's initial place.
- [x] **Button States (5 points):** Start engine button should be disabled in case car is already in driving mode. As well as stop engine button should be disabled when car is on it's initial place.
- [x] **Responsive Animation (5 points):** Ensure car animations are fluid and responsive on screens as small as 500px.

## 🏎️ Race Animation (35 points)

- [x] **Start Race Button (15 points):** Implement a button to start the race for all cars on the current page.
- [x] **Reset Race Button (10 points):** Create a button to reset the race, returning all cars to their starting positions.
- [x] **Winner Announcement (10 points):** After some car finishes first user should see the message contains car's name that shows which one has won.

## 🏆 Winners View (45 points)

- [x] **Display Winners (15 points):** After some car wins it should be displayed at the "Winners view" table.
- [x] **Pagination for Winners (10 points):** Implement pagination for the "Winners" view, with 10 winners per page.
- [x] **Winners Table (10 points):** The table should include columns for the car's №, image, name, number of wins, and best time in seconds. If the same car wins more than once the number of wins should be incremented while best time should be saved only if it's better than the stored one.
- [x] **Sorting Functionality (10 points):** Allow users to sort the table by the number of wins and best time, in ascending or descending order.

## 🏗️ Application Architecture (40 points)

- [x] **Modular Design (40 points):** The application should be clearly divided into logical modules or layers, such as API interaction, UI rendering, and state management. Consultation with a mentor on the architecture before implementation is advised.

## 📜 Dynamic Content Generation (30 points)

- [x] **JavaScript-Generated HTML Content (30 points):** All HTML content must be dynamically generated using JavaScript, with the `<body>` tag containing only a single `<script>` tag.

## 🌐 Single Page Application (25 points)

- [x] **SPA Implementation (25 points):** The application must be a Single Page Application (SPA) using either React v18+ or Angular v17+. All content must be generated using TypeScript with `strict` and `noImplicitAny` settings enabled in `tsconfig.json`, ensuring seamless user experience without page reloads during navigation.

## 📦 Bundling and Tooling (20 points)

- [x] **Use of Webpack or Similar (20 points):** Implement Webpack or another bundling tool to compile the project into a minimal set of files, ideally one HTML file, one JS file, and one CSS file. Ensure that the configuration enforces TypeScript strict type checking.

## ✅ Code Quality and Standards (15 points)

- [x] **Eslint with Airbnb Style Guide (15 points):** Code must adhere to the Airbnb ESLint configuration to maintain code quality, as outlined in the [Airbnb style guide](https://www.npmjs.com/package/eslint-config-airbnb). Specific rules may be adjusted only with mentor approval, and there should be no ESLint errors or warnings.

## 📏 Code Organization and Efficiency (15 points)

- [ ] **Function Modularization (10 points):** Code should be organized into small, clearly named functions with specific purposes. Each function should not exceed 40 lines, reflecting strong typing and avoiding the use of magic numbers or strings.
- [ ] **Code Duplication and Magic Numbers (5 points):** Minimize code duplication and maintain readability by avoiding the use of magic numbers or strings throughout the codebase.

## 🎨 Prettier and ESLint Configuration (10 points)

- [x] **Prettier Setup (5 points):** Prettier is correctly set up with two scripts in `package.json`: `format` for auto-formatting and `ci:format` for checking issues.
- [x] **ESLint Configuration (5 points):** ESLint is configured with the [Airbnb style guide](https://www.npmjs.com/package/eslint-config-airbnb). A `lint` script in `package.json` runs ESLint checks. Configuration files should reflect strict TypeScript settings as per `tsconfig.json`.

## 🌟 Overall Code Quality (35 points)

- [ ] **(Up to 35 points)** Discretionary points awarded by the reviewer based on overall code quality, readability



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
