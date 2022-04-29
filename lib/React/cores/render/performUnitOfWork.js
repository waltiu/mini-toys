import createDom from "./createDom"

/**
 * 处理每个fiber
 * @param {fiber} fiber 
 * @returns 返回下一个工作单元（下一个将处理的filber）
 */
const performUnitOfWork =(fiber)=>{
    // 为每个filber创建一个dom节点
    if(!fiber.dom){
        fiber.dom=createDom(fiber)
    }
    // 如果有父节点，就是当前filber创建的dom添加到父filber的dom中
    if(fiber.parent){
        fiber.parent.dom.appendChild(fiber.dom)
    }
    // 创建子filber
    if(fiber.props.children){
        const childElements=fiber.props.children
        // 上一个兄弟节点
        let prevSibling = null
        childElements.forEach((element,index)=>{
            const newFiber={
                ...element,
                parent:fiber,
                dom:null
            }
            // 第一个子节点设为fiber的子节点
            if(index===0){
                fiber.child = newFiber
            }else{
                 // 第一个之外的子节点设置为上一个节点的的兄弟结点（比如第1个节点是fiber的子节点，第二个节点是第一个节点的相邻节点）
                prevSibling.sibling = newFiber
            }
            prevSibling = newFiber
        })
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
    return fiber
}
export default performUnitOfWork