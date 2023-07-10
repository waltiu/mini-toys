import useGlobalStore from "../Store/useGlobalStore";

const Child = () => {
  const bears = useGlobalStore(
    (state) => state?.bears,
    (a, b) => {
      return a === b;
    }
  );


  return (
    <div>
      <h3>Child</h3>
      <p>{bears}</p>
    </div>
  );
};

export default Child;
