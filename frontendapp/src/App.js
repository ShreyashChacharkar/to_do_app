import './App.css';
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { Footer } from "./MyComponents/Footer";
import { AddTodo } from "./MyComponents/AddTodo";
// import { About } from "./MyComponents/About";
import React, { useState, useEffect } from 'react';


function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  
  const addTodo  = async (title, desc) => {
    try {console.log("I am adding this todo", title, desc)
    let sno;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
      status: "Active",
    };
    
    setTodos([...todos, myTodo]);
    const response = await fetch('http://127.0.0.1:8000/api/api/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myTodo),
    });

    if (!response.ok) {
      throw new Error(`Failed to add todo. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Todo added:', data);
    console.log(myTodo);
  } catch (error) {
    console.error('Error adding todo:', error.message);
  }
};

  const onEdit = async (todo, updatedTitle, updatedDesc, updatedStatus) => {
    console.log("I am on edit of todo", todo);
      const updatedTodos = todos.map((t) => t.sno === todo.sno? 
      { ...t, title: updatedTitle, desc: updatedDesc, status: updatedStatus }: t);
    setTodos(updatedTodos);
    console.log("edited", updatedTodos);
    const response = await fetch(`http://127.0.0.1:8000/api/tasks/${todo.id}/`, {
        method: 'PUT',  // Use 'PUT' method for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodos),
      });

      const data = await response.json();
      console.log("data",data);

      // Update the todos state with the edited todo
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todo.id ? data : t))
      );

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  
//   const onDelete = async (todo) => {
//     // Make DELETE request to Django backend
//     await fetch(`http://127.0.0.1:8000/api/todos/${todo.id}/`, {
//         method: 'DELETE',
//     });

//     // Update the local state
//     setTodos(todos.filter((e) => e.id !== todo.id));
// };
  
  const onDelete = async (todo) => {
    console.log("I am ondelete of todo", todo);
    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    console.log("deleted", todos)
    try {
      // Send a DELETE request to the Django API
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/${todo.id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the deletion was successful
      if (response.ok) {
        // Remove the deleted todo from the state
        setTodos((prevTodos) =>
          prevTodos.filter((t) => t.id !== todo.id)
        );
        console.log("sucessful")
      } else {
        console.error('Error deleting todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
    
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  return ( 
    <> 
     <Header title="My To do List" searchBar={false}/>
     <AddTodo addTodo={addTodo}/>
     <Todos todos={todos} onDelete={onDelete} onEdit={onEdit}/>
     <Footer />

    </>
  );
}

export default App;
