import { useState } from 'react';
import TodoItem from './components/TodoItem';

const INITIAL_TODOS = [
  {
    id: 1,
    title: 'ออกแบบโครงสร้าง TodoItem component',
    priority: 'high',
    dueDate: '2026-11-26',
    completed: true,
  },
  {
    id: 2,
    title: 'เชื่อมต่อ state สำหรับเพิ่มและลบรายการ',
    priority: 'medium',
    dueDate: '2026-11-28',
    completed: false,
  },
  {
    id: 3,
    title: 'เขียน Unit Test และตรวจสอบ Responsive UI',
    priority: 'low',
    dueDate: '2026-12-01',
    completed: false,
  },
];

const FILTERS = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'active', label: 'ยังไม่เสร็จ' },
  { key: 'completed', label: 'เสร็จแล้ว' },
];

export default function App() {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('2026-11-26');
  const [filter, setFilter] = useState('all');

  const handleAddTodo = (event) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTodo = {
      id: Date.now(),
      title: trimmed,
      priority,
      dueDate,
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setTitle('');
  };

  const handleToggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <main className="page">
      <section className="card">
        <header className="card-header">
          <div>
            <h1>Todolist</h1>
            <p className="subtitle">
              เสร็จแล้ว {completedCount} จาก {todos.length} รายการ
            </p>
          </div>
        </header>

        <form className="todo-form" onSubmit={handleAddTodo}>
          <input
            type="text"
            className="input input--title"
            placeholder="เพิ่มรายการที่ต้องทำ..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <select
            className="input"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            aria-label="ระดับความสำคัญ"
          >
            <option value="high">ความสำคัญ: สูง</option>
            <option value="medium">ความสำคัญ: กลาง</option>
            <option value="low">ความสำคัญ: ต่ำ</option>
          </select>
          <input
            type="date"
            className="input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            aria-label="วันครบกำหนด"
          />
          <button type="submit" className="btn-primary">
            เพิ่มรายการ
          </button>
        </form>

        <div className="filter-bar" role="tablist" aria-label="กรองรายการ">
          {FILTERS.map((item) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={filter === item.key}
              className={`filter-btn ${filter === item.key ? 'filter-btn--active' : ''}`}
              onClick={() => setFilter(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {filteredTodos.length > 0 ? (
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                title={todo.title}
                priority={todo.priority}
                dueDate={todo.dueDate}
                completed={todo.completed}
                onToggle={() => handleToggleTodo(todo.id)}
                onDelete={() => handleDeleteTodo(todo.id)}
              />
            ))}
          </ul>
        ) : (
          <p className="empty-state">ไม่มีรายการในหมวดนี้</p>
        )}
      </section>
    </main>
  );
}
