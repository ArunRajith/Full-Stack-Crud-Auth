import axios from "axios";

const API_URL = "http://localhost:5000/api/goal"

const createGoal = async (goalData, token) => {
  const config = {
    headers: {    
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL + '/create', { text: goalData }, config)  
  return response.data
}

const getGoal = async (token) => {
  const config = {
    headers: {    
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + '/get', config)  
  return response.data
}

const updateGoal = async (id, text, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const response = await axios.put(`${API_URL}/update/${id}`, { text }, config)
  return response.data  
}

const deleteGoal = async (id, token) => {
  const config = {
    headers: {    
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + "/delete/" +id, config)  
  return response.data
}

const goalService = {
  createGoal,
  getGoal,
  updateGoal,
  deleteGoal
};

export default goalService;