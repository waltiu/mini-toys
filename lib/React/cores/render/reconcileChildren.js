import {isSameFiberType} from '../../Common/constant'
import {UPDATE_TAG,PLACEMENT_TAG,DELETE_TAG} from '../../Common/fiberTags'
import {pushDeleteFiberList} from '../render'

/**
 * 协调子节点，创建fiber的parent,child,sibling关系,对比新旧fiber并打标
 * @param {*} fiber  当前fiber
 * @param {*} elements  fiber的子节点
 */
const reconcileChildren=(fiber,elements)=>{
      // 初始oldFiber为child
      let oldFiber=fiber.alternate&&fiber.alternate.child
      let prevSibling = null
      elements.forEach((element,index)=>{
          let newFiber ={
            ...element,
            parent:fiber,
            dom:null,
            alternate:oldFiber
          }
          const sameType=isSameFiberType(oldFiber,element)
          
          // 类型相同，仅更新props
          if(sameType){
            newFiber={
                ...newFiber,
                dom:oldFiber.dom,
                props:element.props,
                effectTag:UPDATE_TAG
            }
          }
          // 类型不同，新建
          if(!sameType){
              newFiber={
                  ...newFiber,
                  alternate: null,
                  effectTag: PLACEMENT_TAG,
              }
          }
          // 类型不同，存在旧的fiber，需把旧的fiber删除
          if(!sameType&&oldFiber){
            oldFiber.effectTag=DELETE_TAG
            pushDeleteFiberList(oldFiber)
          }
          // 更新oldFiber为兄弟节点
          if (oldFiber) {
            oldFiber = oldFiber.sibling
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

export default reconcileChildren