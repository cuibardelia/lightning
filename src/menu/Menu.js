import Item from "./Item.js";
import { Lightning } from "wpe-lightning-sdk";

export default class Menu extends Lightning.Component {
  static _template() {
    return {
      // define empty holder for our items - position relative to component
      Items: {
        x: 40
      },
      // text component that indicates which item has focus
      FocusIndicator: {
        y: 5,
        text: {text:'>', fontFace:'neufreit'}
      }
    }
  }

  _init() {
    // create a blinking animation
    this._blink = this.tag("FocusIndicator").animation({
      duration:0.5, repeat:-1, actions:[
        { p:'x', v:{0:0, 0.5:-40,1:0} }
      ]
    });

    // current focused menu index
    this._index = 0;
  }

  _active() {
    this._blink.start();
  }

  _inactive() {
    this._blink.stop();
  }

  set items(v) {
    this.tag("Items").children = v.map((el, idx)=>{
      return {type: Item, action: el.action, label: el.label, y: idx*90}
    })
  }

  get items() {
    return this.tag("Items").children;
  }

  get activeItem() {
    return this.items[this._index];
  }

  _setIndex(idx) {
    // since it's a one time transition we use smooth
    this.tag("FocusIndicator").setSmooth("y", idx*90 + 5);

    // store new index
    this._index = idx;
  }

  _handleUp(){
    this._setIndex(Math.max(0, --this._index));
  }

  _handleDown(){
    this._setIndex(Math.min(++this._index, this.items.length - 1));
  }

}
