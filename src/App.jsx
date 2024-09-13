import Countries from "./components/Countries";
import Header from "./components/Header";
import store from "./store/reduxStore";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Countries />
    </Provider>
  );
}

export default App;
