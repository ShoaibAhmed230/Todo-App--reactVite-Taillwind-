import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid'; // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
// import { RiPlayListAddFill } from "react-icons/ri";



function App() {


  const [todo, setTodo] = useState(""); // for iput todo
  const [todos, setTodos] = useState([]); // for  todos list
  const [showFinished, setShowFinished] = useState(true)



useEffect(() => {
  let  todoString = localStorage.getItem("todos");
  if(todoString) {
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }
}, [])



// for SAVE todos in local storage

  const saveTodoList = (params) => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

//when todo is complete show FINISHED

const toggledFinished = (e) => {
  setShowFinished(!showFinished)
}






// for EDIT  todos 

  const handleEdit = (e, id) => {
    let  t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
     let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newTodos)
    saveTodoList()
  }



// for DELETE todos

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newTodos)
    saveTodoList()

  }  


// for ADD todos

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("");
    console.log(todos);
    saveTodoList()
    
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }


// for CHECK UN-CHECK todos

  const handleCheckbox = (e) => {
    let id= e.target.name;
    let index =todos.findIndex(item=>{
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveTodoList()
  }



  return (
    <>
      <Navbar />
      <div className="max-w-[90%]  mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center ">
          <div className="addTodo my-5">
            <h2 className='text-lg font-bold py-4'>Add a Todo</h2>
            <div className="flex justify-between flex-wrap">
            <div className="md:w-5/6 w-full ">
              <input onChange={handleChange} value={todo} type="text" name="" id="" className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' />
            </div>
            <div className="md:w-1/6 w-full ">
              <button onClick={handleAdd} disabled={todo.length<3} className=' bg-violet-800 hover:bg-violet-950 px-3 py-2 text-white rounded-md  font-bold disabled:bg-violet-400 disabled:cursor-not-allowed flex justify-center items-center w-full md:mt-0 md:ml-3 mt-3'>Save</button>
            </div>
          </div>
          <h2 className='text-lg font-bold my-4'>Your Todos</h2>
          <div className="todos">
            <div className="finis-wrapper text-start">
              <input onChange={toggledFinished} type="checkbox" checked={showFinished} /> Show Finished
              </div>
            </div>
            {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
            {todos.map(item=>{

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo todo-item-color my-4 p-2 flex justify-between rounded-lg  flex items-center">
              <input onChange={handleCheckbox} type="checkbox" name={item.id} checked={todo} className=''/>
              <div className={item.isCompleted?"line-through" : ""}>{item.todo}</div>
              <div className="buttons flex">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-2 font-bold flex justify-center items-center'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-2 font-bold flex justify-center items-center'><RiDeleteBinFill /></button>
              </div>
            </div>

            })}
          </div>
        </div>
      </div>




    </>
  )
}

export default App
