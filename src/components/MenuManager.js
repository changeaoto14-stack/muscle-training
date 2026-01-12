import React, { useState } from 'react';
import './MenuManager.css';

function MenuManager({ exercises, onAddExercise, onRemoveExercise }) {
  const [newExercise, setNewExercise] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newExercise.trim() && !exercises.includes(newExercise.trim())) {
      onAddExercise(newExercise.trim());
      setNewExercise('');
      setShowForm(false);
    }
  };

  const defaultExercises = [
    'ベンチプレス', 'スクワット', 'デッドリフト',
    'ショルダープレス', 'ラットプルダウン', 'バーベルカール',
    'トライセプスエクステンション', 'レッグプレス', 'レッグカール',
    'レッグエクステンション', 'ダンベルフライ', 'インクラインベンチプレス',
    'ダンベルロウ', 'フロントスクワット', 'ルーマニアンデッドリフト'
  ];

  const handleAddDefaultExercise = (exercise) => {
    if (!exercises.includes(exercise)) {
      onAddExercise(exercise);
    }
  };

  return (
    <div className="menu-manager">
      <h2>カスタムメニュー管理</h2>

      <div className="menu-section">
        <h3>登録済みの種目</h3>
        {exercises.length === 0 ? (
          <p className="no-data">種目がまだ登録されていません</p>
        ) : (
          <div className="exercise-list">
            {exercises.map((exercise, index) => (
              <div key={index} className="exercise-item">
                <span>{exercise}</span>
                <button
                  onClick={() => onRemoveExercise(exercise)}
                  className="btn-remove-exercise"
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="menu-section">
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-toggle-form"
        >
          {showForm ? '閉じる' : '+ 新しい種目を追加'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="add-exercise-form">
            <input
              type="text"
              value={newExercise}
              onChange={(e) => setNewExercise(e.target.value)}
              placeholder="種目名を入力"
              className="exercise-input"
            />
            <button type="submit" className="btn-add-exercise">
              追加
            </button>
          </form>
        )}
      </div>

      <div className="menu-section">
        <h3>おすすめの種目</h3>
        <p className="section-description">よく使われる種目から選んで追加できます</p>
        <div className="default-exercises">
          {defaultExercises
            .filter(exercise => !exercises.includes(exercise))
            .map((exercise, index) => (
              <button
                key={index}
                onClick={() => handleAddDefaultExercise(exercise)}
                className="btn-default-exercise"
              >
                + {exercise}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MenuManager;
