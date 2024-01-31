# Assignment PR:

## Introduction

This is the backend project as instructed in assignment. It is an API for TO DO application.

## Tech Stack

Node.js
Express.js
MongoDB

## How To Use

First Download the code from the reposotery https://github.com/pratik7262/chainTech
Go To chainTech folder in you system and run command `bash npm install` it will install all required packages.
Then Run command `bash node index.js` You should see `bash App is running at Port 80`
Make Sure You have installed Node.js and MongoDB in your system

## Endpoints

### Auth Endpoints

#### Register (http://localhost/api/auth/register) (Method POST)

Register a new user by providing name, email, and password in the request body. No headers are required. You should receive a response message, "Registration Done Successfully."

Example body

```bash
    {
     "name":"User 1",
     "email":"user1@gmail.com",
     "password":"1234567890"
    }
```

#### Login (http://localhost/api/auth/login) (Method POST)

Login with user credentials by providing an email and password in the request body. No headers are required. The response includes a message and an auth-token (JWT token).

Example body

```bash
    {
     "email":"user1@gmail.com",
     "password":"1234567890"
    }
```

Examplre Responce

```bash
    {
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Yjg4MjA2MDMzYmU5MGQwYjg3ODYzOCIsImlhdCI6MTcwNjY3MTgzMX0.-5O3BaANJ-kGbAOzNHJbL_ZQE3eCalZYyq156rJx37U"
  }
```

Save Token Somwhere

#### Get User (http://localhost/api/auth/getuser) (Method GET)

Retrieve information about a specific user. Authenticate by sending the auth-token (JWT token) in the header; no body is required.

Exmaple header

```bash
{
 "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Yjg4MjA2MDMzYmU5MGQwYjg3ODYzOCIsImlhdCI6MTcwNjY3MTgzMX0.-5O3BaANJ-kGbAOzNHJbL_ZQE3eCalZYyq156rJx37U"
}
```

Example Responce

```bash
{
  "success": true,
  "user": {
    "_id": "65b88206033be90d0b878638",
    "name": "Pratik Shinde",
    "email": "pratikshinde760872@gmail.com",
    "createdAt": "2024-01-30T04:58:46.094Z",
    "updatedAt": "2024-01-30T04:58:46.094Z",
    "__v": 0 }
}
```

Make Sure You Send Headers Properly

### Task Endpoints

#### Create Task (http://localhost/api/task/create) (method POST)

Create a new task by sending the auth-token (JWT token) in the header and title/description in the body. The title should not be empty, and the due date is initially set to null.

Example Header

```bash
{
 "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Yjg4MjA2MDMzYmU5MGQwYjg3ODYzOCIsImlhdCI6MTcwNjY3MTgzMX0.-5O3BaANJ-kGbAOzNHJbL_ZQE3eCalZYyq156rJx37U"
}
```

Example Body

```bash
{
  "title":"firsttask",
  "description":"pratik shinde's task"
}
```

Example Responce

```bash
{
  "success": true,
  "message": "Task added successfully",
  "newTask": {
    "user": "65b88206033be90d0b878638",
    "title": "firsttask",
    "description": "pratik shinde's task",
    "createdDate": "2024-01-31T03:30:11.095Z",
    "dueDate": null,
    "isCompleted": false,
    "_id": "65b9c312531e782daefac3c3",
    "__v": 0 }
}
```

#### Get Tasks (http://localhost/api/task/get) (Method GET)

Retrieve all tasks belonging to the user by sending the auth-token (JWT token) in the header. No body is required.

Example Header

```bash
{
 "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Yjg4MjA2MDMzYmU5MGQwYjg3ODYzOCIsImlhdCI6MTcwNjY3MTgzMX0.-5O3BaANJ-kGbAOzNHJbL_ZQE3eCalZYyq156rJx37U"
}
```

Example Responce

```bash
{
  "success": true,
  "tasks": [
    {
      "_id": "65ba40f0ecb5869009e5b57f",
      "user": {
        "_id": "65b9be9c7edccb0edc2c59dd",
        "name": "User1"
      },
      "title": "first task",
      "description": "my first task",
      "createdDate": "2024-01-31T12:43:32.414Z",
      "dueDate": null,
      "isCompleted": false,
      "__v": 0
    }
  ]
}
```

#### Update Task (http://localhost/api/task/update/{task-id}/ ) (method PATCH)

Update the title or description of a task by providing the task id in the URL and auth-token (JWT token) in the header. Include the updating fields and values in the body.

Example Headers

```bash
{
 "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Yjg4MjA2MDMzYmU5MGQwYjg3ODYzOCIsImlhdCI6MTcwNjY3MTgzMX0.-5O3BaANJ-kGbAOzNHJbL_ZQE3eCalZYyq156rJx37U"
}
```

Example Body

```bash
{
  "title":"New Title",
  "description":"New Description"
}
```

Example Responce

```bash
{
  "success": true,
  "message": "Task Updated Successfully",
  "updatedTask": {
    "_id": "65ba40f0ecb5869009e5b57f",
    "user": {
      "_id": "65b9be9c7edccb0edc2c59dd",
      "name": "User1" },
    "title": "New Title",
    "description": "New Description",
    "createdDate": "2024-01-31T12:43:32.414Z",
    "dueDate": null,
    "isCompleted": false,
    "__v": 0 }
}
```

I am providing both title and description in body so it updating both if you want to update any one of them you can update

#### Change Due Date (http://localhost/api/task/changeduedate/{task-id}) (method PATCH)

Change or set the due date of a task by providing the task id in the URL, and auth-token (JWT token) in the header. Include the date in MM/DD/YYYY format in the body.

Example Headers

```bash
{
 "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Yjg4MjA2MDMzYmU5MGQwYjg3ODYzOCIsImlhdCI6MTcwNjY3MTgzMX0.-5O3BaANJ-kGbAOzNHJbL_ZQE3eCalZYyq156rJx37U"
}
```

Example Body

```bash
{
  "date":"01/31/2024"
}
```

Example Responce

```bash
{
  "message": "Due Date Changed Successfully",
  "dueDate": "2024-01-30T18:30:00.000Z"
}
```

#### Mark As Completed (http://localhost/api/task/markcompleted/{task-id}) (Method PATCH)

If you completed your task and want to mark as completed you can do it with this route
You need to send auth-token in header and task id in url at the end

Example Headers

```bash
{
 "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Yjg4MjA2MDMzYmU5MGQwYjg3ODYzOCIsImlhdCI6MTcwNjY3MTgzMX0.-5O3BaANJ-kGbAOzNHJbL_ZQE3eCalZYyq156rJx37U"
}
```

Example Responce

```bash
{
  "success": true,
  "message": "Task Marked As Completed"
}
```

#### Delete Task (http://localhost/api/task/delete/{task-id}) (Method DELETE)

Delete a task by providing the task id in the URL and auth-token (JWT token) in the header.

Example Headers

```bash
{
 "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Yjg4MjA2MDMzYmU5MGQwYjg3ODYzOCIsImlhdCI6MTcwNjY3MTgzMX0.-5O3BaANJ-kGbAOzNHJbL_ZQE3eCalZYyq156rJx37U"
}
```

Example Responce

```bash
{
  "message": "Task Deleted Successfully"
}
```

#### Make sure you send auth-token field in header wherever mentioned and node.js and mongoDB installed on your system

## Explore More Projects at https://pratikshinde.in
