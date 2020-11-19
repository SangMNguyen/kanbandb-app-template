import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import Add from '../assets/add.png';
import './components.css';

const TaskList = ({ title, tasks, id, db, refresh }) => {
    const [isCreating, setCreate] = useState(false);
    const [newTitle, setTitle] = useState("");
    const [newDesc, setDesc] = useState("");

    const addCard = () => {
        db.addCard({
            name: newTitle,
            description: newDesc,
            status: id
        }).catch(() => console.log("Invalid card data"));
        setTitle("");
        setDesc("");
        setCreate(false);
        refresh();
    }

    return (
        <div className={"taskList"}>
            <div className={"header"}>
                <h1>{title}</h1>
                <img src={Add} title={"Add a Card"} alt={"Add"} onClick={() => setCreate(true)}/>
            </div>
            <Droppable droppableId={id}>
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className={"droppable"}>
                        {isCreating && (
                            <TaskCard
                                status={id}
                                id={"newTask"}
                                key={"new" + id}
                                index={203913021}
                                saveFunc={addCard}
                                cancelFunc={() => {
                                    setTitle("");
                                    setDesc("");
                                    setCreate(false);
                                }}
                                createFunc={{
                                    name: e => setTitle(e.target.value),
                                    desc: e => setDesc(e.target.value)
                                }}
                                db={db}
                            />
                        )}
                        {tasks.map((item, index) => 
                            <TaskCard 
                                title={item.name}
                                desc={item.description}
                                status={item.status}
                                id={item.id}
                                key={item.status + index}
                                index={index}
                                refresh={refresh}
                                db={db}
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