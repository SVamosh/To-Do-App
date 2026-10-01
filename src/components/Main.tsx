
import { useState, useContext } from "react";
import {
    Button,
    List,
    ListItem,
    ListItemText,
    Typography,
    Modal,
    Box,
    TextField,
    FormHelperText
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Clock from "./Clock";
import { ThemeContext } from "../context/ThemeProvider";
import { useTasks } from "../hooks/useTasks";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    border: '2px solid #000',
    p: 4,
    color: '#000',
    maxHeight: '100vh', 
    overflowY: 'auto'
};

const Main = () => {
    const [task, setTask] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const {
        list,
        completedTasks,
        addTask,
        deleteTask,
        editStart,
        editEnd,
        editSave,
        moveToCompleted,
        clearCompletedList,
    } = useTasks();

    const context = useContext(ThemeContext);
    if (!context) throw new Error("ThemeContext должен использоваться внутри ThemeProvider");
    const { theme } = context;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAdd = () => {
        const success = addTask(task);
        if (!success) {
            setError("Нельзя добавить пустую заметку");
            return;
        }
        setTask("");
        setError("");
    };

    const todoList = list.map((item) => (
        <ListItem key={item.id} className="flex flex-col">
            {item.isEdit ? (
                <input 
                    className="border border-primary rounded-lg w-64 text-lg text-black"
                    value={item.text}
                    onChange={(e) => editSave(item.id, e.target.value)}
                    autoFocus
                />
            ) : (
                <ListItemText 
                    primary={item.text}
                    className="self-start"
                    secondary={
                        <Typography style={{ color: '#FF7F50' }}>
                            {item.date}
                        </Typography>
                    }
                />
            )}

            <div className="flex">
                <Button onClick={() => deleteTask(item.id)}>
                    <DeleteIcon color="error" />
                </Button>
                <Button
                    onClick={item.isEdit ? () => editEnd(item.id) : () => editStart(item.id)}
                    sx={{ color: 'red' }}
                >
                    {item.isEdit ? <CheckIcon color="success" /> : <EditIcon color="error" />}
                </Button>
                {!item.isEdit && (
                    <Button onClick={() => moveToCompleted(item.id)}>
                        <CheckIcon color="success" />
                    </Button>
                )}
            </div>
        </ListItem>
    ));

    const completed = completedTasks.map((item) => (
        <li key={item.id}>
            {item.date} - {item.text}
        </li>
    ));

    return (
        <main className="mt-[50px]">
            <div className="wrapper flex flex-col flex-row"> 
                <Clock />
                <h2>СПИСОК ДЕЛ</h2>

                <div className="flex justify-between flex-col lg:flex-row">
                    <List className="flex flex-col w-full max-w-[360px] bg-transparent">
                        {todoList}
                    </List>

                    <div className="flex flex-col">
                        <Box
                            component="form"
                            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    label="Введите текст записи"
                                    color="warning"
                                    focused
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={4}
                                    value={task}
                                    onChange={(e) => {
                                        setTask(e.target.value);
                                        if (error) setError("");
                                    }}
                                    error={!!error}
                                    slotProps={{
                                        input: {
                                            style: {
                                                color: theme === "light" ? "#000000" : "#FFFFFF",
                                                fontWeight: "bold",
                                            }
                                        }
                                    }}
                                />
                                {error && <FormHelperText error>{error}</FormHelperText>}
                            </div>
                        </Box>

                        <div className="flex flex-col justify-center">
                            <Button
                                color="warning"
                                className="w-[200px] self-center"
                                onClick={handleAdd}
                            >
                                ДОБАВИТЬ ЗАПИСЬ
                            </Button>

                            <Button
                                color="warning"
                                className="w-[200px] self-center"
                                onClick={handleOpen}
                            >
                                ОТКРЫТЬ СПИСОК ВЫПОЛНЕННЫХ ДЕЛ
                            </Button>
                        </div>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}
                            >
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    СПИСОК ВЫПОЛНЕННЫХ ДЕЛ
                                </Typography>
                                <ul>{completed}</ul>
                                <Button color="warning" onClick={clearCompletedList}>
                                    ОЧИСТИТЬ СПИСОК ВЫПОЛНЕННЫХ ДЕЛ
                                </Button>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;
