import styles from './DesktopShell.module.css';

const RAIL = ['Chats', 'People', 'Settings'] as const;

/** Desktop three-panel shell: navigation rail, list, conversation. */
export function DesktopShell() {
  return (
    <div className={styles.layout}>
      <nav className={styles.rail} aria-label="Desktop primary">
        {RAIL.map((label, index) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            aria-current={index === 0 ? 'page' : undefined}
            disabled
          >
            <span className={styles.railIcon} aria-hidden="true" />
          </button>
        ))}
      </nav>

      <section className={styles.listPane} aria-labelledby="desktop-list-title">
        <div className={styles.listHeader}>
          <h1 id="desktop-list-title">Chats</h1>
        </div>
        <div className={styles.listBody}>
          {['Alex', 'Jordan', 'Sam'].map((name, index) => (
            <div
              key={name}
              className={styles.chatRow}
              aria-current={index === 0 ? 'true' : undefined}
            >
              <span className={styles.avatar} aria-hidden="true" />
              <div>
                <strong>{name}</strong>
                <div>Preview placeholder</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.conversation} aria-labelledby="desktop-conversation-title">
        <div className={styles.conversationHeader}>
          <h2 id="desktop-conversation-title">Alex</h2>
        </div>
        <div className={styles.conversationBody}>
          <div className={styles.bubbleIn}>Incoming placeholder message</div>
          <div className={styles.bubbleOut}>Outgoing placeholder message</div>
        </div>
        <form
          className={styles.composer}
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label htmlFor="composer" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
            Message
          </label>
          <input id="composer" name="message" placeholder="Type a message" disabled />
          <button type="submit" disabled>
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
