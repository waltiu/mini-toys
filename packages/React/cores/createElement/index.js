import createTextElement from "./createTextElement"

/**
 * 创建虚拟Dom结构-default export
 * @param {type}  标签类型
 * @param {props} 属性
 * @param {children} 子节点
 * @returns 虚拟Dom
 */
 const createElement =(type, props, ...children)=> {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => 
                typeof child === 'object'
                ? child
                : createTextElement(child)
            )
        }
    }
}

export default createElement