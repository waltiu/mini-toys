import  React  from "../packages/React";
import Home from "./Page/Home";
const container = document.getElementById("root");

/** @jsxRuntime classic */
/** @jsx React.createElement */

const App = (
    <Home name='foo' />
)
React.render(App, container);
