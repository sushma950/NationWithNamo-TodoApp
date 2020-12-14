import { ADD_TODO, 
         TOGGLE_TODO,
         RESET_TODO, 
         DELETE_TODO } from './actionTypes';
import { v4 as uuid } from 'uuid';
//Add items to the todo list
export const addTodo = (payload) => ({
    type: ADD_TODO,
    payload: {
        id: uuid(),
        title: payload,
        status: false
    }
});
//After the status is tooggled pending tasks will go under completed tasks
export const toggleTodo = (payload) => {
    //console.log(payload);
    return {
        type: TOGGLE_TODO,
        payload
    };
};
//After clicking on reset button all completed tasks come to initial state
export const resetTodo = () => {
    return {
        type: RESET_TODO
    };
};
//After clicking on delete icon individual to do item is removed from list
export const deleteTodo = (payload) => ({
    type: DELETE_TODO,
    payload
});
