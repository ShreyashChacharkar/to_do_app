import React from 'react'
import {TodoItem} from "./TodoItem";


// export const Todos = (props) => {
//     const [todos, setTodos] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch('http://127.0.0.1:8000/api/todos/');
//             const data = await response.json();
//             setTodos(data);
//         };

//         fetchData();

export const Todos = (props) => {
    let myStyle = {
        minHeight: "70vh",
        margin: "40px auto"
    }
    return (
            <div className="container-sm" style={myStyle}>
            <h3 className="my-3">Todos List</h3>
            <div className='scrollable-table my-10'>

            {props.todos.length===0? "No Todos to display":  
            props.todos.map((todo)=>{
                console.log(todo.sno);
                return (
                <TodoItem todo={todo} key={todo.sno} onDelete={props.onDelete} onEdit={props.onEdit}/>   
                )
            })
              } 
            </div>
        </div>
    )
}
