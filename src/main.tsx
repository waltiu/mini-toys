import React from '@React'
import Home from './pages/Home'

const app = document.querySelector<HTMLDivElement>('#root')

// /** @jsxRuntime classic */  使用自定义的React.createElement
/** @jsx React.createElement */
const element = (
  <div id="foo">
    <Home/>
  </div>
);
console.log(React,'JReact',element)
React.render(element,app);
