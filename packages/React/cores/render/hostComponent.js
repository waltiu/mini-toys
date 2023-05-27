import createDom from "./createDom"
import reconcileChildren from './reconcileChildren'
const updateHostComponent=(fiber)=>{
    console.log(fiber,'fiber')
    if(!fiber.dom){
        fiber.dom=createDom(fiber)
    }
    // 创建子fiber
    if(fiber.props.children){
        const childElements=fiber.props.children
        reconcileChildren(fiber,childElements)
    }
}

export default updateHostComponent