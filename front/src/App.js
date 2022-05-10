import GlobalState from "./context/GlobalState";
import { Router } from "./routes/router";

function App() {
  return (
    <>
      <GlobalState>
        <Router />
      </GlobalState>
    </>
  );
}

export default App;
