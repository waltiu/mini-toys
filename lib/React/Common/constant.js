export const TEXT_ELEMENT_TYPE='TEXT_ELEMENT' // 纯文本节点
export const isProperty = (key) => key !== "children";  // 除了children外的属性

export const isSameFiberType=(oldFiber,newFiber)=>oldFiber&&newFiber&&oldFiber.type===newFiber.type
    // 是否是函数类型组件
 export const isFunctionComponent =(fiber) =>fiber && fiber.type && fiber.type instanceof Function
