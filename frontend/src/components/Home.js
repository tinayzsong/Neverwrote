/**
 * The Home component contains the bulk of the user interface. Other React
 * components for viewing notes and notebooks are nested beneath the Home
 * component.
 */

const React = require('react');

/* *** TODO: Create and export the Home component from here *** */

const NotebookList = require('./NotebookList');

/**
 * The guts of the home page.
 */
const Home = () => (

  <div className="container-fluid well">
    <div className="home">
      <a href="./"><i className="fa fa-home fa-stack-4x fa-inverse"></i> </a>
      </div>
      <div className="heading">
          <h2>Neverwrote</h2>
        </div>

      <div>
        <NotebookList/>
    </div>
  </div>
);

module.exports = Home;