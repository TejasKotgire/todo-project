
export function CreateTodo(){
    return <div>
        <input id="title" style={{padding: 10, margin: 10}} type="text" placeholder="title" /> <br />
        <input id="des" style={{padding: 10, margin: 10}} type="text"placeholder="description"/><br />
        <button style={{padding: 5, margin: 10}} onClick={()=>{
            fetch("http://localhost:3000/todo", {
                method : "POST",
                body : JSON.stringify({
                    title : document.getElementById("title").value,
                    description : document.getElementById("des").value
                }),
                headers : {
                    "content-type" :"application/json"
                }
            })
                .then(async (res)=>{
                    const json = await res.json();
                    alert("Todo added");
                })
        }} >Add a Todo</button>
    </div>
}