import React from 'react';
import '../App.css';
import Navbar from './NavBar'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import Practice from './Practice'
import SinglePost from './SinglePost';
import PostFromRedux from './PostFromRedux';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <section className="section">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/practice" component={Practice} />
          <Route path="/postFromReducer" component={PostFromRedux} />
          <Route path="/:post_id" component={SinglePost} />
        </Switch>
      </section>
    </BrowserRouter>
  );
}

export default App;
