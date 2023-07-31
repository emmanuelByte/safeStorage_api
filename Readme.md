Database Modeling

## Schema

### 1. User schema

```javascript
USER {
name,
email,
password, // hashed password
phoneNumber,
}
```

## Routes

- Register
- Login
- Send verify email ( send a code to user)
- verify email (User will input the code)
- Send forgot password ( send a code to the user)
- verify forgot password
- get user profile
- update user profile
- upload profile image
- delete profile

Routes>(Middleware)>Controller>Model --> Authentication API
Routes>Controller>Model --> Public API

### 1. Register.

user input registration details (name,email,password and phoneNumber), we validate details before sending to database

Folder {
name, files:File[],
user
}

File {
url,
public_id,
type
user
}
