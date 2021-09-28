import React from '../Toy/React'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!
/** @jsx React.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

console.log('virtualDom',element)
React.render(element,app);
