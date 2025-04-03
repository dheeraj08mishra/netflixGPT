import { Provider } from "react-redux";
import Body from "./Body";
import store from "../utils/appStore";
Provider;
const App = () => {
  return (
    <>
      <Provider store={store}>
        <Body />
      </Provider>
    </>
  );
};
export default App;
