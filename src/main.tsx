// /** @jsxRuntime classic */  使用自定义的React.createElement
/** @jsx React.createElement */
import React from '@React'
import Home from './pages/Home'

const app = document.querySelector<HTMLDivElement>('#root')


const element = (
  <div id="foo">
    <Home test="1" name='foo'/>
  </div>
);
console.log(React,'JReact',element)
React.render(element,app);

