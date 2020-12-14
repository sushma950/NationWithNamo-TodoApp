import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTodo, resetTodo } from '../redux/actionCreators';
import { TextField, Grid, Button } from '@material-ui/core';
import { loadData, saveData } from '../redux/localStorage';

import TodoList from './TodoList';

export default function Todo() {
    
    const dispatch = useDispatch();
    const [ todo, setTodo ] = useState('');
    let filter = loadData('filterBy') || 'all';
    const [ filterBy, setfilter ] = useState(filter);
    const handleTodo = (e) => {
        e.preventDefault();
        dispatch(addTodo(todo));
        setTodo('');
    };
    const handleReset = (e) => {
        e.preventDefault();
        dispatch(resetTodo('reset'));
    };
    const handleAll = () => {
        setfilter('all');
        saveData('filterBy', 'all');
    };
    const handleHash = () => {
        setfilter('hash');
        saveData('filterBy', 'hash');
    };
    const handleKey = (e) => {
        e.preventDefault();
        switch (e.keyCode) {
            case 13: {
                // onEnter
                handleTodo(e);
                break;
            }
            default: {
                return;
            }
        }
    };
    return (
        <Grid container item lg={12}>
            <Grid item lg={6} >
                <Grid style={{margin:"10%"}}>
                    <Grid>
                        <TextField
                            id="standard"
                            label="add tasks"
                            variant="standard"
                            type="text"
                            placeholder="add tasks"
                            value={todo}
                            onKeyUp={(e) => handleKey(e)}
                            onChange={(e) => setTodo(e.target.value)}
                        />

                        <Button variant="contained" style={{padding:"5px",marginRight:"5px"}}
                            color="primary" onClick={(e) => handleTodo(e)}
                        > + </Button>
                    </Grid>
                    <Grid>
                    <Button variant="contained" color="primary" onClick={(e) => handleAll(e)}
                            style={{ margin: '30px',padding: '10px 20px'}}  >
                            All </Button><br/>
                            <Button variant="contained" color="primary" onClick={(e) => handleHash(e)}
                            style={{ margin: '30px',padding: '10px 20px'}}
  >
                            #
                        </Button><br/>
                        <Button variant="contained" color="primary" onClick={(e) => handleReset(e)}
                            style={{ margin: '30px',padding: '10px 20px'}}> 
                            Reset </Button>
                        
                        
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={6}>
                <TodoList filterBy={filterBy} />
            </Grid>
        </Grid>
    );
}
