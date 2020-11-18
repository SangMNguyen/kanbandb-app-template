import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import Add from '../assets/add.png';
import './components.css';

const TaskList = ({ title, tasks, id }) => {
    return (
        <div className={"taskList"}>
            <div className={"header"}>
                <h1>{title}</h1>
                <img src={Add} title={"Add a Card"} alt={"Add"}/>
            </div>
            <Droppable droppableId={id}>
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className={"droppable"}>
                        {tasks.map((item, index) => 
                            <TaskCard 
                                title={item.title}
                                desc={item.desc}
                                status={item.status}
                                id={"task" + item.id}
                                key={item.status + index}
                                index={index}
                            />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
export default TaskList;