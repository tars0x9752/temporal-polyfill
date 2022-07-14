// Don't use test/resolve.source.mjs as a loader here.
// This file uses nodejs native "self-referencing a package using its name" feature and meant to import dist files instead of tsc-out.
// https://nodejs.org/api/packages.html#self-referencing-a-package-using-its-name

import Demitasse from '@pipobscure/demitasse';
const { describe, it, report } = Demitasse;

import Pretty from '@pipobscure/demitasse-pretty';
const { reporter } = Pretty;

import { strict as assert } from 'assert';
const { equal } = assert;

import { Temporal } from '@js-temporal/polyfill'; // with JSBI
import { Temporal as TemporalBigInt } from '@js-temporal/polyfill/bigint'; // without JSBI

describe('BigInt build and JSBI build', () => {
  describe('Exports', () => {
    const named = Object.keys(Temporal);
    const namedBigInt = Object.keys(TemporalBigInt);
    it('should be 11 things', () => {
      equal(named.length, 11);
      equal(namedBigInt.length, 11);
    });
    it('should contain `Instant`', () => {
      assert(named.includes('Instant'));
      assert(namedBigInt.includes('Instant'));
    });
    it('should contain `TimeZone`', () => {
      assert(named.includes('TimeZone'));
      assert(namedBigInt.includes('TimeZone'));
    });
    it('should contain `PlainDate`', () => {
      assert(named.includes('PlainDate'));
      assert(namedBigInt.includes('PlainDate'));
    });
    it('should contain `PlainTime`', () => {
      assert(named.includes('PlainTime'));
      assert(namedBigInt.includes('PlainTime'));
    });
    it('should contain `PlainDateTime`', () => {
      assert(named.includes('PlainDateTime'));
      assert(namedBigInt.includes('PlainDateTime'));
    });
    it('should contain `ZonedDateTime`', () => {
      assert(named.includes('ZonedDateTime'));
      assert(namedBigInt.includes('ZonedDateTime'));
    });
    it('should contain `PlainYearMonth`', () => {
      assert(named.includes('PlainYearMonth'));
      assert(namedBigInt.includes('PlainYearMonth'));
    });
    it('should contain `PlainMonthDay`', () => {
      assert(named.includes('PlainMonthDay'));
      assert(namedBigInt.includes('PlainMonthDay'));
    });
    it('should contain `Duration`', () => {
      assert(named.includes('Duration'));
      assert(namedBigInt.includes('Duration'));
    });
    it('should contain `Calendar`', () => {
      assert(named.includes('Calendar'));
      assert(namedBigInt.includes('Calendar'));
    });
    it('should contain `Now`', () => {
      assert(named.includes('Now'));
      assert(namedBigInt.includes('Now'));
    });
  });

  describe('Construction', () => {
    it('Instant', () => {
      const { Instant } = Temporal;
      const { Instant: InstantBigInt } = TemporalBigInt;

      assert(Instant.from('1976-11-18T15:23:30.1Z') instanceof Instant);
      assert(InstantBigInt.from('1976-11-18T15:23:30.1Z') instanceof InstantBigInt);
    });

    it('TimeZone', () => {
      const { TimeZone } = Temporal;
      const { TimeZone: TimeZoneBigInt } = TemporalBigInt;

      assert(new TimeZone('Asia/Tokyo') instanceof TimeZone);
      assert(new TimeZoneBigInt('Asia/Tokyo') instanceof TimeZoneBigInt);
    });

    it('PlainDate', () => {
      const { PlainDate } = Temporal;
      const { PlainDate: PlainDateBigInt } = TemporalBigInt;

      assert(PlainDate.from('2019-11-18') instanceof PlainDate);
      assert(PlainDateBigInt.from('2019-11-18') instanceof PlainDateBigInt);
    });

    it('PlainTime', () => {
      const { PlainTime } = Temporal;
      const { PlainDate: PlainTimeBigInt } = TemporalBigInt;

      assert(PlainTime.from('1976-11-18T15:23:30') instanceof PlainTime);
      assert(PlainTimeBigInt.from('1976-11-18T15:23:30') instanceof PlainTimeBigInt);
    });

    it('PlainDateTime', () => {
      const { PlainDateTime } = Temporal;
      const { PlainDateTime: PlainDateTimeBigInt } = TemporalBigInt;

      assert(PlainDateTime.from('1976-11-18T15:23:30') instanceof PlainDateTime);
      assert(PlainDateTimeBigInt.from('1976-11-18T15:23:30') instanceof PlainDateTimeBigInt);
    });

    it('PlainMonthDay', () => {
      const { PlainMonthDay } = Temporal;
      const { PlainMonthDay: PlainMonthDayBigInt } = TemporalBigInt;

      assert(PlainMonthDay.from('1976-11-18T15:23:30') instanceof PlainMonthDay);
      assert(PlainMonthDayBigInt.from('1976-11-18T15:23:30') instanceof PlainMonthDayBigInt);
    });

    it('PlainYearMonth', () => {
      const { PlainYearMonth } = Temporal;
      const { PlainYearMonth: PlainYearMonthBigInt } = TemporalBigInt;

      assert(PlainYearMonth.from('1976-11-18T15:23:30') instanceof PlainYearMonth);
      assert(PlainYearMonthBigInt.from('1976-11-18T15:23:30') instanceof PlainYearMonthBigInt);
    });

    it('ZonedDateTime', () => {
      const { ZonedDateTime } = Temporal;
      const { ZonedDateTime: ZonedDateTimeBigInt } = TemporalBigInt;

      assert(new ZonedDateTime(1657807657736657736n, 'Asia/Tokyo') instanceof ZonedDateTime);
      assert(new ZonedDateTimeBigInt(1657807657736657736n, 'Asia/Tokyo') instanceof ZonedDateTimeBigInt);
    });

    it('Duration', () => {
      const { Duration } = Temporal;
      const { Duration: DurationBigInt } = TemporalBigInt;

      assert(new Duration(1, 1) instanceof Duration);
      assert(new DurationBigInt(1, 1) instanceof DurationBigInt);
    });

    it('Calendar', () => {
      const { Calendar } = Temporal;
      const { Calendar: CalendarBigInt } = TemporalBigInt;

      assert(new Calendar('japanese') instanceof Calendar);
      assert(new CalendarBigInt('japanese') instanceof CalendarBigInt);
    });
  });

  describe('Compat', () => {
    it('add', () => {
      const { PlainDate } = Temporal;
      const { Duration: DurationBigInt } = TemporalBigInt;

      const a = PlainDate.from('2022-01-01')
      const duration = DurationBigInt.from({ years: 1 })

      const res = a.add(duration)

      equal(res.toString(), '2023-01-01');
    });

    it('subtract', () => {
      const { PlainDate } = Temporal;
      const { Duration: DurationBigInt } = TemporalBigInt;

      const a = PlainDate.from('2022-01-01')
      const duration = DurationBigInt.from({ years: 1 })

      const res = a.subtract(duration)

      equal(res.toString(), '2021-01-01');
    });

    it('since', () => {
      const { PlainDate } = Temporal;
      const { PlainDate: PlainDateBigInt } = TemporalBigInt;

      const a = PlainDate.from('2022-01-01').withCalendar('iso8601')
      const b = PlainDateBigInt.from('2022-01-01').withCalendar('iso8601')

      const res = b.since(a)

      equal(res, 'PT0S');
    });

    it('until', () => {
      const { PlainDate } = Temporal;
      const { PlainDate: PlainDateBigInt } = TemporalBigInt;

      const a = PlainDate.from('2022-01-01').withCalendar('iso8601')
      const b = PlainDateBigInt.from('2022-01-01').withCalendar('iso8601')

      const res = b.until(a)

      equal(res, 'PT0S');
    });

    it('equals', () => {
      const { PlainDate } = Temporal;
      const { PlainDate: PlainDateBigInt } = TemporalBigInt;

      const a = PlainDate.from('2022-01-01').withCalendar('iso8601')
      const b = PlainDateBigInt.from('2022-01-01').withCalendar('iso8601')

      assert(b.equals(a));
    });
  })
});

report(reporter).then((failed) => process.exit(failed ? 1 : 0));
