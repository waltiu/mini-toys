
import createDom from './createDom'
//  requestIdleCallback只有部分浏览器支持，React内部自己实现了一个requestIdleCallback()

// 如果有子或者兄弟节点没有插入,则return出去,赋值到nextUnitOfWork,再次执行
const performUnitOfWork =(fiber)=>{
  /*第一步：元素添加到Dom中 */
  if(!fiber.dom){
    fiber.dom=createDom(fiber)  // 生成新的vDOM结构
  }
  // 为了避免浏览器中断我们的操作,给用户呈现一个不完整的ui,当所有单元执行完成后,再进行Dom添加操作
  // 也就是React在不同阶段的机制不同 Rneder阶段,可以中断,Commit阶段,不可中断
  // if(fiber.parent){
  //   fiber.parent.dom.appendChild(fiber.dom)  // 插入到dom中
  // }
  /*第二步：子元素生成Fiber*/
  const elements=fiber.props.children // 旧的vDOM结构
  let index=0
  let prevSibing=null
  while(index<elements.length){
    const element=elements[index]
    // fiber节点结构,每个元素都是一个fiber
    const newFiber={
      flag:'JReact',
      type:element.type,
      props:element.props||{},
      dom:null,
      parent:fiber
    }
    // 第一个子元素作为child，其余子元素作为sibling兄弟
    if(index===0){
      fiber.child=newFiber
    }else{
      prevSibing.sibling=newFiber 
    }
    prevSibing=newFiber // 下一个元素为上一个元素的sibling
    index++
  }

  /*第三步： 遍历fiber树，找到下一个工作单元 */
  if (fiber.child) {
    return fiber.child;
  }
  while(fiber){
    if(fiber.sibling){
      return fiber.sibling
    }
    fiber=fiber.parent
  }
}
export default performUnitOfWork