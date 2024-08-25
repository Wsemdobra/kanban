import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrachIcon from "../icons/TrachIcon";
import { Column, Id, Task } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";


interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title:string) => void;
  createTask:(columnId: Id)=> void;
  updateTask:(id:Id,content:string) => void;
  deleteTask: (id:Id) => void;
  tasks: Task[];
  
}


function ColumnContainer(props: Props) {
  const { 
    column, 
    deleteColumn,
    updateColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
  } = props;
  const [editMode,setEditMode] = useState(false);
  const tasksId = useMemo(()=> {
    return tasks.map(task => task.id)
  },[tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled:editMode,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if(isDragging){
    return(
      <div
      ref={setNodeRef}
      style={style}
      className="
      opacity-40
      border-2
      border-yellow-400
    bg-gray-700
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-mb
    flex
    flex-col 
    ">
    </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
    bg-gray-700
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-mb
    flex
    flex-col 
    "
    >
      {/*Column title*/}
      <div
        {...attributes}
        {...listeners}
        onClick={()=>{
          setEditMode(true)
        }}
        className="
         bg-mainBackgroundColor
         textt-md
         h-[60px]
         cursor-grad
         rounded-md
         rounded-b-none
         p-3
         fond-bold
         bg-gray-800
         border-2
         flex
         items-center
         justify-between
        "
      >
        <div className="flex gap-2">
          <div className="
            flex
            justify-center
            items-center
            bg-gray-800
            px-2
            py-1
            text-sm
            rounded-full
            "
          >
            0
          </div>
          {!editMode && column.title}
          {editMode && (
          <input 
          className="bg-gray-700 focus: border-yellow-200 border rounded outline-none px-2 py-1"
          value={column.title}
          onChange={e => updateColumn(column.id, e.target.value)}
          autoFocus 
          onBlur={()=>{
            setEditMode(false);
          }}
          onKeyDown={e =>{
            if(e.key!== "Enter") return;
            setEditMode(false);
          }}
          />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id)
          }}
          className="
      stroke-gray-500
      hover:stroke-red-500
     rounded
     px-1
     py-2
      "
        >
          <TrachIcon />
        </button>
      </div>
      {/*Column task container*/}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksId}>
        {tasks.map((task) => (
          <TaskCard 
          key={task.id} 
          task={task} 
          deleteTask={deleteTask} 
          updateTask={updateTask}
          />
        ))}
        </SortableContext>
      </div>
      {/*Column footer*/}
      <button 
      onClick={()=>{
        createTask(column.id)
      }}
      className="
      flex gap-2
      items-center
      bg-gray-800
      border-2
      rounded-md p-4
      border-x-yellow-100 hover:border-yellow-200
      hover:text-green-500
      active:bg-gray-900
      ">
        <PlusIcon/>
        Add Task
        </button>
    </div>
  )
}
export default ColumnContainer;