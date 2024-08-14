import './App.css';
import Card from './components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){
  return (
    <div className="App">
  < Card imgSrc="https://picsum.photos/200"
   imgAlt="Image"
    title="Card Title"
     description=" Shift Your Mindset: Your beliefs shape your reality. Start believing that you deserve success and happiness. Replace negative self-talk with positive affirmations to change your mindset."
     buttontext="Learn More"
     link="cardPage"/> 
    </div>
  );
}


export default App;
