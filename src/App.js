import './App.css';
import DishForm from './components/DishForm'


function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <h2>Dishes</h2>
      </header>
      <section>
        <DishForm/>
      </section>
    </div>
  );
}

export default App;
