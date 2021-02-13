# dhms.js

A small node library to format durations

#### Installation

```bash
npm install git://github.com/floorbot-js/dhms.js
```

#### Examples

```js
const DHMS = require('dhms.js');
console.log(DHMS.print(1234567890));                                   // 14d 6h 56m 7s 890ms
console.log(DHMS.print(1234567890, { trim: 2 }));                      // 14d 6h 56m
console.log(DHMS.print(1234567890, { limit: 2 }));                     // 14d 6h
console.log(DHMS.print(1234567890, { hideZero: false }));              // 0y 0M 14d 6h 56m 7s 890ms
console.log(DHMS.print(1234567890, { fullname: true, limit: 3 }));     // 14days 6hours and 56minutes
```
