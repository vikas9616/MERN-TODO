import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate} from 'react-router-dom'

function Home() {
  const[todos, setTodos] = useState([])
  const[error, setError] = useState(null)
  const[loading, setLoading] = useState(false)
  const[newTodo, setNewTodo] = useState("")
  useEffect(()=>{
    const fetchtodos = async()=>{
      try {
        setLoading(true)
        const response = await axios.get("http://localhost:4001/todo/fetch", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data.todos)
        setTodos(response.data.todos)
        setError(null)
      } catch (error) {
        setError("Failed to fetch todos");
        
      } finally{
        setLoading(false)
      }
    }
    fetchtodos()
  },[])
  const createTodo= async()=>{
    if (!newTodo) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:4001/todo/create", {
        text:newTodo,
        completed:false
      },{
        withCredentials:true
      })
      setTodos([...todos, response.data.newTodo])
      setNewTodo("")
    } catch (error) {
      setError("Failed to create todo")
    }
  }
  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      const response = await axios.put(
        `http://localhost:4001/todo/update/${id}`,
        updatedTodo,
        { withCredentials: true }
      );
      setTodos(
        todos.map((t) => (t._id === id ? response.data.todo : t))
      );
    } catch (error) {
      setError("Failed to update todo status");
    }
  };

  const deleteTodo = async(id)=>{
    try {
      await axios.delete(`http://localhost:4001/todo/delete/${id}`,{
        withCredentials:true
      })
      setTodos(todos.filter((t)=>t._id !== id))
    } catch (error) {
      setError("Error while deleting todo")
    }
  }
const navigateTo = useNavigate();
  const logout = async()=>{
    try {
      await axios.get("http://localhost:4001/user/logout")
      toast.success("User logged out");
      localStorage.removeItem("jwt");
      navigateTo("/login")
    } catch (error) {
      toast.error("Error while logout")
    }
  }

  const reaminingTodo = todos.filter((todo)=>!todo.completed).length


  return (
    <div className='bg-gray-200 mt-4 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6'>
     <h1 className='mt-4 mb-3 text-2xl font-semibold text-center'>MERN-TODO-APP</h1>
     <div className='flex mb-4'>
      <input type="text" 
      onKeyPress={(e)=>e.key==="Enter" && createTodo()}
      value={newTodo}
      onChange={(e)=>setNewTodo(e.target.value)}
      // onChange={(e)=>console.log(e.target.value)}
      placeholder='Add new todo' className='flex-grow p-2 border rounded-l-md  focus:outline-none' />
      <button
      onClick={createTodo}
       className='bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300'>Add</button>
     </div>
     {loading ? (<div className='text-center justify-center'>
      <span className='text-gray-500'>Loading...</span></div>) : error? (<div className='text-red-600 text-center font-semibold'>{error}</div>) : (

     <ul className='space-y-2'>
      {todos.map((todo,index)=>(
         <li key={todo._id || index} className='flex items-center justify-between p-3 bg-gray-100 rounded-md'>
        <div className='flex items-center'>
          <input type="checkbox" 
          checked={todo.completed} 
          onChange={()=>todoStatus(todo._id)} 
          className='mr-2'/>
          <span className={`${todo.completed ? "line-through text-gray-800 font-semibold":""} `}>{todo.text}</span>
        </div>
        <button
        onClick={()=>deleteTodo(todo._id)}
         className='text-red-500 hover:text-red-900 duration-300'>Delete</button>
      </li>
      ))}
     </ul>
     )}
     <p className='mt-4 text-sm text-center text-gray-700'>{reaminingTodo} reamining todos</p>
     <button 
     onClick={logout}
     className='bg-red-500 text-white px-4 py-2 font-semibold hover:bg-red-800 duration-300 text-center rounded-md mx-auto block mt-6'>Logout</button>
    </div>
  )
}

export default Home