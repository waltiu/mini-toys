import { EFFECT_TAG_PLACEMENT, EFFECT_TAG_DELETION, EFFECT_TAG_UPDATE } from '../constant'
import { isProperty } from '../../../Common/constant'

// 是否是新属性
const isNew = (prev, next) => key => prev[key] !== next[key]

// 是否是旧属性
const isGone = (prev, next) => key => !(key in next)

// 判断是否是事件
const isEvent = key => key.startsWith("on")

// dom,旧props,新props
export const updateDom = (dom, prevProps, nextProps) => {
    // 删除旧属性
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps, nextProps))
        .forEach(name => {
            dom[name] = ""
        })

    // 更新新属性
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            dom[name] = nextProps[name]
        })

    //删除旧的或者有变化的事件
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(
            key =>
                !(key in nextProps) ||
                isNew(prevProps, nextProps)(key)
        )
        .forEach(name => {
            const eventType = name
                .toLowerCase()
                .substring(2)
            dom.removeEventListener(
                eventType,
                prevProps[name]
            )
        })

    // 注册新事件
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            const eventType = name
                .toLowerCase()
                .substring(2)
            dom.addEventListener(
                eventType,
                nextProps[name]
            )
        })
}

// 提交整个dom结构到真实dom
const commitWork = (fiber) => {
    if (!fiber) return
    const domParent = fiber.parent.dom
    if (
        fiber.effectTag === EFFECT_TAG_PLACEMENT &&
        fiber.dom != null
    ) {
        domParent.appendChild(fiber.dom)
    } else if (fiber.effectTag === EFFECT_TAG_DELETION) {
        domParent.removeChild(fiber.dom)
    } else if (fiber.effectTag === EFFECT_TAG_UPDATE && fiber.dom != null) {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props)
    }
    commitWork(fiber.child);
    commitWork(fiber.sibling);
}
export default commitWork