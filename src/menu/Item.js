import { Lightning } from "wpe-lightning-sdk";

export default class Item extends Lightning.Component{

  static _template() {
    return {
      text: { text: '', fontFace: 'neufreit', fontSize:50 }
    }
  }

  // will be automatically called
  set label(v) {
    this.text.text = v;
  }

  // will be automatically called
  set action(v) {
    this._action = v;
  }

  // will be automatically called
  get action() {
    return this._action;
  }
}
