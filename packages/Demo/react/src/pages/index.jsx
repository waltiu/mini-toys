import useGlobalStore from "../Store/useGlobalStore";
import Child from "./child";

export const Test = () => {
  const globalStore = useGlobalStore((state) => state);
  const { bears, count, increase, reSet, radomCount } = globalStore;
  return (
    <div>
      <h3>Parent</h3>
      <div>
        bears ( {bears} ):
        <button onClick={() => increase()}>增加 </button>
        <button onClick={() => reSet()}>重置为10086</button>
      </div>

      <div>
        count ( {count} ): <button onClick={() => radomCount()}>随机</button>
      </div>

    </div>
  );
};

export default Test;
