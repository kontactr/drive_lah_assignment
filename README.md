[![Netlify Status](https://api.netlify.com/api/v1/badges/fcb8e9ac-9b31-4fb0-a1ef-b9d63088564e/deploy-status)](https://app.netlify.com/sites/yg-drivelah-assignment/deploys)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
In this project users can login using their phone number set their names. The main focus of this project to persist data using filesystems. In this project users can select various files as their session database and ,then, they can use functionalities.

## Available Scripts

In the project directory, you can run:

### `yarn` or `yarn install`

This command installs all the required dependencies to run this project.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `Deployment`

This project is hosted on Netlify's environment with the build pipeline of the main branch. \
You can visit [here](https://yg-drivelah-assignment.netlify.app/)

### `How To`

- Users have to first select directory which works as a working directory for them.
- After that, they can create session file (Database) or view those files below it.
- Select any one of them or check `consider as a current session` for quick action.
- Users can also select their previous session for quick action (if available)
- Then, they will be navigated to login page
- Enter phone number & OTP for login
- if user is already present, they will see their names on the dashboard
- otherwise, they will be prompted a form where they have to fill up their name and save, then, they can see their names.
- Users can logout using sidebar
- Users can also change their session (Database) by clicking on database icon on the login page.

### `Third-Party packages`

- [antd](https://www.npmjs.com/package/antd) & [antd-icons](https://www.npmjs.com/package/@ant-design/icons) - For UI design & icons.
- [mobx](https://www.npmjs.com/package/mobx) & [mobx-react](https://www.npmjs.com/package/mobx-react) - For state management.
- [prop-types](https://www.npmjs.com/package/prop-types) - For props checking.
- [react-phone-input-2](https://www.npmjs.com/package/react-phone-input-2) - For phone input (number & country code).
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - For routes.
- [uniqid](https://www.npmjs.com/package/uniqid) - For the generation of unique ids.

### `Articles For References`

- [Filesystem](https://web.dev/file-system-access/) - For how to access filesystems
- [FileSystem Limited Access](https://caniuse.com/?search=showSaveFilePicker) - Filesystem access API has limited access.
