const useStateHook=(initial,wipFiber,nextUnitOfWork,deletions)=>{
    const oldHook=wipFiber?.alternate?.oldHook
    const hook={
        state:oldHook?oldHook.state:initial,
        queue:[]
    }
    // 获取旧的钩子队列中全部动作,然后都应用到新的钩子状态
    const actions=oldHook?oldHook.queue:[]
    actions.forEach(action=>{
        hook.state=action(hook.state)
    })

    // 设置钩子状态
    const setState=action=>{
        // 将动作添加至钩子队列
        hook.queue.push(action)
        // 更新渲染
        wipRoot={
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot,
        }
        nextUnitOfWork =wipRoot
        deletions=[]
    }
      // 把钩子添加至工作单元
      wipFiber.hook = hook

      // 返回钩子的状态和设置钩子的函数
      return [hook.state, setState]
}
export default useStateHook