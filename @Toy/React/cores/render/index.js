import performUnitOfWork from './requestIdleCallback'
let nextUnitOfWork =null  // 初始任务

const render = (element, container) => {
  nextUnitOfWork = {
    dom: container, // root
    props: {
      children: [element], // DOM
    },
  };
  console.log('fiber初始化******************',nextUnitOfWork)
  requestIdleCallback(workLoop)
}

const workLoop=(deadline)=>{
  let shouldYiled=false  // 是否暂停，当前帧无时间需要暂停
  while(nextUnitOfWork&&!shouldYiled){
    nextUnitOfWork = performUnitOfWork(
        nextUnitOfWork
      )
    shouldYiled=deadline.timeRemaining()<1  // 当前帧的剩余时间没有时，需要进行暂停
  }
  requestIdleCallback(workLoop) // 申请下一次时间片
}

export default render