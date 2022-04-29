import createDom from "./createDom";
import performUnitOfWork from './performUnitOfWork'

// 下一个工作单元即下一个即将处理的fiber
let nextUnitOfWork=null 

/**
 * 初始化工作单元（根filber）
 * @param {elment} fiber
 * @param {container} 真实Dom
 */
const render = (element, container) => {
  // 设置根节点为初始工作单元
  nextUnitOfWork ={
    dom:container,
    props:{
      children:[element]
    }
  }

};


const workLoop=(deadline)=>{
  // 是否停止循环，通过剩余时间决定
  let shouldYield = false
  while(nextUnitOfWork&&!shouldYield){
    nextUnitOfWork=performUnitOfWork(
      nextUnitOfWork
    )
      // 如果截止时间快到了，停止工作循环函数
      shouldYield = deadline.timeRemaining() < 1
  }
  // 通知浏览器，空闲时间应该执行 workLoop，自动执行
  requestIdleCallback(workLoop)
}

// 通知浏览器，空闲时间应该执行 workLoop，自动执行
requestIdleCallback(workLoop)

export default render;
