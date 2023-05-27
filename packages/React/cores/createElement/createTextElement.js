
/**
 * 
 * @param text 纯文本内容
 * @returns 虚拟Dom
 */
 export const createTextElement =(text)=> {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}

export default createTextElement