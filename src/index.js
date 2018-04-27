import React from 'react';
import ReactDOM from 'react-dom';
import Users from './components/users';
import Lists from './components/lists';
import ListForm from './components/list_form';
import Home from './components/home';
import About from './components/about';
import TopNav from './components/top_nav';
import Footer from './components/footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <TopNav />
      <Switch>
        <Route path="/users/:id/lists/create" component={ListForm} />
        <Route path="/users/:id/lists/:pid" component={ListForm} />
        <Route path="/users/:id/lists" component={Lists} />
        <Route path="/users" component={Users} />
        <Route path="/about" component={About} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
