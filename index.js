var months = require('calendar').months
  , events = require('event')
  , range = require('range')
  , templateInner = require('./template')
  , templateEl = document.createElement('TR')
;

templateEl.className = 'calendar-controls';
templateEl.innerHTML = templateInner;

function genMonthSelect() {
    return '<select>' + months.map(monthOption).join('') + '</select>';
}

function monthOption(month, i) {
    return '<option value="' + i + '">' + month + '</option>';
}

function genYearSelect(from, to) {
    var years = range(from, to, true);
    return '<select>' + years.map(yearOption).join('') + '</select>';
}

function yearOption(year) {
    return '<option value="' + year + '">' + year + '</option>';
}

exports.plugin = function (cal, options) {
    
    options = options || {};
    
    var template = templateEl.cloneNode(true);
    
    template.querySelector('.month-select').innerHTML = genMonthSelect();
    template.querySelector('.year-select').innerHTML = genYearSelect(options.fromYear || cal._date.getFullYear() - 10, options.toYear || cal._date.getFullYear() + 10);
    
    var monthSelect = template.querySelector('.month-select select')
      , yearSelect = template.querySelector('.year-select select')
    ;
    
    events.bind(template.querySelector('.prev-month'), 'click', function () {
        cal.prevMonth();
    });
    
    events.bind(template.querySelector('.next-month'), 'click', function () {
        cal.nextMonth();
    });
    
    events.bind(monthSelect, 'change', function (e) {
        cal.setMonth(e.target.value);
    });
    
    events.bind(yearSelect, 'change', function (e) {
        cal.setYear(e.target.value);
    });
    
    cal
      .on('change month', function (month) {
          monthSelect.value = month;
      })
      .on('change year', function (year) {
          yearSelect.value = year;
      })
    ;
    
    cal.initEmit();
    
    cal._head.insertBefore(template, cal._head.firstChild);
    
};