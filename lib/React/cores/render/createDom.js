import {TEXT_ELEMENT_TYPE,isProperty } from '../../Common/constant'
import {updateDom} from './commitWork'
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
    updateDom(dom,{},fiber.props)
    return dom;
  }

export default createDom