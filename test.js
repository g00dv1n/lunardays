const expect = require('chai').expect
const lunarDays = require('./index')
const moment = require('moment')
const _ = require('lodash')

describe('getDays', function () {
  const latitude = 50
  const longitude = 30
  describe('check date 05-08-1991 for Kiev', function () {

    let date = moment('05-08-1991', 'DD-MM-YYYY')

    it('should return 25 moon day', function () {
      let days = lunarDays(date, latitude, longitude)
      expect(_.head(days).number).to.equal(25)
    })
  })

  describe('check date 05-04-1987 for Kiev', function () {

    let date = moment('05-04-1987', 'DD-MM-YYYY')

    it('should return 7 moon day', function () {
      let days = lunarDays(date, latitude, longitude)
      expect(_.head(days).number).to.equal(7)
    })
  })

  describe('check date 11-12-2066 for Kiev', function () {
    let date = moment('12-12-2066', 'DD-MM-YYYY')

    it('should return 24 moon day', function () {
      let days = lunarDays(date, latitude, longitude)
      expect(_.head(days).number).to.equal(24)
    })
  })

  describe('check date 12-01-1906 for Kiev', function () {
    let date = moment('12-01-1906', 'DD-MM-YYYY')

    it('should return 18 moon day', function () {
      let days = lunarDays(date, latitude, longitude)
      expect(_.head(days).number).to.equal(18)

    })
  })

})
