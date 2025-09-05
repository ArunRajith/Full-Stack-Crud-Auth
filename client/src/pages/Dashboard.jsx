import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GoalForm } from '../components/GoalForm'
import { getGoal, reset } from '../features/goals/goalSlice'
import { Spinner } from '../components/Spinner'
import GoalItem from '../components/GoalItem'

export const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isError, isLoading, message } = useSelector((state) => state.goals)

  // Fetch goals once on mount if not already loaded
  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    if (goals.length === 0) {
      dispatch(getGoal())
    }
  }, [user, dispatch, goals.length, navigate])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  // Log errors
  useEffect(() => {
    if (isError) console.log(message)
  }, [isError, message])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="dashboard">
      <section className='heading'>
        <h1>Welcome {user?.user?.username}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {goals.length === 0 ? (
          <p>No goals found</p>
        ) : (
          <div className="goals">
            {Array.isArray(goals) && goals.length > 0 ? (
              goals.map((goal) => <GoalItem key={goal._id} goal={goal} />)
            ) : (
              <p>No goals found</p>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
