 const createElement =(type, props, ...children)=> {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => 
                 // 这里我们区分下基本类型和引用类型，用 createTextElement 来创建文本节点类型
                typeof child === 'object'
                ? child
                : createTextElement(child)
            )
        }
    }
}
 const createTextElement= (text)=> {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}
export default createElement

