import {useSelector} from 'react-redux';
import './App.css';
import Header from './components/header/header';
import Loading from './components/loading/loading';
import Settings from './components/settings/settings';
import Summary from './pages/summary/summary';
import {Switch, Route, Redirect} from 'react-router-dom';
import CardList from './pages/card-list/card-list';
import RentedCards from './pages/rented-cards/rented-cards';


function App() {

  const ui = useSelector(state => state.ui);

  return (
    <div className="App">
      {ui.isLoading && <Loading/>}
      {ui.isShowSettings && <Settings/>}
      <Header/>
        <Switch>
          <Route exact path="/dashboard">
            <Summary/>
          </Route>
          <Route exact path="/cards">
            <CardList/>
          </Route>
          <Route exact path="/rented-cards">
            <RentedCards/>
          </Route>
          <Route exact path="/pagenotfound">
              Page not found.
          </Route>
          <Route exact path="/">
            <Redirect to="/dashboard"/>
          </Route>
          <Route path=""><Redirect to="/pagenotfound"/></Route>
        </Switch>
        
        
    </div>
  );
}

export default App;
