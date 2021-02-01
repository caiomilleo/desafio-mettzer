import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Articles from './pages/Articles/Articles';
import FavoriteArticles from './pages/FavoriteArticles/FavoriteArticles';

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path={['/', '/artigos']}>
            <Articles />
          </Route>
          <Route exact path='/favoritos'>
            <FavoriteArticles />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
