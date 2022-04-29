import createDom from "./createDom";
import performUnitOfWork from './performUnitOfWork'
import commitRoot from '../commit'

// 下一个工作单元即下一个即将处理的fiber
let nextUnitOfWork=null 

// 根节点
let virtualRoot=null

// 保存根节点更新前的fiber tree
let historyRoot=null

// 需要删除的节点
let deletions=[]


/**
 * 初始化工作单元（根fiber）
 * @param {elment} fiber
 * @param {container} 真实Dom
 */
const render = (element, container) => {
  console.log(1111)
  // 设置根节点为初始工作单元
  virtualRoot ={
    dom:container,
    props:{
      children:[element]
    },
    alternate:historyRoot
  }
  nextUnitOfWork=virtualRoot
  console.log(nextUnitOfWork,'nextunitwork',historyRoot)
};


export const pushDeleteFiberList=(fiber)=>{
  deletions.push(fiber)
}

const workLoop=(deadline)=>{
  // fiber遍历完成，不存在工作单元时提交更新
  if(virtualRoot&&!nextUnitOfWork){
    commitRoot(virtualRoot,deletions)
    historyRoot=virtualRoot
    virtualRoot=null
    deletions=[]
  }

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
