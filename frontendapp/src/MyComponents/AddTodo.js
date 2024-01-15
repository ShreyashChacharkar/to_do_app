import React, { useState } from 'react';

export const AddTodo = ({ addTodo }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("Active")
 

    const submit = (e) => {
        e.preventDefault();
        if (!title || !desc) {
            alert("Title or Description cannot be blank");
        }
        else {
            addTodo(title, desc, status);
            setTitle("");
            setDesc("");
        }
    }
    // const submit = async (e) => {
    //     e.preventDefault();
    //     if (!title || !desc) {
    //         alert("Title or Description cannot be blank");
    //     } else {
    //         const response = await fetch('http://127.0.0.1:8000/api/tasks/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ title, desc, status }),
    //         });
    //         const data = await response.json();
    //         console.log('Todo added:', data);
    //         // Other logic after adding the todo
    //     }
    // };
    return (
        <div className="container-sm my-3">            
            <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Add a Todo
                </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Todo Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Todo Description</label>
                        <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" id="desc" />
                    </div>
                    <button type="submit" className="btn btn-sm btn-success">Add Todo</button>
                </form>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}
