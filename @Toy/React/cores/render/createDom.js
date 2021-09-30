import {TEXT_ELEMENT_TYPE,isProperty } from '../../../Common/constant'
// 只创建dom
const createDom=(fiber)=>{
    const dom=fiber.type == TEXT_ELEMENT_TYPE
    ? document.createTextNode("")
    : document.createElement(fiber.type);
    Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });
    return dom;
  }

export default createDom