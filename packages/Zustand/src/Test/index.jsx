import useGlobalStore from "../Store/useGlobalStore";
import Child from "./child";

export const Test = () => {
  const globalStore = useGlobalStore((state) => state);
  const { bears, count, increase, reduce, radomCount } = globalStore;
  return (
    <div>
      <h3>Parent</h3>
      <div>
        bears ( {bears} ):
        <button onClick={() => increase()}>增加 </button>
        <button onClick={() => reduce()}>减少</button>
      </div>

      <div>
        count ( {count} ): <button onClick={() => radomCount()}>随机</button>
      </div>

      <Child />
    </div>
  );
};

export default Test;
