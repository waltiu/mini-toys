import {React} from '@'
const container = document.getElementById("root")

/** @jsxRuntime classic */  
/** @jsx React.createElement */
const updateValue = e => {
    rerender(e.target.value)
}

const rerender = value => {
    const element = (
        <div>
            <input onInput={updateValue} value={value} />
            <h2>Hello {value}</h2>
        </div>
    )
    React.render(element, container)
}

rerender("World")