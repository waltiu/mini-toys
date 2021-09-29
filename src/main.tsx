import React from '../Toy/React'
import Home from './pages/Home'

const app = document.querySelector<HTMLDivElement>('#root')

/** @jsxRuntime classic */
/** @jsx React.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
    <Home/>
  </div>
);
console.log(element)
React.render(element,app);
