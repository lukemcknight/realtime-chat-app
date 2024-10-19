import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatContainer from './components/ChatContainer';
import LogIn from './LogIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path='/chat-page' element={<ChatContainer />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
