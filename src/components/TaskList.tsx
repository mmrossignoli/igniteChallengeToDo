import { ClipboardText, PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "./Task";
import styles from "./TaskList.module.css";

interface Task {
  id: string;
  content: string;
  done: boolean;
}

export function TaskList() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [tasksDoneCount, setTasksDoneCount] = useState(0);
  function handleCreateNewToDo(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: uuidv4(),
      content: newTaskText,
      done: false,
    };
    setTaskList([...taskList, newTask]);
    setNewTaskText("");
  }

  function handleNewToDoChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
    event.target.setCustomValidity("");
  }

  function DeleteTask(taskToDelete: Task) {
    const TasksWithoutDeletedOne = taskList.filter((task) => {
      return task.id != taskToDelete.id && task;
    });
    setTaskList(TasksWithoutDeletedOne);
    const taskListUpdated = TasksWithoutDeletedOne;
    setTasksDoneCount(
      taskListUpdated.filter((task) => task.done == true).length
    );
  }
  function setDoneTask(taskToDone: string, isDone: boolean) {
    const TasksWithDoneOne = taskList.map((task) => {
      if (task.id === taskToDone) {
        task.done = isDone;
        setTasksDoneCount(taskList.filter((task) => task.done == true).length);
      }
    });
  }
  const isNewTaskEmpty = newTaskText.length == 0;
  const TasksCreated = taskList.length;
  return (
    <main className={styles.main}>
      <form onSubmit={handleCreateNewToDo}>
        <input
          type="text"
          placeholder="Adicione Uma nova Tarefa"
          onChange={handleNewToDoChange}
          value={newTaskText}
        />
        <button type="submit" disabled={isNewTaskEmpty}>
          Criar <PlusCircle size="1rem" />
        </button>
      </form>

      <div className={styles.taskList}>
        <div className={styles.taskListHeader}>
          <div className={styles.createdTasks}>
            <span> Tarefas criadas </span>
            <span className={styles.taskCount}>{TasksCreated}</span>
          </div>
          <div className={styles.doneTasks}>
            <span> Concluídas </span>
            <span className={styles.taskCount}>
              {TasksCreated > 0 ? tasksDoneCount + " de " + TasksCreated : 0}
            </span>
          </div>
        </div>
        <div className={styles.board}>
          {taskList.length != 0 ? (
            taskList.map((task) => (
              <Task
                id={task.id}
                content={task.content}
                done={task.done}
                onDeleteTask={DeleteTask}
                setDoneTask={setDoneTask}
              />
            ))
          ) : (
            <div className={styles.emptylist}>
              <ClipboardText size={56} />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
