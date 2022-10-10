import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import Home from './components/Home';
import Layout from './components/Layout';
import Slideshow from './components/Slideshow';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="auto" element={<Slideshow />} />
          </Route>
        </Routes>
      </Router>
    );
  }
}

export default App;
