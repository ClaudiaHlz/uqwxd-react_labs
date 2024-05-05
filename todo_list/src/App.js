import React, { useState, useEffect } from "react";
import "./App.css";



const App = () => {
  //useState ... hook to be able to define a state in this function
  //todos is the state, which maintains a list of all todo tasks
  //setTodos is a function that sets the value of the state
  const [todos, setTodos] = useState([{
    id: new Date().getTime(), //one entry as default value
    text: "Laundry",
    completed: false
  }]); 

  //Effects
  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos){
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    if(todos.length > 0){
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);
    }
  }, [todos]);


  // Add the handlesubmit code here
  function handlesubmit(e){
    e.preventDefault();
  
    //get the input-object "todoAdd" from the DOM
    let todo = document.getElementById("todoAdd").value 
    // create the new todo with the input
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false
    };
  
    //check whether the user actually inserted a text
    if(newTodo.text.length > 0){
      setTodos([...todos].concat(newTodo));
    }else{
      alert("Please Enter a Task");
    }
  
    //reset the input field
    document.getElementById("todoAdd").value = ""
  }

  // Add the deleteToDo code here
  function deleteToDo(id){
    //filter the todo list for the given id and update the todos state
    let updatedTodos = [...todos].filter((todo) => todo.id !== id); 
    // set the new todos
    setTodos(updatedTodos);
  }

  // Add the toggleComplete code here
  function toggleComplete(id){
    //toggle the "completed" object in the todo item
    let updatedTodos = [...todos].map((todo) =>{
      if (todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos)
  }


  // Add the submitEdits code here
  const [todoEditing, setTodoEditing] = useState(null);
  function submitEdits(newtodo) {
    // search for the object with the correct id
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newtodo.id){
        // update the text of the todo object with the current input value
        todo.text = document.getElementById(newtodo.id).value;
      }
      // save the new value to the updatedTodos
      return todo;
    });
    setTodos(updatedTodos);

    //reset the items that have the TodoEditing activated
    setTodoEditing(null)
  }


  return (
    <div id="todo-list">
      <h1>Todo List</h1>
        <form onSubmit={handlesubmit}>
          <input type="text" id="todoAdd" placeholder="Add a todo"/>
          <button type="submit">Add Todo</button>
        </form>
        {todos.map((todo) =>
        <div className="todo" key={todo.id}>
          <div className="todo-text">
            {/*checkbox for toggling the task */}
            <input type="checkbox" id="completed" 
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
            />
            {/**edit mode */}
            {todo.id === todoEditing?
              (<input type="text" id={todo.id} defaultValue={todo.text}/>) 
              :
              (<div>{todo.text}</div>)
            }
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? 
              (<button onClick={() => submitEdits(todo)}>Submit Edits</button>):
              (<button onClick={() => setTodoEditing(todo.id)}>Edit</button>)
            }
            <button onClick={() => deleteToDo(todo.id)}>Delete</button>
          </div>
          
        </div>
      )}
    </div>
  );
};
export default App;
