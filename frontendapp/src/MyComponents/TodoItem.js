import React, { useState } from 'react';

export const TodoItem = ({ todo, onDelete, onEdit }) => {
  const [title, setTitle] = useState(todo.title);
  const [desc, setDesc] = useState(todo.desc);
  const [status, setStatus] = useState("Active")

  const update = () => {
    onEdit(todo, title, desc, status);
  };

  return (
    <>
      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#panel-${todo.sno}`}
              aria-expanded="true"
              aria-controls={`panel-${todo.sno}`}
              data-bs-parent="#accordionPanelsStayOpenExample"
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Completed"
                  id={`flexCheck-${todo.sno}`}
                  onChange={(e) => setStatus(e.target.checked ? "Completed" : "Active")}
                  checked={status === "Completed"}
                />
                <label className="form-check-label" htmlFor={`flexCheck-${todo.sno}`}>
                  {status === "Completed" ? (
                    <del>{todo.title}</del>
                  ) : (
                    todo.title
                  )}
                </label>
              </div>
            </button>
          </h2>
          <div id={`panel-${todo.sno}`} className="accordion-collapse collapse show">
            <div className="accordion-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Todo Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    id="title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">
                    Todo Description
                  </label>
                  <input
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="form-control"
                    id="desc"
                  />
                </div>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(todo)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-success mx-3"
                  onClick={update}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
