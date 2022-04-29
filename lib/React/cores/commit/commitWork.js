import { PLACEMENT_TAG, UPDATE_TAG, DELETE_TAG } from "../../Common/fiberTags";
import updateAttr from "./updateAttr";

function commitDeletion(fiber, domParent) {
  console.log(fiber,'fibler')
  // 如果该 fiber 有 dom 节点，直接删除
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    // 如果该 fiber 没有 dom 节点，则继续找它的子节点进行删除,组件必须被一个根元素包裹，函数组件删除找的就是这个根删除
    commitDeletion(fiber.child, domParent);
  }
}

const commitWork = (fiber) => {
  if (!fiber) return;
  let domParentFiber = fiber.parent;
  // 如果 fiber.parent 没有 dom 节点，则继续找 fiber.parent.parent.dom，直到有 dom 节点(函数式组件)。
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;
  // 新增
  if (fiber.effectTag === PLACEMENT_TAG && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === DELETE_TAG) {
    commitDeletion(fiber.dom, domParent);
  } else if (fiber.effectTag === UPDATE_TAG && fiber.dom != null) {
    updateAttr(fiber.dom, fiber.alternate.props, fiber.props);
  }
  // 渲染子节点
  commitWork(fiber.child);
  // 渲染兄弟节点
  commitWork(fiber.sibling);
};
export default commitWork;
