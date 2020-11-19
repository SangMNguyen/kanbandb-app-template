import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Edit from '../assets/edit.png';
import Delete from '../assets/x.png';

const TaskCard = ({title, desc, status, id, index, saveFunc, cancelFunc, db, refresh, createFunc}) => {
    const [editMode, setEditing] = useState(!!saveFunc);
    const [currentTitle, editTitle] = useState(title);
    const [currentDesc, editDesc] = useState(desc);

    const updateCard = () => {
        db.updateCardById(id, {
            name: currentTitle,
            description: currentDesc,
        });
        setEditing(false);
        refresh();
    }

    const deleteCard = () => {
        db.deleteCardById(id);
        refresh();
    }

    return (
        <Draggable
            key={status + id}
            draggableId={id}
            index={index}
            isDragDisabled={editMode}
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
                        {editMode ? 
                            <input type={"text"} value={currentTitle} onChange={
                                createFunc ? createFunc.name :
                                e => editTitle(e.target.value)}/> :
                            <>
                                <h1>{currentTitle}</h1>
                                <span>
                                    <img className={"edit"} src={Edit} title={"Edit Card"} alt={"Edit"} onClick={() => setEditing(true)}/>
                                    <img className={"delete"} src={Delete} title={"Delete Card"} alt={"Delete"} onClick={deleteCard}/>
                                </span>
                            </>
                        }
                    </div>
                    <div className={"desc"}>
                        {editMode ? 
                            <textarea value={currentDesc} onChange={
                                createFunc ? createFunc.desc :
                                e => editDesc(e.target.value)
                            }/> :
                            <>{currentDesc}</>
                        }
                    </div>
                    {editMode && <div className={"editButtons"}>
                        <button className={"cancel"} onClick={cancelFunc ? cancelFunc : () => setEditing(false)}>Cancel</button>
                        <button className={"save"} onClick={saveFunc ? saveFunc : updateCard}>Save</button>
                    </div>}
                </div>
            }
        </Draggable>
    )
}
export default TaskCard;