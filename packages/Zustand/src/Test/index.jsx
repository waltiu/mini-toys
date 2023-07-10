import useGlobalStore from "../Store/useGlobalStore";
import Child from "./child";
export const Test = () => {
  const globalStore = useGlobalStore((state)=>state);
  const { bears, count, increase, decrease, reset, increaseCount } =
    globalStore;
  return (
    <div>
      <h3>Parent</h3>

      <button onClick={() => increase()}>increase {bears}</button>
      <button onClick={() => decrease()}>decrease {bears}</button>
      <button onClick={() => reset()}>reset</button>

      <button onClick={() => increaseCount()}>count: {count}</button>

      <Child />
    </div>
  );
};

export default Test;
