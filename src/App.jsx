import { useState, useEffect } from 'react'
import Navbar from "./components/navbar"
import { MdOutlineDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { v4 as uuidv4 } from 'uuid';
import { MdEdit } from "react-icons/md";
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    savetoLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    savetoLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    savetoLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    savetoLS()
  }



  return (
    <>
      <Navbar />
      <div className="md:container mx-auto my-5 rounded-xl p-3 bg-[#292828] text-white md:w-3/4 min-h-[80vh] border-2 border-black">
        <div className="addTodo flex justify-center flex-col">
          <div>
            <h2 className='text-lg'>Add a TODO</h2>
            <div className='flex'>
              <input onChange={handleChange} value={todo} type="text" className='w-5/6 rounded-full text-2xl' />
              <button onClick={handleAdd} className='bg-slate-500 text-white rounded-md mx-6 text-sm hover:bg-gray-700 font-bold p-2 py-1'><IoIosAddCircle className='w-6 text-xl'/></button>

            </div>
          </div>
        </div>
        <div className='m-6 border-[2px]'><hr></hr></div>
        <h2 className='text-lg font-semibold'>YOUR TODO'S</h2>
        <div className="todos">
          {todos.length === 0 && <div className='font-bold m-10'><i>NO TODOS TO DISPLAY!</i></div>}
          {todos.map((item) => {
            return <div key={item.id} className="todo flex my-3 justify-between">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-slate-500 text-white rounded-md mx-2 text-sm hover:bg-gray-700 font-bold p-2 py-1'><MdEdit className='text-xl'/></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-slate-500 text-white rounded-md mx-2 text-sm hover:bg-gray-700 font-bold p-2 py-1'><MdOutlineDelete className='text-xl'/></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App


