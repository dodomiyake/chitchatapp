import styles from './TabletShell.module.css';

/** Tablet-responsive two-column shell. */
export function TabletShell() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar} aria-label="Conversation list">
        <h1 className={styles.title}>Chats</h1>
        {['Alex', 'Jordan', 'Sam'].map((name) => (
          <div key={name} className={styles.row}>
            <span className={styles.avatar} aria-hidden="true" />
            <span>{name}</span>
          </div>
        ))}
      </aside>
      <section className={styles.panel} aria-labelledby="tablet-conversation-title">
        <h2 id="tablet-conversation-title" className={styles.title}>
          Conversation
        </h2>
        <p>Tablet layout adapts from a stacked mobile view to a two-column shell.</p>
        <div className={styles.placeholder} aria-hidden="true" />
      </section>
    </div>
  );
}
