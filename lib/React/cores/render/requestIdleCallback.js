
import createDom from './createDom'
import { EFFECT_TAG_PLACEMENT, EFFECT_TAG_DELETION, EFFECT_TAG_UPDATE } from '../constant'
import useStateHook from '../hooks/usestate'
//  requestIdleCallback只有部分浏览器支持，React内部自己实现了一个requestIdleCallback()


// 创建每个Fiber,并比较是否更新,初始化时会为每个节点设置effectTag为EFFECT_TAG_UPDATE新增
const createFiber = (fiber, elements, deletions) => {
  // 旧的fiber可以在fiber的alternate属性中知道,在index.js的render中定义的
  let oldFiber = fiber?.alternate?.child
  let index = 0
  let prevSibing = null
  while (index < elements.length) {
    const element = elements[index]
    let newFiber = null
    const sameType = oldFiber && element && element.type === oldFiber.type // 新老fiber的类型是否相同
    // fiber节点结构,每个元素都是一个fiber
    // 如果type相同,保留dom并设置effectTag为UPDATE
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: fiber,
        alternate: oldFiber,
        effectTag: EFFECT_TAG_UPDATE,
      }
    }

    // 如果type不同,dom为空后面创建新的dom节点并设置effectTag为PLACEMENT新增
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: fiber,
        alternate: null,
        effectTag: EFFECT_TAG_PLACEMENT,
      }
    }

    // 如果type不同,创建新的dom同时,将旧的dom放入deletions在全部流程结束后删除
    if (oldFiber && !sameType) {
      oldFiber.effectTag = EFFECT_TAG_DELETION
      deletions.push(oldFiber)
    }

    if (oldFiber && oldFiber.sibling) {
      oldFiber = oldFiber.sibling
    }

    // 第一个子元素作为child，其余子元素作为sibling兄弟
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSibing.sibling = newFiber
    }
    prevSibing = newFiber // 下一个元素为上一个元素的sibling
    index++
  }
}
let wipFiber=null
// 如果有子或者兄弟节点没有插入,则return出去,赋值到nextUnitOfWork,再次执行
const performUnitOfWork = (fiber, deletions) => {
  console.log(1111)
  /*第一步：生成dom */
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)  // 生成新的vDOM结构
  }
  wipFiber=fiber
  wipFiber.hook =[]
  /*第二步：子元素生成Fiber*/
  const elements = fiber.props.children // 旧的vDOM结构
  createFiber(fiber, elements, deletions)
  /*第三步： 遍历fiber树，找到下一个工作单元 */
  if (fiber.child) {
    return fiber.child;
  }
  while (fiber) {
    if (fiber.sibling) {
      return fiber.sibling
    }
    fiber = fiber.parent
  }
}
export const useState =(initial)=>{
  useStateHook(initial,wipFiber)
}
export default performUnitOfWork