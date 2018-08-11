import * as React from 'react';
import './App.css';
import { Transport } from './components/transport';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Transport />
      </div>
    );
  }
}

export default App;
