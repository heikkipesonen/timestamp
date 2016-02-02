export const MONTH_NAMES = [
  'tammikuu',
  'helmikuu',
  'maaliskuu',
  'huhtikuu',
  'toukokuu',
  'kesäkuu',
  'heinäkuu',
  'elokuu',
  'syyskuu',
  'lokakuu',
  'marraskuu',
  'joulukuu'
];

export const DAY_NAMES = [
  'ma',
  'ti',
  'ke',
  'to',
  'pe',
  'la',
  'su'
];

export class Time {
  static getMonthDays(model) {
    let trackModel = new Date(model.getTime());
    trackModel.setDate(1);

    let days = [];
    while (trackModel.getMonth() === model.getMonth()) {
      days.push(trackModel.getDate());
      trackModel.setDate(trackModel.getDate()+1);
    }

    return days;
  }

  static getCalendar(model) {
    let currentMonth = model.getMonth();
    let trackDate = new Date();

    trackDate.setTime(model.getTime());
    trackDate.setDate(1);

    let calendar = [];
    let weekOrder = [1,2,3,4,5,6,0];
    let week = Array(7).fill(false);

    while (trackDate.getMonth() === currentMonth) {
        let currentDay = trackDate.getDay();
        let currentWeekDay = weekOrder.indexOf(currentDay);

        week[currentWeekDay] = trackDate.getDate();

        if (currentWeekDay === 6) {
          calendar.push(week);
          week = Array(7).fill(false);
        }

        trackDate.setDate(trackDate.getDate() + 1);
    }

    if (calendar.indexOf(week) === -1){
      calendar.push(week);
    }

    return calendar;
  }
}
