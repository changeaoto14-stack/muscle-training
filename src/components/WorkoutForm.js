import React, { useState } from 'react';
import './WorkoutForm.css';

function WorkoutForm({ onAddWorkout, exercises, templates }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState([{ reps: '', weight: '' }]);

  const handleAddSet = () => {
    setSets([...sets, { reps: '', weight: '' }]);
  };

  const handleRemoveSet = (index) => {
    setSets(sets.filter((_, i) => i !== index));
  };

  const handleSetChange = (index, field, value) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exerciseName.trim()) return;

    const workout = {
      id: Date.now(),
      date,
      exerciseName,
      sets: sets.filter(set => set.reps && set.weight),
      timestamp: new Date().toISOString(),
    };

    onAddWorkout(workout);
    setExerciseName('');
    setSets([{ reps: '', weight: '' }]);
  };

  const handleLoadTemplate = (template) => {
    if (template && template.exercises && template.exercises.length > 0) {
      template.exercises.forEach((exercise, index) => {
        setTimeout(() => {
          const workout = {
            id: Date.now() + index,
            date,
            exerciseName: exercise.name,
            sets: exercise.sets,
            timestamp: new Date().toISOString(),
          };
          onAddWorkout(workout);
        }, index * 10);
      });
      alert(`テンプレート「${template.name}」を読み込みました`);
    }
  };

  return (
    <div className="workout-form">
      <h2>トレーニング記録</h2>

      {templates && templates.length > 0 && (
        <div className="template-selector">
          <label>テンプレートから読み込み:</label>
          <select onChange={(e) => {
            const template = templates.find(t => t.id === parseInt(e.target.value));
            if (template) handleLoadTemplate(template);
            e.target.value = '';
          }}>
            <option value="">テンプレートを選択...</option>
            {templates.map(template => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>日付:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>種目:</label>
          <input
            type="text"
            list="exercises-list"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            placeholder="例: ベンチプレス"
            required
          />
          <datalist id="exercises-list">
            {exercises.map((exercise, index) => (
              <option key={index} value={exercise} />
            ))}
          </datalist>
        </div>

        <div className="sets-container">
          <label>セット:</label>
          {sets.map((set, index) => (
            <div key={index} className="set-row">
              <span>セット {index + 1}:</span>
              <input
                type="number"
                placeholder="回数"
                value={set.reps}
                onChange={(e) => handleSetChange(index, 'reps', e.target.value)}
                min="0"
              />
              <span>回</span>
              <input
                type="number"
                placeholder="重量"
                value={set.weight}
                onChange={(e) => handleSetChange(index, 'weight', e.target.value)}
                min="0"
                step="0.5"
              />
              <span>kg</span>
              {sets.length > 1 && (
                <button type="button" onClick={() => handleRemoveSet(index)} className="btn-remove">
                  削除
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddSet} className="btn-add-set">
            + セットを追加
          </button>
        </div>

        <button type="submit" className="btn-submit">記録を追加</button>
      </form>
    </div>
  );
}

export default WorkoutForm;
