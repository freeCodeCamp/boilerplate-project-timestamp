# API Project: Timestamp Microservice for FCC

### User stories :

1. The API endpoint is `GET [project_url]/api/timestamp/:date_string?`
2. A date string is valid if can be successfully parsed by `new Date(date_string)` (JS) . Note that the unix timestamp needs to be an **integer** (not a string) specifying **milliseconds**. In our test we will use date strings compliant with ISO-8601 (e.g. `"2016-11-20"`) because this will ensure an UTC timestamp.
3. If the date string is **empty** it should be equivalent to trigger `new Date()`, i.e. the service uses the current timestamp.
4. If the date string is **valid** the api returns a JSON having the structure
   `{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }`
   e.g. `{"unix": 1451001600000 ,"utc": "Fri, 25 Dec 2015 00:00:00 GMT"}`.
5. If the date string is **invalid** the api returns a JSON having the structure `{"unix": null, "utc" : "Invalid Date" }`. It is what you get from the date manipulation functions used above.

#### Example usage:

- <a href="https://curse-arrow.glitch.me/api/timestamp/2015-12-25" target="_new">https://curse-arrow.glitch.me/api/timestamp/2015-12-25</a>
- <a href="https://curse-arrow.glitch.me/api/timestamp/1451001600000" target="_new">https://curse-arrow.glitch.me/api/timestamp/1451001600000</a>

#### Example output:

- {"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
