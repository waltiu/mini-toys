import createDom from "./createDom"
import reconcileChildren from './reconcileChildren'
import { isFunctionComponent } from "../../Common/constant"
import updateFunctionComponent from './functionComponent'
import updateHostComponent from './hostComponent'
/**
 * 处理每个fiber
 * @param {fiber} fiber 
 * @returns 返回下一个工作单元（下一个将处理的fiber）
 */
const performUnitOfWork =(fiber)=>{
    if (isFunctionComponent(fiber)) {
        console.log(fiber,'fiber')
        // 函数式组件的type是个函数，函数组件的child是函数运行后得到的
        updateFunctionComponent(fiber)
    } else {
        // 非函数式直接根据type创建就可以
        updateHostComponent(fiber)
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