import TextFields from '@material-ui/core/TextField'
import * as React from 'react';
import './App.css';

export default class App extends React.Component<{}> {
  public render() {
    return (
      <div className="container-fluid">
      <div className="centreText">
        {/* React components must have a wrapper node/element */}
        <p>Is this airline safe?</p>
        <form>
          <label>
            Airline:
            <TextFields type="text" name="name" />
          </label>
          <input type = "submit" value= "Search"/>
        </form>
      </div>
    </div>
    );
  }
}