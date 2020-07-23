import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Router, Route} from 'react-router';
import HomePage from '../component/HomePage';
import ImageSearchPage from '../component/imageSearch';
import { createBrowserHistory } from 'history'

import '../css/app.css';
const history = createBrowserHistory();
type Props={};
type State={}
class App extends React.Component <Props,State>{
  render(){
    return (
      <div className="App">
        <Router history={history}>
        <Navbar bg="primary" expand="lg" variant="dark" >
            <Navbar.Brand href="/">Image Gallery App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/imagesearch">Image Search</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Route exact path="/" render = {(props)=><HomePage />} />
          <Route path="/imagesearch" exact component={ImageSearchPage} />
          </Router>
      </div>
    );
  }
}

export default App;
