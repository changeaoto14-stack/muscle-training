import React, { useState } from 'react';
import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';
import WorkoutStats from './components/WorkoutStats';
import MenuManager from './components/MenuManager';
import TemplateManager from './components/TemplateManager';

function App() {
  const [workouts, setWorkouts] = useLocalStorage('workouts', []);
  const [exercises, setExercises] = useLocalStorage('exercises', [
    'ベンチプレス', 'スクワット', 'デッドリフト'
  ]);
  const [activeTab, setActiveTab] = useState('record');

  const handleSaveSession = (sessionWorkouts) => {
    setWorkouts([...workouts, ...sessionWorkouts]);

    const newExercises = [...exercises];
    sessionWorkouts.forEach(workout => {
      if (!newExercises.includes(workout.exerciseName)) {
        newExercises.push(workout.exerciseName);
      }
    });
    setExercises(newExercises);
  };

  const handleDeleteWorkout = (id) => {
    if (window.confirm('この記録を削除しますか？')) {
      setWorkouts(workouts.filter(w => w.id !== id));
    }
  };

  const handleAddExercise = (exercise) => {
    setExercises([...exercises, exercise]);
  };

  const handleRemoveExercise = (exercise) => {
    if (window.confirm(`「${exercise}」を削除しますか？`)) {
      setExercises(exercises.filter(e => e !== exercise));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>💪 筋トレ記録アプリ</h1>
        <p>トレーニングを記録して、成長を可視化しよう！</p>
      </header>

      <nav className="App-nav">
        <button
          className={activeTab === 'record' ? 'active' : ''}
          onClick={() => setActiveTab('record')}
        >
          記録
        </button>
        <button
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => setActiveTab('history')}
        >
          履歴
        </button>
        <button
          className={activeTab === 'stats' ? 'active' : ''}
          onClick={() => setActiveTab('stats')}
        >
          統計
        </button>
        <button
          className={activeTab === 'menu' ? 'active' : ''}
          onClick={() => setActiveTab('menu')}
        >
          メニュー管理
        </button>
        <button
          className={activeTab === 'menu-generator' ? 'active' : ''}
          onClick={() => setActiveTab('menu-generator')}
        >
          メニュー作成
        </button>
      </nav>

      <main className="App-main">
        {activeTab === 'record' && (
          <WorkoutForm
            onSaveSession={handleSaveSession}
            exercises={exercises}
          />
        )}

        {activeTab === 'history' && (
          <WorkoutList
            workouts={workouts}
            onDeleteWorkout={handleDeleteWorkout}
          />
        )}

        {activeTab === 'stats' && (
          <WorkoutStats workouts={workouts} />
        )}

        {activeTab === 'menu' && (
          <MenuManager
            exercises={exercises}
            onAddExercise={handleAddExercise}
            onRemoveExercise={handleRemoveExercise}
          />
        )}

        {activeTab === 'menu-generator' && (
          <TemplateManager
            exercises={exercises}
          />
        )}
      </main>

      <footer className="App-footer">
        <p className="footer-text">
          データはブラウザのLocalStorageに保存されます
        </p>
      </footer>
    </div>
  );
}

export default App;
