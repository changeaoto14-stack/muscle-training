import React, { useState } from 'react';
import './WorkoutList.css';

function WorkoutList({ workouts, onDeleteWorkout }) {
  const [filter, setFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredWorkouts = workouts
    .filter(workout => {
      const matchesExercise = !filter || workout.exerciseName.toLowerCase().includes(filter.toLowerCase());
      const matchesDate = !dateFilter || workout.date === dateFilter;
      return matchesExercise && matchesDate;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const groupedWorkouts = filteredWorkouts.reduce((groups, workout) => {
    const date = workout.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(workout);
    return groups;
  }, {});

  return (
    <div className="workout-list">
      <h2>トレーニング履歴</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="種目で絞り込み..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="filter-input"
        />
        {(filter || dateFilter) && (
          <button
            onClick={() => { setFilter(''); setDateFilter(''); }}
            className="btn-clear-filter"
          >
            フィルタをクリア
          </button>
        )}
      </div>

      {filteredWorkouts.length === 0 ? (
        <p className="no-data">記録がありません</p>
      ) : (
        <div className="workout-groups">
          {Object.entries(groupedWorkouts).map(([date, workoutsForDate]) => (
            <div key={date} className="workout-date-group">
              <h3 className="date-header">{date}</h3>
              {workoutsForDate.map(workout => (
                <div key={workout.id} className="workout-item">
                  <div className="workout-header">
                    <h4>{workout.exerciseName}</h4>
                    <button
                      onClick={() => onDeleteWorkout(workout.id)}
                      className="btn-delete"
                    >
                      削除
                    </button>
                  </div>
                  <div className="workout-sets">
                    {workout.sets.map((set, index) => (
                      <div key={index} className="set-info">
                        <span className="set-number">セット {index + 1}:</span>
                        <span className="set-details">{set.reps}回 × {set.weight}kg</span>
                      </div>
                    ))}
                  </div>
                  <div className="workout-total">
                    総重量: {workout.sets.reduce((sum, set) => sum + (parseFloat(set.weight) * parseFloat(set.reps)), 0).toFixed(1)}kg
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkoutList;
