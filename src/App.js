import './App.css';
import {Route, Routes, Link,NavLink} from "react-router-dom";
import Login from "./pages/Login";
import Content from "./pages/Content";
import Page404 from "./pages/Page404";
import './assets/css/Main.css'
import Workflows from "./views/workflows/Workflows";
import ActiveWorkflows from "./views/workflows/ActiveWorkflows";
import Home from "./views/Home";

function App() {
  return (
      <Routes>
          <Route path={"/login"} element={ <Login/>}/>
          <Route path={"/"} element={ <Content/>}>
              <Route index={true} element={<Home/>}/>
              <Route path={"workflows"} element={<Workflows/>}/>
              <Route path={"active-workflows"} element={<ActiveWorkflows/>}/>

          </Route>


          <Route path={"*"} element={<Page404/>}/>
      </Routes>

  );
}

export default App;
