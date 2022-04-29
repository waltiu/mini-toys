import { PLACEMENT_TAG, UPDATE_TAG, DELETE_TAG } from "../../Common/fiberTags";
import updateAttr from "./updateAttr";
const commitWork = (fiber) => {
  if (!fiber) return;
  const domParent = fiber.parent.dom;
  // 新增
  if (fiber.effectTag === PLACEMENT_TAG && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === DELETE_TAG) {
    domParent.removeChild(fiber.dom);
  } else if (fiber.effectTag === UPDATE_TAG && fiber.dom != null) {
    updateAttr(fiber.dom, fiber.alternate.props, fiber.props);
  }
  // 渲染子节点
  commitWork(fiber.child);
  // 渲染兄弟节点
  commitWork(fiber.sibling);
};
export default commitWork;
