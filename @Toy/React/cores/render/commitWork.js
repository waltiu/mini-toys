// 提交整个dom结构到真实dom
const commitWork =(fiber)=>{
    if(!fiber){
        return;
    }
    const domParent =fiber.parent.dom
    domParent.appendChild(fiber.dom)
    commitWork(fiber.child);
    commitWork(fiber.sibling);
}
export default commitWork