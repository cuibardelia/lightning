import { Lightning } from "wpe-lightning-sdk";

export default class Splash extends Lightning.Component {
  static _template() {
    return {
      Logo: {
        x: 960, y: 540, mount: 0.5,
        text: { text: 'LOADING...', fontFace: 'neufreit'}
      }
    }
  }

  // hook will be called when a component is attached for the first time. DEFINES ANIMATION
  _init() {
    // create animation and store reference -> we will start / stop/ pause in the future
    this._pulse = this.tag("Logo").animation({
      duration: 4, repeat: 0, actions: [
        { p:'alpha', v:{ 0:0, 1:0.5, 1:0 } }
      ]
    });

    // add a finish eventlistener -> signal the parent when animation is completed
    this._pulse.on("finish", () => {
      this.signal("loaded");
    })

    // start animation
    this._pulse.start();
  }

  // hook will be called when a component is activated, visible and on screen. STARTS ANIMATION
  _active() {
    this._pulse.start();
  }
}
