export function Todos({todos}){
    return <div>
        {todos.map((todo)=>{
            return <div>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <button>{todo.completed==true ? "completed" : "Mark as complete"}</button>
            </div>
        })}
    </div>
}