import { ADD_TODO,
         TOGGLE_TODO, 
         RESET_TODO, 
         DELETE_TODO } from './actionTypes';
import { loadData, saveData } from './localStorage';

export const initState = {
    todo: loadData('tasks') || [],
    completed: loadData('completed') || []
};

const reducer= (state = initState, { type, payload }) => {
    switch (type) {
        case ADD_TODO:
            let data = [ ...state.todo, payload ];
            saveData('tasks', data);
            return {
                ...state,
                todo: [ ...state.todo, payload ]
            };
        case TOGGLE_TODO:
            let toggleItem = state.todo.find((item) => item.id === payload);
            let completedTasks = [];
            if (toggleItem.status === true) {
                completedTasks = state.completed.filter((item) => item.id !== payload);
            } else {
                completedTasks = [ ...state.completed, toggleItem ];
            }
            toggleItem.status = !toggleItem.status;
            let toggleData = state.todo.filter((item) => (item.id === payload ? toggleItem : item));
            saveData('tasks', toggleData);
            saveData('completed', completedTasks);
            return {
                ...state,
                completed: completedTasks,
                todo: state.todo.filter((item) => (item.id === payload ? toggleItem : item))
            };
        case RESET_TODO:
            for (let i = 0; i < state.todo.length; i++) {
                state.todo[i].status = false;
            }
            saveData('tasks', state.todo);
            saveData('completed', []);

            return {
                ...state,
                todo: state.todo,
                completed: []
            };
        case DELETE_TODO:
            let task = state.todo.filter((item) => item.id !== payload);
            saveData('tasks', task);
            let completedData = state.completed.filter((item) => item.id !== payload);
            saveData('completed', completedData);

            return {
                ...state,
                todo: state.todo.filter((item) => item.id !== payload),
                completed: completedData
            };
        default:
            return state;
    }
};


export default reducer