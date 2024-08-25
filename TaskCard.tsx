import { useState } from "react";
import TrachIcon from "../icons/TrachIcon";
import { Id, Task } from "../types";
import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable";

interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    function toggleEditMode() {
        setEditMode((prev) => !prev);
        setMouseIsOver(false);
    };
    if (isDragging) {
        return <div
            ref={setNodeRef}
            style={style}
            className="opacity-50 bg-gray-800 p-2 h-[100px] min-h-[100px] items-center flex text-left
            rounded-md hover:ring-2 border-2  hover:ring-amber-200 cursor-grab relative"
        />
    }

    if (editMode) {
        return (
            <div ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="bg-gray-800 p-2 h-[100px] min-h-[100px] items-center flex text-left
                rounded-sm hover:ring-2 hover:ring-amber-200 cursor-grab relative">
                <textarea
                    className="
                    h-[100px]
                    w-full resize-none
                    border-none 
                    rounded bg-transparent
                    text-white focus:outline-none
                    "
                    value={task.content}
                    autoFocus
                    placeholder="Task content here"
                    onBlur={toggleEditMode}
                    onKeyDown={e => {
                        if (e.key === "Enter" && e.shiftKey) {
                            toggleEditMode();
                        }
                    }}
                    onChange={(e) => updateTask(task.id, e.target.value)}
                ></textarea>
            </div>
        )
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={toggleEditMode}
            className="bg-gray-800 p-2 h-[100px] min-h-[100px] items-center flex text-left
    rounded-md hover:ring-2 hover:ring-amber-200 cursor-grab relative task"
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={() => {
                setMouseIsOver(false)
            }}
        >
            <p
                className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap"
            >{task.content}</p>
            {mouseIsOver && (
                <button
                    onClick={() => {
                        deleteTask(task.id);
                    }}
                    className="stroke-gray-500  hover:stroke-red-500 absolute right-1 bottom-2 ">
                    <TrachIcon />
                </button>
            )}
        </div>
    );
}
export default TaskCard;