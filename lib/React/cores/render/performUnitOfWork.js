import createDom from "./createDom"
import reconcileChildren from './reconcileChildren'

/**
 * 处理每个fiber
 * @param {fiber} fiber 
 * @returns 返回下一个工作单元（下一个将处理的fiber）
 */
const performUnitOfWork =(fiber)=>{
    // 为每个fiber创建一个dom节点
    if(!fiber.dom){
        fiber.dom=createDom(fiber)
    }
    // 创建子fiber
    if(fiber.props.children){
        const childElements=fiber.props.children
        reconcileChildren(fiber,childElements)
    }

    // 遍历顺序：根节点(父节点)->子节点->兄弟节点->兄弟节点->父节点的兄弟节点->根节点
    // 如果有子节点就返回子节点
    if(fiber.child){
        return fiber.child
    }
    let nextFiber=fiber
    while(nextFiber){
        // 如果有兄弟节点就返回兄弟节点
        if(nextFiber.sibling){
            return nextFiber.sibling
        }
        // 否则继续走 while 循环，直到找到 root。
        nextFiber = nextFiber.parent
    }
}
export default performUnitOfWork