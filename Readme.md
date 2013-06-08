
# calendar-controls

  Basic controls for JayceTDE/calendar

## Installation

    $ component install JayceTDE/calendar-controls

## Example

```js

var Calendar = require('calendar')
  , calendarControls = require('calendar-controls')
  , cal = new Calendar()
;

calendarControls.plugin(cal, { fromYear: 1960, toYear: 2040 });

```

## License

  MIT
