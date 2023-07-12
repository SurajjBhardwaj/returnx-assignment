
import './App.css';
import {Route} from "react-router-dom"
import HomePage from './pages/HomePage';
import newPage from './pages/newPage';
import AdminPage from './components/Authentication/Admin';

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact />
      <Route path="/new" component={newPage} />
      <Route path="/admin" component={AdminPage} />
    </div>
  );
}

export default App;
