import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BigBrainPage from './pages/BigBrainPage';
import { setMembitKey } from './services/api';

function App() {
  const [membitKey, setMembitKeyState] = useState('');
  const [isKeySet, setIsKeySet] = useState(false);
  const [savedIdeas, setSavedIdeas] = useState([]);

  const handleSaveIdea = (idea) => {
    setSavedIdeas(prev => [...prev, { ...idea, id: Date.now() }]);
  };

  const handleRemoveIdea = (id) => {
    setSavedIdeas(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            membitKey={membitKey}
            setMembitKeyState={setMembitKeyState}
            isKeySet={isKeySet}
            setIsKeySet={setIsKeySet}
            savedIdeas={savedIdeas}
            onRemoveIdea={handleRemoveIdea}
          />
        }
      />
      <Route
        path="/big-brain"
        element={
          <BigBrainPage
            onSave={handleSaveIdea}
          />
        }
      />
    </Routes>
  );
}

export default App;
