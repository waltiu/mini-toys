
/** @jsxRuntime classic */
/** @jsx React.createElement */
import React from '@React'

const Login =(props:any)=>{
    const [state, setState] = React.useState(1)
    return (
        <h1 onClick={() => {
            console.log('setstate')
            setState(c => c + 1)
        }}>
        Count: {state}
        </h1>
    )
}
export default Login