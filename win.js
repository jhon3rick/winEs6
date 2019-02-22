/**
 * @flow
 * $winEs6
 * @jhon3rick
 */

type Key = string // key element dom in getter method
type Val = ?string // new value in setter method
type TypeEvent = string // event listener
type Callback = (element: Object)=>void
type ArrayDom = NodeList<Object> | Array<Object>

function $w (key: Key) {
  return new $winEs6(key);
}

class $winEs6 {
  arrayDom: ArrayDom=[];

  constructor (key: Key) {
    this.arrayDom = document.querySelectorAll(key) || [];
  }

  each = (callback: Callback) => {
    this.arrayDom.forEach((element: Object) => callback(element));
    return callback;
  }

  first = (): Object => this.arrayDom[0] || {};

  html = (val: Val) => {
    if (!val && val !== '') return this.first().innerHTML;
    this.each((element): Object => element.innerHTML = val);
    return this;
  }

  addHtml = (val: Val) => {
    this.each((element)=>element.insertAdjacentHTML('beforeend', val));
    return this;
  }

  attr = (key: Key, val: Val) => {
    if (!val && val !== '') return this.first().getAttribute(key);
    this.each((element)=>element.setAttribute(key, val));
    return this;
  }

  css = (key: Key, val: Val) => {
    if (!val) return this.first().style[key];
    this.each((element): Object => element.style[key] = val);
    return this;
  }

  style = this.css;
  data = (key: Key, val: Val) => this.attr(`data-${key}`, val);

  val = (val: Val) => {
    if (!val) return this.first().value;
    this.each((element): Object=>element.value=val);
    return this;
  }

  // Events listeners
  onEvent = (typeEvent: TypeEvent, callback: Callback) => {
    this.each((element): Object => element[typeEvent] = function (e) { (callback.bind(this))(e); } );
    return this;
  }

  onClick = (callback: Callback = function (){}) => this.onEvent('onclick', callback);
  onChange = (callback: Callback = function (){}) => this.onEvent('onchange', callback);
  onScroll = (callback: Callback = function (){}) => this.onEvent('onscroll', callback);
  onKeyup = (callback: Callback = function (){}) => this.onEvent('onkeyup', callback);

  on = function (event: TypeEvent, callback: Callback = function (){}) {
    this.each((element) => element.addEventListener(event, function (e) { (callback.bind(this))(e); }) );
    return this;
  }
}

export default $w;