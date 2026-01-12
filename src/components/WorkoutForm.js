import React, { useState } from 'react';
import './WorkoutForm.css';

function WorkoutForm({ onSaveSession, exercises }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessionWorkouts, setSessionWorkouts] = useState([]);
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

  const handleAddExercise = (e) => {
    e.preventDefault();
    if (!exerciseName.trim()) return;

    const workout = {
      id: Date.now(),
      exerciseName,
      sets: sets.filter(set => set.reps && set.weight),
    };

    if (workout.sets.length === 0) {
      alert('少なくとも1セットの情報を入力してください');
      return;
    }

    setSessionWorkouts([...sessionWorkouts, workout]);
    setExerciseName('');
    setSets([{ reps: '', weight: '' }]);
  };

  const handleRemoveExercise = (id) => {
    setSessionWorkouts(sessionWorkouts.filter(w => w.id !== id));
  };

  const handleCompleteSession = () => {
    if (sessionWorkouts.length === 0) {
      alert('種目を追加してください');
      return;
    }

    const workoutsWithDate = sessionWorkouts.map(workout => ({
      ...workout,
      date,
      timestamp: new Date().toISOString(),
    }));

    onSaveSession(workoutsWithDate);
    setSessionWorkouts([]);
    alert('トレーニングを記録しました！');
  };

  const calculateTotalVolume = (workout) => {
    return workout.sets.reduce((sum, set) => sum + (parseFloat(set.weight) * parseFloat(set.reps)), 0);
  };

  return (
    <div className="workout-form">
      <h2>今日のトレーニング</h2>

      <div className="form-group">
        <label>日付:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      {sessionWorkouts.length > 0 && (
        <div className="session-list">
          <h3>今日の記録</h3>
          {sessionWorkouts.map((workout) => (
            <div key={workout.id} className="session-item">
              <div className="session-header">
                <h4>{workout.exerciseName}</h4>
                <button
                  type="button"
                  onClick={() => handleRemoveExercise(workout.id)}
                  className="btn-remove"
                >
                  削除
                </button>
              </div>
              <div className="session-sets">
                {workout.sets.map((set, index) => (
                  <div key={index} className="set-info">
                    <span>セット {index + 1}: {set.reps}回 × {set.weight}kg</span>
                  </div>
                ))}
              </div>
              <div className="session-total">
                総重量: {calculateTotalVolume(workout).toFixed(1)}kg
              </div>
            </div>
          ))}
          <button onClick={handleCompleteSession} className="btn-complete-session">
            トレーニング完了
          </button>
        </div>
      )}

      <div className="add-exercise-section">
        <h3>種目を追加</h3>
        <form onSubmit={handleAddExercise}>
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
                  <button type="button" onClick={() => handleRemoveSet(index)} className="btn-remove-small">
                    削除
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddSet} className="btn-add-set">
              + セットを追加
            </button>
          </div>

          <button type="submit" className="btn-submit">種目を追加</button>
        </form>
      </div>
    </div>
  );
}

export default WorkoutForm;
