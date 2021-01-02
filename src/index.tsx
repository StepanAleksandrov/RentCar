import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import { rootReducer } from './store/rootReducer';
import MenuListComposition from './components/MenuList';
import Button from '@material-ui/core/Button';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <header className='header'>
        <Link to='/' className='logo'>
          LOGO_cAR
        </Link>
        <nav>
          <ul className='nav_links'>
            <li>
              <Button color='primary'>
                <Link to='/'>ГЛАВНАЯ</Link>
              </Button>
            </li>
            <li>
              <MenuListComposition></MenuListComposition>
            </li>
          </ul>
        </nav>
        <Link to='/contact'>
          <button>Контакты</button>
        </Link>
      </header>

      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
