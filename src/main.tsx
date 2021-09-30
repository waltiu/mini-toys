import React from '@React'
import Home from './pages/Home'

const app = document.querySelector<HTMLDivElement>('#root')

// /** @jsxRuntime classic */  使用自定义的React.createElement
/** @jsx React.createElement */
// const element = (
//   <div id="foo">
//     <Home/>
//   </div>
// );
// console.log(React,'JReact',element)
// React.render(element,app);


const updateValue = e => {
  rerender(e.target.value)
}

const rerender = value => {
  const element = (
      <div>
          <input onInput={updateValue} value={value} />
          <h2>Hello {value}</h2>
          <div>1111</div>
      </div>
  )
  React.render(element, app)
}

rerender("World")