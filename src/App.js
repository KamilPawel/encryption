import './App.css';
import EncryptionForm from './components/EncryptionForm';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Message Encyptor - Using XOR Logic Gates</h1>
      </header>
      <EncryptionForm />
      <h6>Enter a number to generate a key, the encrypted message will be displayed in the area above.</h6>
      <h6>To decrypt the message simply paste the encrypted message into the typing area and make sure the keys are the same.</h6>
    </div>
  );
}

export default App;
