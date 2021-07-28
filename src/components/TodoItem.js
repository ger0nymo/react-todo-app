import React from 'react';
import '../style.css';

function TodoItem(props) {
    return (
        <div className={'todo prio-' + props.task.priority}>
            <input
                type='checkbox'
                className='todo-checkbox'
                checked={props.task.completed}
                onChange={() => props.handleChange(props.task.id)}
            />
            <p className={props.task.completed && 'todo-done'}>{props.task.text}</p>
            <div className='todo-buttons'>
                <button onClick={props.editFunction}>
                    <i className='fa fa-edit'></i>
                </button>
                <button onClick={props.removeTask}>
                    <i className='fa fa-remove'></i>
                </button>
            </div>
        </div>
    );
}

export default TodoItem;
