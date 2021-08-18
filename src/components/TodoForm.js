
import React, { useState } from 'react'


function TodoForm(props) {
    const [input, setInput] = useState('')

    //shows the input that has been typed on the input bar
    const handleChange = e => {
        setInput(e.target.value)
    };

    // invoke submit function and send data to parent component
    // clears out input line after submit
    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit({
            
            userId: 10,
            title: input,
            completed: false
        })

        setInput('');
    }
    
    return (
        <div>
            <form className='todo-form' onSubmit={handleSubmit}>
                <input type='text' placeholder='Add a todo'
                    value={input} name='text'
                    className='todo-input'
                    onChange={handleChange}></input>

                <button className='todo-button'>Add Todo</button>
            </form>
            
        </div>
    )
}

export default TodoForm


