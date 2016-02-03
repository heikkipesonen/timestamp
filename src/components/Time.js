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


  /**
   * convert minutes to milliseconds
   * @param  {[type]} minutes [description]
   * @return {[type]}         [description]
   */
  static minutesToMs(minutes) {
    return minutes*60*1000;
  }

  /**
   * return minutes formatted to hours:minutes
   * @param  {[type]} model [description]
   * @return {[type]}       [description]
   */
  static formatMinutes(model) {
    let hours = ('0'+ Math.floor(model / 60)).slice(-2);
    let minutes = ('0' + (model % 60)).slice(-2);
    return `${hours}:${minutes}`;
  }

  /**
   * format date as dd.mm.yyyy
   * @param  {[type]} model [description]
   * @return {[type]}       [description]
   */
  static formatDate(model) {
    let day = ('0' + model.getDate()).slice(-2);
    let month = ('0' + (model.getMonth() +1)).slice(-2);
    let year = model.getFullYear();
    return `${day}.${month}.${year}`;
  }

  /**
   * get array of dates in
   * @param  {[type]} model [description]
   * @return {[type]}       [description]
   */
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
