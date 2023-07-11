import useGlobalStore from "../Store/useGlobalStore";

const Child = () => {
  const [reset, destroy] = useGlobalStore((state) => [
    state?.reset,
    state.destroy,
  ]);

  return (
    <div>
      <h3>Child</h3>
      <button onClick={() => reset()}>清空</button>
      <button onClick={() => destroy()}>销毁</button>
    </div>
  );
};

export default Child;
