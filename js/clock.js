window.addEventListener("DOMContentLoaded", function() {
  clock.init();
}, true);

const MONTHS_STR = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

let clock = {
  init: function() {
    this.hoursNode = document.querySelector(".clock-hours");
    this.minutesNode = document.querySelector(".clock-minutes");
    this.dayNode = document.querySelector(".clock-day");
    this.monthNode = document.querySelector(".clock-month");
    this.yearNode = document.querySelector(".clock-year");
    this.tick();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden === false) {
        this.tick();
      }
    });
  },
  tick: function() {
    let now = new Date();
    this.hoursNode.textContent = ("0" + now.getHours()).substr(-2);
    this.minutesNode.textContent = ("0" + now.getMinutes()).substr(-2);

    this.dayNode.textContent = now.getDate();
    this.monthNode.textContent = MONTHS_STR[now.getMonth()];
    this.yearNode.textContent = now.getFullYear();

    let seconds = now.getSeconds();
    setTimeout(this.tick.bind(this), 1000 * (60 - seconds));
  },
}
