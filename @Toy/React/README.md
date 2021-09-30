# React16架构
 # Scheduler(调度器)——调度任务的优先级，高优任务 优先进入Reconciler
 # Reconciler(协调器)——负责找出变化的组件
 # Renderer(渲染器)——负责将变化的组件渲染到页面上


# diff
 将更新前的fiberTree和更新后的fiberTree进行比较,得到比较结果后,仅对变化得fiber对应得dom节点进行更新