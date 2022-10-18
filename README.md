# Timestamp Microservice api

## Overview
  This project is from [FreeCodeCamp's Backend development and apis course](https://www.freecodecamp.org/learn/back-end-development-and-apis/). It's one of the Microservice Api project needed to complete the backend course.
  
  **Live link** - [TimeStamp Microservice Api]([https://](https://timestamp-microservice-api.asuquoemmanuel.repl.co))
  
  This is the boilerplate code for the Timestamp Microservice project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/timestamp-microservice

## Author
  Emmanuel Dan Asuquo
  * LinkedIn - [@Emmanuel Asuquo](https://www.linkedin.com/in/emmanuel-asuquo-60381a1a6)
  * Twitter - [@_emmanueldan](https://twitter.com/_emmanueldan)
  * Github - [@dannyrae](https://github.com/dannyrae)

## How to use the *Timestamp Microservice Api* endpoints
### Method - GET
* https://timestamp-microservice-api.asuquoemmanuel.repl.co/api/:date?
   > **:date?** should be in this format (2022-10-18)
  > 
  > example - https://timestamp-microservice-api.asuquoemmanuel.repl.co/api/2022-10-18

* https://timestamp-microservice-api.asuquoemmanuel.repl.co/api/1451001600000
  > should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }

## Test Cases
- [x] You should provide your own project, not the example URL.
- [x] A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
- [x] A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT.
- [x] A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }.
- [x] Your project can handle dates that can be successfully parsed by new Date(date_string).
- [x] If the input date string is invalid, the api returns an object having the structure { error : "Invalid Date" }.
- [x] An empty date parameter should return the current time in a JSON object with a unix key.
- [x] An empty date parameter should return the current time in a JSON object with a utc key.

