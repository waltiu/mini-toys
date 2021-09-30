import performUnitOfWork from './requestIdleCallback'
import commitWork from './commitWork'

let nextUnitOfWork = null  // 初始任务
let currentRoot = null // 保存更新前的fiberTree
let wipRoot = null  // 保存一个filber树wipRoot(work in progress root),在render中初始化,commit替换整个树
let deletions = null // 删除的节点

const commitRoot = () => {
  deletions.forEach(commitWork)
  console.log('fiber成产结束******************', wipRoot)
  commitWork(wipRoot.child);
  currentRoot = wipRoot
  wipRoot = null;
}

const render = (element, container) => {
  wipRoot = {
    dom: container, // root
    props: {
      children: [element], // DOM
    },
    alternate: currentRoot // 新增alternate属性,保存更新前的fiberTree
  };
  deletions = []
  nextUnitOfWork = wipRoot;
  console.log('fiber初始化******************', nextUnitOfWork)
  requestIdleCallback(workLoop)
}

const workLoop = (deadline) => {
  let shouldYiled = false  // 是否暂停，当前帧无时间需要暂停
  while (nextUnitOfWork && !shouldYiled) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork, deletions
    )
    shouldYiled = deadline.timeRemaining() < 1  // 当前帧的剩余时间没有时，需要进行暂停
  }
  // 无任务进行时,一次性提交Dom
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop) // 申请下一次时间片
}

export default render