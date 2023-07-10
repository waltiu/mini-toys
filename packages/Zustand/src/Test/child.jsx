import useGlobalStore from "../Store/useGlobalStore";

const Child = () => {
  const [reset, destroy] = useGlobalStore(
    (state) => [state?.reset, state.destroy]
  );

  return (
    <div>
      <h3>Child</h3>
      <p>
        <button onClick={() => reset()}>重置</button>
      </p>
      <p>
        <button onClick={() => destroy()}>销毁</button>
      </p>
    </div>
  );
};

export default Child;
