import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedTodos, setPaginatedTodos] = useState([]);

  let pageSize = 10;
  let pagesNumbers;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((datas) => {
        setTodos(datas);
        let lastIndex = pageSize * currentPage;
        let startIndex = lastIndex - pageSize;
        let allShownTodos = datas.slice(startIndex, lastIndex);
        setPaginatedTodos(allShownTodos);
      });
  }, []);

  useEffect(() => {
    let lastIndex = pageSize * currentPage;
    let startIndex = lastIndex - pageSize;
    let allShownTodos = todos.slice(startIndex, lastIndex);
    setPaginatedTodos(allShownTodos);
  }, [currentPage]);

  const pageCount = Math.ceil(todos.length / pageSize);
  pagesNumbers = Array.from(Array(pageCount).keys());

  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {!todos ? (
        "Loading"
      ) : (
        <table className="table">
          <thead>
            <tr key={todos.id}>
              <th>ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedTodos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.userId}</td>
                <td>{todo.title}</td>
                <td className={todo.completed ? "text-success" : "text-danger"}>
                  {todo.completed ? "Completed" : "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pagesNumbers.map((page) => (
            <li
              style={{ cursor: "pointer" }}
              className={
                page + 1 === currentPage ? "page-item active" : "page-item"
              }
              aria-current="page"
              key={page + 1}
              onClick={() => changePage(page + 1)}
            >
              <span className="page-link">{page + 1}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default App;
