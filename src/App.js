import React, { useEffect, useState } from 'react';
import KanbanDB from 'kanbandb/dist/KanbanDB';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskList from './components/TaskList';
import './App.css';

const lists = [
  {
    title: "To-do",
    id: "TODO"
  }, {
    title: "In Progress",
    id: "DOING"
  }, {
    title: "Done",
    id: "DONE"
  }
]

const App = () => {
  const [taskStore, updateTasks] = useState({
    TODO: [],
    DOING: [],
    DONE: []
  });

  const refresh = () => {
    KanbanDB.getCards().then(res => {
      let store = res.reduce((obj, item) => {
        return {
          ...obj,
          [item['status']]: [...obj[item['status']], item],
        }
      }, {TODO: [], DOING: [], DONE: []});
      updateTasks(store);
    }).catch(e => {
      updateTasks({
        TODO: [],
        DOING: [],
        DONE: []
      });
      console.log(e);
    });
  }

  // Initialize DB communications.
  useEffect(() => {
    KanbanDB.connect();
    refresh();
  }, []);

  const onDragEnd = result => {
    const { source, destination } = result;

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
      KanbanDB.updateCardById(removed.id, {
        status: end
      });
    }
    updateTasks(obj);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        {lists.map(item => 
          <TaskList 
            title={item.title}
            tasks={taskStore[item.id]}
            id={item.id}
            db={KanbanDB}
            refresh={refresh}
          />
        )}
      </div>
    </DragDropContext>
  );
}

export default App;
