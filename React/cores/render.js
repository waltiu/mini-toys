// 下一个工作单元
let nextUnitOfWork = null
/**
 * workLoop 工作循环函数
 * @param {deadline} 截止时间
 */
const workLoop=(deadline)=> {
  // 是否应该停止工作循环函数
  let shouldYield = false

  // 如果存在下一个工作单元，且没有优先级更高的其他工作时，循环执行
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )

    // 如果截止时间快到了，停止工作循环函数
    shouldYield = deadline.timeRemaining() < 1
  }

  // 通知浏览器，空闲时间应该执行 workLoop
  requestIdleCallback(workLoop)
}
// 通知浏览器，空闲时间应该执行 workLoop
requestIdleCallback(workLoop)

// 执行单元事件，并返回下一个单元事件
const performUnitOfWork=(nextUnitOfWork)=> {
  // TODO
}

const render=(element, container)=>{
        const dom = element.type === 'TEXT_ELEMENT'
            ? document.createTextNode("")
            : document.createElement(element.type)
        element.props.children.forEach(child => 
            render(child, dom)
        )
        const isProperty = key => key !== "children"
        Object.keys(element.props)
            .filter(isProperty)
            .forEach(name => {
                dom[name] = element.props[name]
            })
        container.appendChild(dom)
}
export default render 