# Chotuve Web Admin
[![Build Status](https://travis-ci.org/ChutuveG3/ChotuveWebAdmin.svg?branch=master)](https://travis-ci.org/ChutuveG3/ChotuveWebAdmin)

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Env file
Para declarar variables de entorno, en la base del proyecto,
crear un archivo llamado `.env`. Como por ejemplo:
```
# Server Base URL
REACT_APP_AUTH_BASE_URL=https://chotuve-auth-server-develop.herokuapp.com
REACT_APP_MEDIA_BASE_URL=https://chotuve-media-server-develop.herokuapp.com
REACT_APP_APP_BASE_URL=https://chotuve-app-server-develop.herokuapp.com

# Fake API
REACT_APP_API_LOGIN_URL=https://reqres.in/api/login
```
**Nota**: Es importante seguir el formato.

### Material design
* [icons](https://material-ui.com/components/material-icons/)