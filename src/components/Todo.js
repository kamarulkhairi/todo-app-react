import React, {useState} from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'
import TodoForm from './TodoForm'


function Todo(todos) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })
    //invoking update function and send data to parent component
    // set the new value to null after submission
    const submitUpdate  = value =>{
        todos.updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: ''
        })
    }

    //display todo form if update button have been clicked
    if(edit.id){
        return <TodoForm edit={edit} onSubmit={submitUpdate}/>;
    }
   


    const { title, completed, id } = todos.todos;

    return (
        <div className={completed ? 'todo-row complete' : 'todo-row'} key={id}>

            <div key={id} onClick={() => todos.completedTodo(id)}>
                {title} {id}
            </div>

            <div className="icons">
                <RiCloseCircleLine className='delete-icon' onClick={() => todos.removeTodo(id)}/>
                <TiEdit className='edit-icon' onClick={() => setEdit({id: id, value: title})}/>
            </div>

        </div>
    )



};

export default Todo
