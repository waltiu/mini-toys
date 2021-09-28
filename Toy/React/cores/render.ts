import {TEXT_ELEMENT_TYPE,isProperty} from '../../Common/constant'
const render=(virtualDom,container)=>{
    const dom=virtualDom.type===TEXT_ELEMENT_TYPE?document.createTextNode(""):document.createElement(element.type);
    Object.keys(virtualDom.props)
    .filter(isProperty)
    .forEach((propertyName)=>{
        dom[propertyName]=element.props[propertyName]
    })
    virtualDom.props.children.forEach((children)=>render(children,dom))
    container.appendChild(dom);
}
export default render