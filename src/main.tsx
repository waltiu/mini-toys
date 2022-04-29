import {React} from '@'
const container = document.getElementById("root")

/** @jsxRuntime classic */  
/** @jsx React.createElement */
const element = (
    <div id='foo'>
        <a>bar</a>
        <b></b>
    </div>
)
React.render(element, container)