import {TEXT_ELEMENT_TYPE,isProperty} from '../../Common/constant'
function render(element, container) {
    // 1. 创建不同类型的DOM节点
    const dom =
      element.type == "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(element.type);
  
    // 2.为 DOM 节点添加属性props (没有children属性)
    const isProperty = (key) => key !== "children";
    Object.keys(element.props)
      .filter(isProperty)
      .forEach((name) => {
        dom[name] = element.props[name];
      });
  
    // 3. 遍历children，递归调用 render
    element.props.children.forEach((child) => render(child, dom));
    console.log(dom,'dom',container)
    // 4. 将 DOM 节点添加至 root 根节点
    container.appendChild(dom);
  }
export default render