import { Button, Checkbox, Typography } from '@mui/material';
import React, { useState } from 'react'
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpdateTaskForm from './UpdateTaskForm';
import classNames from 'classnames';
import axios from "axios";
import { API_URL } from '../utils';

export default function Task ({task, fetchTasks}) {
  const { id, name, completed } = task;

  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateTask = async () => {
    try {
      await axios.put(API_URL, {
        id, name, completed: !isComplete
      })      
      setIsComplete((prev) => !prev)
    } catch (error) {
      console.log(err);
    }
  }

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${API_URL}/${task.id}`) 
      await fetchTasks();
    } catch (error) {
      console.log(err);
    }
  }

  return (
    <div className="task">
      <div className={classNames("flex", {
        done: isComplete
      })}>
        <Checkbox checked={isComplete} onChange={handleUpdateTask} />
        <Typography variant="h4">{name}</Typography>
      </div>
  
      <div className="taskButtons">
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </Button>

        <Button color="error" variant="contained" onClick={handleDeleteTask}>
          <DeleteIcon />
        </Button>
      </div>

      <UpdateTaskForm 
        fetchTasks={fetchTasks}
        isDialogOpen= {isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        task={task}
      />
    </div>
  )
}
