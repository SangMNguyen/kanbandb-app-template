import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Edit from '../assets/edit.png';
import Delete from '../assets/x.png';

const TaskCard = ({title, desc, status, id, index}) => {
    return (
        <Draggable
            key={status + id}
            draggableId={status + id}
            index={index}
        >
            {(provided, snapshot) => 
                <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    {...snapshot.isDragging}
                    className={"task"}
                >
                    <div className={"header"}>
                        <h1>{title}</h1>
                        <span>
                            <img className={"edit"} src={Edit} title={"Edit Card"} alt={"Edit"}/>
                            <img className={"delete"} src={Delete} title={"Delete Card"} alt={"Delete"}/>
                        </span>
                    </div>
                    <div className={"desc"}>{desc}</div>
                </div>
            }
        </Draggable>
    )
}
export default TaskCard;