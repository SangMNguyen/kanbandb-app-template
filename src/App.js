import React, { useEffect, useState } from 'react';
import KanbanDB from 'kanbandb/dist/KanbanDB';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskList from './components/TaskList';
import './App.css';

function initialize() {
  /**
   * 
   * Use KanbanDB like so (but you might want to move it) - types are provided:
   * 
   */

  KanbanDB.connect();
  console.log(KanbanDB);
  
}

const MockData = [
  {
    title: "Eat lemons",
    desc: "Eat them carefully. Slice them if necessary. DO NOT PEEL.",
    status: "TODO",
    id: "123123214"
  }, {
    title: "Bake some cookies.",
    desc: "No nuts. Jerry is allergic.",
    status: "IN_PROGRESS",
    id: "123124124"
  }, {
    title: "Teach a class at Purdue.",
    desc: "Try not to get removed from the premises if possible.",
    status: "DONE",
    id: "231042092"
  }, {
    title: "Conquer Rome",
    desc: "Do it legally and tastefully.",
    status: "TODO",
    id: "231290292"
  }
]

const App = () => {
  // Initialize DB communications.
  initialize();
  const [taskStore, updateTasks] = useState({
    TODO: [],
    IN_PROGRESS: [],
    DONE: []
  });

  useEffect(() => {
    let store = MockData.reduce((obj, item) => {
      return {
        ...obj,
        [item['status']]: [...obj[item['status']], item],
      }
    }, {TODO: [], IN_PROGRESS: [], DONE: []});
    updateTasks(store);
  }, []);

  const onDragEnd = result => {
    const { source, destination } = result;
    
    // If draggable is dropped in non-droppable area
    if(!destination) {
      return;
    }
  
    const start = source.droppableId;
    const end = destination.droppableId;
  
    let obj = taskStore;
  
    if(start === end) {
      const arr = Array.from(obj[start]);
      const [removed] = arr.splice(source.index, 1);
      arr.splice(destination.index, 0, removed);
  
      obj = {...obj, [start]: arr};
    } else {
      const fromArr = Array.from(obj[start]);
      const toArr = Array.from(obj[end]);

      const [removed] = fromArr.splice(source.index, 1);
      toArr.splice(destination.index, 0, removed);

      obj = {...obj, [start]: fromArr, [end]: toArr};
    }
    updateTasks(obj);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <TaskList
          title={"To-do"}
          tasks={taskStore.TODO}
          id={"TODO"}
        />
        <TaskList
          title={"In Progress"}
          tasks={taskStore.IN_PROGRESS}
          id={"IN_PROGRESS"}
        />
        <TaskList
          title={"Done"}
          tasks={taskStore.DONE}
          id={"DONE"}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
