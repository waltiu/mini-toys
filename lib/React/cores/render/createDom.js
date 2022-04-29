import { TEXT_ELEMENT_TYPE, isProperty } from "../../Common/constant";
/**
 * 
 * @param {fiber} fiber节点 
 * @returns dom节点
 */
const createDom = (fiber) => {
  // 纯文本节点，创建textNode
  const dom =
    fiber.type === TEXT_ELEMENT_TYPE
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  // 遍历非children的props属性，并将属性添加到dom上
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });
  return dom;
};

export default createDom;
