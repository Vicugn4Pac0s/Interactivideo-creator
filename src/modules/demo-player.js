import { fps_to_ms } from "../utilities/utilities";
export default class {
  constructor() {
    this.selector = document.getElementById('demo-video');
    this.aData;
    this.timer;

    this.frame = 0;
    this.interval = fps_to_ms(15);
    this.timer_lasttime;
  }
  play(data) {
    this.stop();
    this.aData = data;
    this.timer = requestAnimationFrame(this.playTimer.bind(this));
  }
  stop() {
    this.clearPlayTimer();
    this.frame = 0;
  }
  playTimer(t) {
    this.timer = requestAnimationFrame(this.playTimer.bind(this));

    let time = this.interval;
    if (this.timer_lasttime) time = t - this.timer_lasttime;
    if (this.interval > time) return false;

    this.selector.setAttribute("src", this.aData[this.frame].d);
    this.frameIncrement();
    this.timer_lasttime = t;
  }
  clearPlayTimer() {
    if (!this.timer) return false;

    cancelAnimationFrame(this.timer);
    this.timer_lasttime = null;
  }
  frameIncrement() {
    this.frame++;
    if (this.frame >= this.aData.length) {
      this.frame = 0;
    }
  }
}
