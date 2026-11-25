const PRIORITY_META = {
  high: { label: 'สูง', className: 'badge--high' },
  medium: { label: 'กลาง', className: 'badge--medium' },
  low: { label: 'ต่ำ', className: 'badge--low' },
};

function formatDueDate(dateString) {
  if (!dateString) return 'ไม่ระบุวันครบกำหนด';
  const parsed = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateString;
  return new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
}

/**
 * Displays a single todo item with toggle and delete actions.
 */
export default function TodoItem({
  title,
  priority = 'medium',
  dueDate,
  completed = false,
  onToggle,
  onDelete,
}) {
  const priorityInfo = PRIORITY_META[priority] ?? PRIORITY_META.medium;

  return (
    <li className={`todo-item ${completed ? 'todo-item--completed' : ''}`}>
      <button
        type="button"
        className={`todo-toggle ${completed ? 'todo-toggle--checked' : ''}`}
        onClick={onToggle}
        aria-pressed={completed}
        aria-label={completed ? `ทำเครื่องหมาย "${title}" เป็นยังไม่เสร็จ` : `ทำเครื่องหมาย "${title}" เป็นเสร็จแล้ว`}
      >
        {completed && (
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3.5 8.5L6.5 11.5L12.5 4.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div className="todo-content">
        <span className="todo-title">{title}</span>

        <div className="todo-meta">
          <span className={`badge ${priorityInfo.className}`}>
            ความสำคัญ: {priorityInfo.label}
          </span>
          <span className="todo-due">ครบกำหนด: {formatDueDate(dueDate)}</span>
          {completed && <span className="badge badge--done">เสร็จแล้ว</span>}
        </div>
      </div>

      <button
        type="button"
        className="todo-delete"
        onClick={onDelete}
        aria-label={`ลบรายการ "${title}"`}
        title="ลบรายการ"
      >
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M6 6L14 14M14 6L6 14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </li>
  );
}
