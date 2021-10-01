import performUnitOfWork from './requestIdleCallback'
import commitWork from './commitWork'

window.JReact={}
window.JReact.nextUnitOfWork = null  // 初始任务
window.JReact.currentRoot = null // 保存更新前的fiberTree
let wipRoot = null  // 保存一个filber树wipRoot(work in progress root),在render中初始化,commit替换整个树
window.JReact.deletions = null // 删除的节点

const commitRoot = () => {
  window.JReact.deletions.forEach(commitWork)
  console.log('fiberTree成产结束******************', wipRoot)
  commitWork(wipRoot.child);
  window.JReact.currentRoot = wipRoot
  wipRoot = null;
}

const render = (element, container) => {
  wipRoot = {
    dom: container, // root
    props: {
      children: [element], // DOM
    },
    alternate: window.JReact.currentRoot // 新增alternate属性,保存更新前的fiberTree
  };
  window.JReact.deletions = []
  window.JReact.nextUnitOfWork = wipRoot;
  console.log('fiberTree初始化********************',window.JReact.nextUnitOfWork)
  requestIdleCallback(workLoop)
}

const workLoop = (deadline) => {
  let shouldYiled = false  // 是否暂停，当前帧无时间需要暂停
  while (window.JReact.nextUnitOfWork && !shouldYiled) {
    console.log(window.JReact.nextUnitOfWork,'window.JReact.nextUnitOfWork')
    window.JReact.nextUnitOfWork = performUnitOfWork(
      window.JReact.nextUnitOfWork, window.JReact.deletions
    )
    shouldYiled = deadline.timeRemaining() < 1  // 当前帧的剩余时间没有时，需要进行暂停
  }
  // 无任务进行时,一次性提交Dom
  if (!window.JReact.nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop) // 申请下一次时间片
}

export default render