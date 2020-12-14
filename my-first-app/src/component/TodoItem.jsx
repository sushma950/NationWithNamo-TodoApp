import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid } from '@material-ui/core';

function TodoItem({ handleDelete, handleToggle, todoitem }) {
    const style = todoitem.status
  ? { color: "green", textDecoration: "line-through" }
  : {};
    return (
        <Grid item container lg={12}  key={todoitem.id}>
            <Grid style={style}
            item lg={9} onClick={() => handleToggle(todoitem.id)}>
              <h3>  {todoitem.title}</h3>
            </Grid>
            <Grid item lg={3} onClick={() => handleDelete(todoitem.id)}>
                <DeleteIcon />
            </Grid>
        </Grid>
    );
}

export default TodoItem