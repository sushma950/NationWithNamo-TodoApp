import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTodo, deleteTodo } from '../redux/actionCreators';
import TodoItem from './TodoItem';

export default function Todolist({ filterBy }) {
    const { todo } = useSelector((state) => state.app);
    const { completed } = useSelector((state) => state.app);
    const dispatch = useDispatch();

    var todoTasks = [];
    var completedTasks = [];

    if (filterBy === 'hash') {
        todoTasks = todo.filter((todoitem) => todoitem.title[0] === '#');
        completedTasks = completed.filter((todoitem) => todoitem.title[0] === '#');
    }

     else {
        todoTasks = todo;
        completedTasks = completed;
    }

   
    const handleToggle = (id) => {
        dispatch(toggleTodo(id));
    };

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };
    
    return (
        <div style={{ padding: '30px', alignItems: 'center', paddingLeft: '20%' }}>
            <div style={{ backgroundColor: 'white', padding: '30px' }}>
                <h1 style={{color:"red"}}>Pending Tasks:</h1>
                {todoTasks.map(
                    (todoitem) =>
                        todoitem.title[0] === '#' && todoitem.status === false ? (
                            <TodoItem 
                            handleDelete={handleDelete}
                            handleToggle={handleToggle} todoitem={todoitem}
                               key={todoitem.id}/>
                        ) : todoitem.status === false ? (
                            <TodoItem handleDelete={handleDelete}
                                handleToggle={handleToggle} todoitem={todoitem}
                                key={todoitem.id}/>
                        ) : null
                )}
            </div>
            <div style={{ backgroundColor: 'white', padding: '30px', marginTop: '20px' }}>
                <h1 style={{color:"green"}}>Completed Tasks:</h1>
                {completedTasks.sort((a,b)=>(a.id-b.id)).map(
                    (todoitem) =>
                        todoitem.status === true ? (
                            <TodoItem 
                                
                                handleDelete={handleDelete}
                                handleToggle={handleToggle}
                                todoitem={todoitem}
                                key={todoitem.id}
                            />
                        ) : null
                )}
            </div>
        </div>
    );
}