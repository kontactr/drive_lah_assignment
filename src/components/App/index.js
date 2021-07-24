import { inject , observer } from 'mobx-react'
import './App.css';


function App(props) {
    const { sessionStore } = props;
    const { counter, addCounter } = sessionStore;
  return (
    <div>
    <div className="App">
        {counter}
    </div>
    <button onClick={addCounter}> Add Counter </button>
    </div>
  );
}

export default inject('sessionStore')(observer(App));
