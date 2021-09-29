 const createElement =(type:any, props:any, ...children:any)=> {
     if(typeof(type)!=='string'){
         const Component=type()
         return Component
     }
    return {
        type:typeof(type)==='string'?type:'div',
        flag:'JReact',
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
 const createTextElement= (text:any)=> {
    return {
        type: "TEXT_ELEMENT",
        flag:'JReact',
        props: {
            nodeValue: text,
            children: []
        }
    }
}
export default createElement

