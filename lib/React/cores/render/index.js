import performUnitOfWork from './requestIdleCallback'
import commitWork from './commitWork'


/**
 * 将虚拟Dom添加到真实的Dom节点
 * @param {elment} 虚拟Dom 
 * @param {container} 真实Dom 
 */
const render = (element, container) => {
  const dom = document.createElement(element.type)
  container.appendChild(dom)
}


export default render