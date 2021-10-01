

/** @jsxRuntime classic */
/** @jsx React.createElement */
import React from '@React'
import Login  from '../Login'

const Home =(props:any)=>{
    console.log(props)
    return (
        <div>
            欢迎使用JReact
            <div>
                1
            </div>
            <div>
               <Login/>
            </div>
        </div>
    )
}
export default Home