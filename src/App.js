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
  const [templates, setTemplates] = useLocalStorage('templates', []);
  const [activeTab, setActiveTab] = useState('record');

  const handleAddWorkout = (workout) => {
    setWorkouts([...workouts, workout]);

    if (!exercises.includes(workout.exerciseName)) {
      setExercises([...exercises, workout.exerciseName]);
    }
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

  const handleAddTemplate = (template) => {
    setTemplates([...templates, template]);
    alert('テンプレートを保存しました');
  };

  const handleDeleteTemplate = (id) => {
    if (window.confirm('このテンプレートを削除しますか？')) {
      setTemplates(templates.filter(t => t.id !== id));
    }
  };

  const handleExportData = () => {
    const data = {
      workouts,
      exercises,
      templates,
      exportedAt: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `workout-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (window.confirm('データをインポートしますか？既存のデータは上書きされます。')) {
          if (data.workouts) setWorkouts(data.workouts);
          if (data.exercises) setExercises(data.exercises);
          if (data.templates) setTemplates(data.templates);
          alert('データをインポートしました');
        }
      } catch (error) {
        alert('データの読み込みに失敗しました');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
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
          className={activeTab === 'templates' ? 'active' : ''}
          onClick={() => setActiveTab('templates')}
        >
          テンプレート
        </button>
      </nav>

      <main className="App-main">
        {activeTab === 'record' && (
          <WorkoutForm
            onAddWorkout={handleAddWorkout}
            exercises={exercises}
            templates={templates}
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

        {activeTab === 'templates' && (
          <TemplateManager
            templates={templates}
            onAddTemplate={handleAddTemplate}
            onDeleteTemplate={handleDeleteTemplate}
            workouts={workouts}
            exercises={exercises}
          />
        )}
      </main>

      <footer className="App-footer">
        <div className="data-management">
          <button onClick={handleExportData} className="btn-export">
            データをエクスポート
          </button>
          <label className="btn-import">
            データをインポート
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <p className="footer-text">
          データはブラウザのLocalStorageに保存されます
        </p>
      </footer>
    </div>
  );
}

export default App;
