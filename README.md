# Chotuve Web Admin
[![Build Status](https://travis-ci.org/ChutuveG3/ChotuveWebAdmin.svg?branch=master)](https://travis-ci.org/ChutuveG3/ChotuveWebAdmin)

## Env file
Para declarar variables de entorno, en la base del proyecto,
crear un archivo llamado `.env`. Como por ejemplo:  
```$xslt
# Server Base URL
AUTH_BASE_URL=https://chotuve-auth-server-develop.herokuapp.com/
MEDIA_BASE_URL=https://chotuve-media-server-develop.herokuapp.com/
APP_BASE_URL=https://chotuve-app-server-develop.herokuapp.com/

# Fake API
API_LOGIN_URL=https://reqres.in/api/login
```
**Nota**: Es importante seguir el formato. Notar `/` al final de cada URL.

