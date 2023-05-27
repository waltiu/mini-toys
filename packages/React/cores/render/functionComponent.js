import reconcileChildren from "./reconcileChildren";
const updateFunctionComponent = (fiber) => {
// fiber.type 就是函数组件本身，fiber.props 就是函数组件的参数
  const children = [fiber.type(fiber.props)];
  console.log(children,'children')
  reconcileChildren(fiber, children);
};

export default updateFunctionComponent;
