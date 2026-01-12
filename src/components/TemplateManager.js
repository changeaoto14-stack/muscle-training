import React, { useState } from 'react';
import './TemplateManager.css';

function TemplateManager({ templates, onAddTemplate, onDeleteTemplate, workouts, exercises }) {
  const [showForm, setShowForm] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState('');
  const [currentSets, setCurrentSets] = useState([{ reps: '', weight: '' }]);

  const handleAddExerciseToTemplate = () => {
    if (!currentExercise.trim()) return;

    const exercise = {
      name: currentExercise,
      sets: currentSets.filter(set => set.reps && set.weight),
    };

    setSelectedExercises([...selectedExercises, exercise]);
    setCurrentExercise('');
    setCurrentSets([{ reps: '', weight: '' }]);
  };

  const handleRemoveExerciseFromTemplate = (index) => {
    setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
  };

  const handleSetChange = (index, field, value) => {
    const newSets = [...currentSets];
    newSets[index][field] = value;
    setCurrentSets(newSets);
  };

  const handleAddSet = () => {
    setCurrentSets([...currentSets, { reps: '', weight: '' }]);
  };

  const handleRemoveSet = (index) => {
    setCurrentSets(currentSets.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!templateName.trim() || selectedExercises.length === 0) {
      alert('テンプレート名と最低1つの種目を追加してください');
      return;
    }

    const template = {
      id: Date.now(),
      name: templateName,
      exercises: selectedExercises,
      createdAt: new Date().toISOString(),
    };

    onAddTemplate(template);
    setTemplateName('');
    setSelectedExercises([]);
    setShowForm(false);
  };

  const handleCreateFromRecent = () => {
    if (workouts.length === 0) {
      alert('記録がありません');
      return;
    }

    const recentDate = workouts[workouts.length - 1].date;
    const recentWorkouts = workouts.filter(w => w.date === recentDate);

    const exercises = recentWorkouts.map(w => ({
      name: w.exerciseName,
      sets: w.sets,
    }));

    setSelectedExercises(exercises);
    setTemplateName(`${recentDate}のメニュー`);
    setShowForm(true);
  };

  return (
    <div className="template-manager">
      <h2>テンプレート管理</h2>

      <div className="template-section">
        <h3>保存済みテンプレート</h3>
        {templates.length === 0 ? (
          <p className="no-data">テンプレートがまだ保存されていません</p>
        ) : (
          <div className="template-list">
            {templates.map((template) => (
              <div key={template.id} className="template-item">
                <div className="template-header">
                  <h4>{template.name}</h4>
                  <button
                    onClick={() => onDeleteTemplate(template.id)}
                    className="btn-delete-template"
                  >
                    削除
                  </button>
                </div>
                <div className="template-exercises">
                  {template.exercises.map((exercise, index) => (
                    <div key={index} className="template-exercise">
                      <strong>{exercise.name}</strong>
                      <div className="template-sets">
                        {exercise.sets.map((set, setIndex) => (
                          <span key={setIndex} className="template-set">
                            {set.reps}回 × {set.weight}kg
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="template-actions">
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-toggle-form"
        >
          {showForm ? '閉じる' : '+ 新しいテンプレートを作成'}
        </button>
        {workouts.length > 0 && (
          <button
            onClick={handleCreateFromRecent}
            className="btn-from-recent"
          >
            最近のトレーニングからテンプレートを作成
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="template-form">
          <div className="form-group">
            <label>テンプレート名:</label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="例: 胸・三頭筋の日"
              required
            />
          </div>

          <div className="form-group">
            <label>種目を追加:</label>
            <input
              type="text"
              list="exercises-list"
              value={currentExercise}
              onChange={(e) => setCurrentExercise(e.target.value)}
              placeholder="種目名"
            />
            <datalist id="exercises-list">
              {exercises.map((exercise, index) => (
                <option key={index} value={exercise} />
              ))}
            </datalist>
          </div>

          <div className="sets-container">
            <label>セット:</label>
            {currentSets.map((set, index) => (
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
                {currentSets.length > 1 && (
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

          <button type="button" onClick={handleAddExerciseToTemplate} className="btn-add-exercise-to-template">
            種目をテンプレートに追加
          </button>

          {selectedExercises.length > 0 && (
            <div className="selected-exercises">
              <h4>テンプレートに追加された種目:</h4>
              {selectedExercises.map((exercise, index) => (
                <div key={index} className="selected-exercise-item">
                  <div className="selected-exercise-header">
                    <strong>{exercise.name}</strong>
                    <button
                      type="button"
                      onClick={() => handleRemoveExerciseFromTemplate(index)}
                      className="btn-remove-small"
                    >
                      削除
                    </button>
                  </div>
                  <div className="selected-exercise-sets">
                    {exercise.sets.map((set, setIndex) => (
                      <span key={setIndex}>
                        {set.reps}回 × {set.weight}kg
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <button type="submit" className="btn-submit-template">
            テンプレートを保存
          </button>
        </form>
      )}
    </div>
  );
}

export default TemplateManager;
