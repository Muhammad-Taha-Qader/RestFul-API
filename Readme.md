# Node.js Profile API

This is a simple Node.js API that handles web requests using HTTP or Express.js. It includes routes for handling GET and POST requests, such as returning a greeting, accepting professional profile data in JSON format, validating the data, and storing it in a file.

## Features

- **GET** request to return a simple greeting (`Hello, Amjad`).
- **POST** request to accept and validate a professional profile in JSON format.
- **Validation**: Checks that required fields (`Name`, `Title`, `TargetedKeywords`, `Education`, `Certification`, `Contact`) are provided.
- **Save/Append** the profile data to a file (`profiles.json`).
- **GET** request to retrieve and return a list of profiles from the JSON file.

## Endpoints

### 1. GET /hello/amjad
Returns the string `Hello, Amjad`.

- **URL**: `/hello/amjad`
- **Method**: `GET`
- **Response**: 
  - 200 OK: `Hello, Amjad`
  - 404 Not Found: If the URL is incorrect.

### 2. POST /profile
Accepts a professional profile in JSON format, validates it, and saves it to a file.

- **URL**: `/profile`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**: A JSON object with the following required fields:
  ```json
    {
    "Name": "Amjad",
    "Title": "Software Engineer",
    "TargetedKeywords": ["Node.js", "Backend"],
    "Education": [
        {
        "name": "Information Technology University Lahore",
        "degree": "Bachelor of Science in Computer Science",
        "duration": "Sep. 2021 – Present",
        "url": "https://itu.edu.pk/"
        }
    ],
    "Certification": "AWS Certified",
    "Contact": "amjad@example.com"
    }
 
- **Response**: 
  - 200 OK: `{ "message": "Profile saved" }`
  - 400 Bad Request: `{ "error": "Missing fields: [field names]" }` if any required fields are missing.
  - 500 Internal Server Error: `{ "error": "Could not save profile" }` if the profile cannot be saved to the file.

### 3. GET /profiles
Returns a list of all profiles stored in the `profiles.json` file.

- **URL**: `/profiles`
- **Method**: `GET`
- **Response**: 
  - 200 OK: A JSON array of profiles.
  - 500 Internal Server Error: `{ "error": "Could not read profiles" }` if the profiles file cannot be read.

## Installation and Setup
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
```bash
npm init -y
npm install express
To run: node app.js
```


The server will start running on `http://localhost:3000`.

## Testing the Endpoints
Since web browsers typically only support sending GET requests via the address bar, to test POST requests (like the /profile route), you can use a tool like Postman or cURL.
### Using Postman

1. **GET** `/hello/amjad`: 
   - Set the method to `GET`.
   - Enter the URL `http://localhost:3000/hello/amjad`.
   - Send the request and you should receive a `Hello, Amjad` response.

2. **POST** `/profile`: 
   - Set the method to `POST`.
   - Enter the URL `http://localhost:3000/profile`.
   - In the Body tab, select `raw` and choose `JSON` format.
   - Send a JSON object like the example provided above and click "Send".
   - You should receive a response with the status and message.

3. **GET** `/profiles`: 
   - Set the method to `GET`.
   - Enter the URL `http://localhost:3000/profiles`.
   - Send the request to get the list of saved profiles.

### Using curl
1. **GET** `/hello/amjad`:
   ```bash
   curl http://localhost:3000/hello/amjad
   ```

2. **POST** `/profile`:
   ```bash
   curl -X POST http://localhost:3000/profile \
   -H "Content-Type: application/json" \
   -d '{
     "Name": "Amjad",
     "Title": "Software Engineer",
     "TargetedKeywords": ["Node.js", "Backend"],
     "Education": [...],
     "Certification": "AWS Certified",
     "Contact": "amjad@example.com"
   }'
   ```

3. **GET** `/profiles`:
   ```bash
   curl http://localhost:3000/profiles
   ```

## Error Handling
- **400 Bad Request**: Missing required fields in the POST request to `/profile`.
- **404 Not Found**: When trying to access invalid routes.
- **500 Internal Server Error**: When the server encounters an issue reading or writing files.
