# lunardays
JavaScript library for calculating moon days for specific date using latitude and longitude.
Created for [Moon Organizer](https://moonorganizer.com/).

## Usage example :
```js
 
 const lunarDays = require('lunardays')
 const moment = require('moment')
 // create some date
 const date = moment('05-04-1987', 'DD-MM-YYYY')
 // Kiev 
 const latitude = 50
 const longitude = 30
 // get all lunar days for date 
 const days = lunarDays(date, latitude, longitude)
 console.log(days)
 /*
[ { number: 7,
    start: moment("1987-04-04T08:55:08.993"),
    end: moment("1987-04-05T09:42:56.133") },
  { number: 8,
    start: moment("1987-04-05T09:42:56.133"),
    end: moment("1987-04-06T10:40:57.989") } ]
 */
```
