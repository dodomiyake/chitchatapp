import styles from './MobileNavShell.module.css';

const NAV_ITEMS = ['Chats', 'People', 'Requests', 'Settings'] as const;

/** Mobile shell with bottom navigation — static placeholder content only. */
export function MobileNavShell() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>Chats</h1>
      </header>
      <div className={styles.content}>
        <ul className={styles.list} aria-label="Conversation placeholders">
          {['Alex', 'Jordan', 'Sam'].map((name) => (
            <li key={name} className={styles.item}>
              <span className={styles.avatar} aria-hidden="true" />
              <div className={styles.meta}>
                <strong>{name}</strong>
                <span>Message preview placeholder</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <nav className={styles.bottomNav} aria-label="Primary">
        {NAV_ITEMS.map((label, index) => (
          <button
            key={label}
            type="button"
            aria-current={index === 0 ? 'page' : undefined}
            disabled
          >
            <span className={styles.icon} aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
