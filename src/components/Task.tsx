import { Trash } from "phosphor-react";
import { ChangeEvent } from "react";
import styles from "./Task.module.css";

interface TaskProps {
  id: string;
  content: string;
  done: boolean;
  onDeleteTask: (Task: { id: string; content: string; done: boolean }) => void;
  setDoneTask: (id: string, isDone: boolean) => void;
}

export function Task({
  id,
  content,
  done,
  onDeleteTask,
  setDoneTask,
}: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask({ id, content, done });
  }

  function handleDoneTask(event: ChangeEvent<HTMLInputElement>) {
    setDoneTask(id, event.target.checked);
  }
  return (
    <div key={id} className={styles.todo}>
      <label className={styles.container}>
        <input
          type="checkbox"
          checked={done}
          placeholder="Marcar como concluído"
          onChange={handleDoneTask}
        />
        <span className={styles.checkmark}></span>
        <span className={styles.contentspan}>{content}</span>
      </label>

      <button onClick={handleDeleteTask} title="Deletar tarefa">
        <Trash size={24} />
      </button>
    </div>
  );
}
