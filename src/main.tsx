import React from '../Toy/React'

const app = document.querySelector<HTMLDivElement>('#root')

/** @jsxRuntime classic */
/** @jsx React.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

React.render(element,app);
