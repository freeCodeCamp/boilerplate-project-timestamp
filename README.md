# API Project: Timestamp Microservice for FCC

### User stories:

1. The API endpoint is `GET [project_url]/api/timestamp/:date_string?`
2. A date string is valid when it can be successfully instantiated by `new Date(date_string)` (JS). Note the unix timestamp needs to be an **integer** (not a string), specifying **milliseconds**. In our test, we will use date strings compliant with ISO-8601 (e.g. `"2016-11-20"`) because this will ensure a UTC timestamp.
3. If the date string is **empty** it should be equivalent to a `new Date()` object.
4. If the date string is **valid** the api returns a JSON object with the structure

```js
{ "unix": <date.getTime()>, "utc" : <date.toUTCString()> }
```

Example:

```js
{ "unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT" }
```

5. If the date string is **invalid** the api returns a JSON object with the structure

```js
{ "unix": null, "utc" : "Invalid Date" }
```

The api response is the evaluation of the Date methods used above.

#### Example usage:

- https://curse-arrow.glitch.me/api/timestamp/2015-12-15
- https://curse-arrow.glitch.me/api/timestamp/1450137600000

#### Example output:

```js
{ "unix": 1450137600, "natural": "December 15, 2015" }
```
