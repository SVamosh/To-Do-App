
import { useState, useEffect } from "react";
import { Note, CompletedTask } from "../services/interfaces";
import { formatDate } from "../utils/date";
import { generateId } from "../utils/id";

export const useTasks = () => {
    const [list, setList] = useState<Note[]>(() => JSON.parse(localStorage.getItem("tasks") ?? "[]"));
    const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>(() => JSON.parse(localStorage.getItem("completedHistory") ?? "[]"));

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(list));
    }, [list]);

    useEffect(() => {
        localStorage.setItem("completedHistory", JSON.stringify(completedTasks));
    }, [completedTasks]);

    const addTask = (text: string): boolean => {
        if (text.trim().length === 0) {
            return false;
        }

        setList(prev => [
            ...prev,
            {id: generateId(), isEdit: false, text: text.trim(), date: formatDate()}
        ]);

        return true;
    };

    const deleteTask = (id: string) => {
        setList(prev => prev.filter(item => item.id !== id));
    };

    const editStart = (id: string) => {
        setList(prev =>
            prev.map(item => item.id === id ? {...item, isEdit: true}: item)
        );
    };

    const editEnd = (id: string) => {
        setList(prev =>
            prev.map(item => item.id === id ? {...item, isEdit: false}: item)
        );
    };

    const editSave = (id: string, text: string) => {
        setList(prev =>
            prev.map(item => item.id === id ? {...item, text} : item)    
        );
    };

    const moveToCompleted = (id: string) => {
        setCompletedTasks(prev => {
            const task = list.find(item => item.id === id);
            if (!task) return prev;
            return [
                ...prev,
                {id: generateId(), text: task.text, date: formatDate()}
            ];
        });
        setList(prev => prev.filter(item => item.id !== id));
    };

    const clearCompletedList = () => {
        setCompletedTasks([]);
    };

    return {
        list,
        completedTasks,
        addTask,
        deleteTask,
        editStart,
        editEnd,
        editSave,
        moveToCompleted,
        clearCompletedList
    };
};