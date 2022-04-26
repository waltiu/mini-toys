function useStateHook(initial,wipFiber){
    console.log(2222)
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
        console.log(action,'actions')
        // 将动作添加至钩子队列
        hook.queue.push(action)
        // 更新渲染
        window.JReact.nextUnitOfWork ={
            dom: window.JReact.currentRoot.dom,
            props: window.JReact.currentRoot.props,
            alternate: window.JReact.currentRoot,
        }
        window.JReact.deletions=[]
    }
      // 把钩子添加至工作单元
      console.log(wipFiber,'wipFiber')
      if(wipFiber){
       wipFiber.hook = hook
      }

      // 返回钩子的状态和设置钩子的函数
      return [hook.state, setState]
}
export default useStateHook