import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoals, updateGoals } from '../features/goals/goalSlice'

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(goal.text)

  const handleUpdate = () => {
    dispatch(updateGoals({ id: goal._id, text }))
    setIsEditing(false)
  }

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>

      {isEditing ? (
        <>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{goal.text}</h3>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}

      <button onClick={() => dispatch(deleteGoals(goal._id))}>X</button>
    </div>
  )
}

export default GoalItem
