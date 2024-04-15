import { useAppContext } from "../../../contexts/Context";
import { takeBack } from "../../../reducer/actions/move";

const TakeBack = () => {
  const { dispatch } = useAppContext();

  return (
    <div>
      <button onClick={() => dispatch(takeBack())}>Undo</button>
    </div>
  );
};

export default TakeBack;
