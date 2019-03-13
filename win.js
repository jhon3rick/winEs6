/**
 * @flow
 * $winEs6
 * @jhon3rick
 */

type Key = string // key element dom in getter method
type Val = ?string // new value in setter method
type TypeEvent = 'onclick' | 'onchange' | 'onscroll' | 'onkeyup' // event listener
type Callback = (element: Object, index ?: number)=>void
type Adjacent = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'
type ArrayDom = NodeList<Object> | Array<Object>
type This = Object

function $w (key: Key) {
  return new $winEs6(key);
}

interface iWinEs6 {
  arrayDom: ArrayDom;
  first(): This;
  each(callback: Callback): This;
  html(): This;
  addHtml(): This;
  before(): This;
  prepend(): This;
  append(): This;
  after(): This;
  moveDown(): This;
  moveUp(): This;
  attr(key: Key, val: Val): This;
  css(key: Key, val: Val): This;
  style(key: Key, val: Val): This;
  data(key: Key, val: Val): This;
  val(val: Val): This;
  onEvent(typeEvent: TypeEvent, callback: Callback): This;
  removeAttr(key: Key): This;
  remove(): This;
  onClick(callback: Callback): This;
  onChange(callback: Callback): This;
  onScroll(callback: Callback): This;
  onKeyup(callback: Callback): This;
  on(event: TypeEvent, callback: Callback): This;
}

class $winEs6 implements iWinEs6 {
  arrayDom: ArrayDom=[];

  constructor (key: Key) {
    this.arrayDom = document.querySelectorAll(key) || [];
  }

  first = (): Object => this.arrayDom[0] || {};

  each = (callback: Callback) => {
    this.arrayDom.forEach((element: Object, index) => callback(element, index));
    return this;
  }

  html = (val: Val) => {
    if (!val && val !== '') return this.first().innerHTML;
    return this.each((element): Object => element.innerHTML = val);
  }

  addHtml = (val: Val, typeAdjacent: Adjacent='beforeend') => this.each((element)=>element.insertAdjacentHTML(typeAdjacent, val));
  before = (val: Val) => this.addHtml(val, 'beforebegin');
  prepend = (val: Val) => this.addHtml(val, 'afterbegin');
  append = (val: Val) => this.addHtml(val, 'beforeend');
  after = (val: Val) => this.addHtml(val, 'afterend');

  moveDown = () => this.each((element)=>{ if (element.nextSibling) element.nextSibling.after(element); });
  moveUp = () => this.each((element)=>{ if (element.previousSibling) element.previousSibling.before(element); });

  attr = (key: Key, val: Val) => {
    if (!val && val !== '') return this.first().getAttribute(key);
    return this.each((element)=>element.setAttribute(key, val));
  }

  css = (key: Key, val: Val) => {
    if (!val && val !== '') return this.first().style[key];
    return this.each((element): Object => element.style[key] = val);
  }

  style = this.css;
  data = (key: Key, val: Val) => this.attr(`data-${key}`, val);

  val = (val: Val) => {
    if (!val && val !== '') return this.first().value;
    return this.each((element): Object=>element.value=val);
  }

  id = (val: Val) => {
    if (!val && val !== '') return this.first().id;
    return this.each((element): Object=>element.id=val);
  }

  // Events listeners
  onEvent = (typeEvent: TypeEvent, callback: Callback) => this.each((element): Object => element[typeEvent] = function (e) { (callback.bind(this))(e); } );
  removeAttr = (key: Key) => this.each((element): Object => element.removeAttribute(key) );
  remove = () => this.each((element): Object => element.parentNode.removeChild(element) );

  onClick = (callback: Callback = function (){}) => this.onEvent('onclick', callback);
  onChange = (callback: Callback = function (){}) => this.onEvent('onchange', callback);
  onScroll = (callback: Callback = function (){}) => this.onEvent('onscroll', callback);
  onKeyup = (callback: Callback = function (){}) => this.onEvent('onkeyup', callback);

  on = function (event: TypeEvent, callback: Callback = function (){}) {
    return this.each((element) => element.addEventListener(event, function (e) { (callback.bind(this))(e); }) );
  }
}

export default $w;