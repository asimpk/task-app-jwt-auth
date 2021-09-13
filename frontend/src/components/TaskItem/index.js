// @bekbrace
// FARMSTACK Tutorial - Sunday 13.06.2021
import axios from 'axios'
import React from 'react'

const TaskItem = ({ task, deleteTaskHandler }) => {
    return (
        <div>
            <p>
                <span style={{ fontWeight: 'bold, underline' }}>{task.title} : </span> {task.description} 
                <button onClick={() => deleteTaskHandler(task._id)} className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px',}}>X</button>
                <hr></hr>
            </p>
        </div>
    )
}

export default TaskItem;