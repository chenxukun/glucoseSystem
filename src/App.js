import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux';

import Posts from './components/Posts';
import PostForm from './components/PostForm'
import Plot from './components/Plot';
import Footer from './containers/footer';
import ExpanablePannel from './components/ExpanablePannel'
import Patients from './components/Patients';
import Header from './components/Header';
import Test from './components/Test';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      {/* <Plot/> */}
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header
                    mdl-layout--fixed-tabs">
          <Header/>
          <Patients/>
          <main className="mdl-layout__content">
            <section className="mdl-layout__tab-panel is-active" id="fixed-tab-1">
              <div className="page-content">
                <Plot/>
                <ExpanablePannel/>
                <Footer/>
              </div>
            </section>
            <section className="mdl-layout__tab-panel" id="fixed-tab-2">
              <div className="page-content">
                <PostForm/>
                <Posts />
                <Footer/>
              </div>
            </section>
            <section className="mdl-layout__tab-panel" id="fixed-tab-3">
              <div className="page-content"><Test/></div>
            </section>
          </main>
          
        </div>
      </Provider>
    );
  }
}

export default App;