import React, { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import axios from 'axios'
import Todo from './Todo'


function TodoList() {

    const [todos, setTodos] = useState([])

    // checks if there is unnesecary spaces 
    // if there are spaces, then return nothing
    // if there are no spaces, post the value that is inputed and fetch get method to refresh state
    const addTodo = todo => {
        if (!todo.title || /^\s*$/.test(todo.text)) {
            console.log(todo.title)
            return
        }
       
        axios.post(`https://jsonplaceholder.typicode.com/todos?userId=10`, 
            {
                completed: false,
                title: todo.title
            }
        ).then(() => {
            axios.get('https://jsonplaceholder.typicode.com/todos?userId=10').then((res) => {
                const responseTodo = res.data;
                setTodos(responseTodo);
            });
        });
        
    }

    // check for unnessecarry spaces and if there is none, update the todo list based on their id number and fetch get api to refresh state
    const updateTodo = (todoid, newValue) => {
        if (!newValue || /^\s*$/.test(newValue)) {
            console.log(newValue)
            return
        }

        axios.patch(`https://jsonplaceholder.typicode.com/todos/${todoid}`,
            {
                title: newValue.title
            }
        ).then(() => {
            axios.get('https://jsonplaceholder.typicode.com/todos?userId=10').then((res) => {
                const responseTodo = res.data;
                setTodos(responseTodo);
            });
        });

    }
    
    // change to todolist from not completed to completed
    const completedTodo = id => {
        axios({
            method: 'patch',
            url: `https://jsonplaceholder.typicode.com/todos/${id}`,
            data: {
                completed: true
            }
        }).then(() => {
            axios.get('https://jsonplaceholder.typicode.com/todos?userId=10').then((res) => {
                const responseTodo = res.data;
                setTodos(responseTodo);
            });
        });
    }


    // removes todo list based on their id and refresh state
    const removeTodo = id =>{
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`
        ).then(() => {
            axios.get('https://jsonplaceholder.typicode.com/todos?userId=10').then((res) => {
                const responseTodo = res.data;
                setTodos(responseTodo);
            });
        });
    }


    // fetch data from rest api for the first time
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos?userId=10').then((res) =>{
            const responseTodo = res.data;
            setTodos(responseTodo);
        });
        
    }, []);
    console.log(todos);


    return (
        <div className='todo-app'>
            <h1>What to do today?</h1>
            <TodoForm onSubmit={addTodo} />
            {todos.map((todo) => {
                return (
                    <Todo todos={todo} completedTodo={completedTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
                )
            })}
        </div>
    )
}

export default TodoList
