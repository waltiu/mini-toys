import commitWork from "./commitWork"
/**
 * 更新Dom,在fiber树遍历完成后执行
 * @param {virtualRoot} fiber树遍历完成后获取的Dom结构 
 * @param {deletions}  需要删除的节点
 */
const commitRoot=(virtualRoot,deletions)=>{
    console.log(deletions,'deletions')
    commitWork(virtualRoot.child)
    deletions.forEach(commitWork)
}

export default commitRoot