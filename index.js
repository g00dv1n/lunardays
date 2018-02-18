const suncalc = require('suncalc')
const lune = require('lune')
const moment = require('moment')
const _ = require('lodash')

const isDayBetween = (start, end, day) => {
  return moment(day).startOf('day').isBetween(moment(start), moment(end)) ||
    moment(day).endOf('day').isBetween(moment(start), moment(end))
}

const daysRange = (startDate, numberOfDays) => {
  return _.map(_.range(0, numberOfDays + 1), i => moment(moment(startDate).startOf('day').add(i, 'days')))
}

const recentNewMoon = (date) => {
  let endOfDate = moment(date).endOf('day').toDate()
  let startOfDate = moment(date).startOf('day').toDate()

  let recentPhases = lune.phase_hunt(endOfDate)

  if (recentPhases.new_date > endOfDate) {
    recentPhases = lune.phase_hunt(startOfDate)
  }

  let newMoon = moment(recentPhases.new_date)
  return newMoon
}

const daysBetween = (start, end) => {
  return moment(end).endOf('day').diff(moment(start).startOf('day'), 'days')
}

const moonRises = (days, latitude, longitude) => {
  return _.chain(days)
    .map(day => suncalc.getMoonTimes(moment(day).toDate(), latitude, longitude).rise)
    .filter(rise => rise)
    .map(rise => moment(rise))
    .value()
}

const lunarDays = (date, latitude, longitude) => {
  let newMoon = recentNewMoon(date)
  let diffDays = daysBetween(newMoon, date)
  let initDate = moment(newMoon).startOf('day')

  // WE NEED CALCULATE CURRENT DAY + 2 for all moon days
  let days = daysRange(initDate, diffDays + 4)

  // check if first rist before new moon delete IT
  let rises = moonRises(days, latitude, longitude)
  if (moment(_.head(rises)).isSameOrBefore(newMoon)) {
    //rises.shift()
    rises = _.drop(rises)
  }
  let moonDays = [{
    number: 1,
    start: newMoon,
    end: _.head(rises)
  }]

  for (let i = 0; i < rises.length - 1; i++) {
    moonDays.push({
      // +2 because we started from 2 day
      number: i + 2,
      start: rises[i],
      end: rises[i + 1]
    })
  }
  let res = _.filter(moonDays, ({start, end}) => isDayBetween(start, end, date))
  return res
}

const latitude = 50
const longitude = 30

let date = moment('15-04-2018', 'DD-MM-YYYY')

let res = lunarDays(date, latitude, longitude)

console.log(res)

module.exports = lunarDays




