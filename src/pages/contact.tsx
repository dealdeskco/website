import React, {useState} from 'react';
import Layout from '@theme/Layout';
import styles from './contact.module.css';

// The site is static, so there is no backend here. The form posts to the APPLICATION's API, which
// already owns the mail chain (SES, falling back to Resend), the branded templates, the provider
// health tracking and the rate limiting. Standing up a second sender for the marketing site would
// mean a second set of DNS records, a second reputation to manage, and a second thing to notice
// when it breaks.
const ENDPOINT = 'https://app.dealdesk.studio/api/contact';

export default function Contact(): React.ReactElement {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState('sending');
    setError('');
    try {
      const r = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || `Something went wrong (${r.status}).`);
      setState('sent');
      form.reset();
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <Layout
      title="Contact"
      description="Questions about Deal Desk Studio, pricing, or whether it fits how you quote work.">
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <div className={styles.copy}>
            <span className={styles.kicker}>Contact</span>
            <h1 className={styles.h1}>Tell us what you are quoting.</h1>
            <p className={styles.lede}>
              Questions about pricing, whether it fits your trade, or what happens to a document
              after it is signed — send them here and a human will answer.
            </p>
            <p className={styles.small}>
              Already using Deal Desk and need help with a live deal? Reply to any email the
              product sent you — those reach us faster.
            </p>
          </div>

          <div className={styles.card}>
            {state === 'sent' ? (
              <div className={styles.done} role="status">
                <div className={styles.doneTick}>✓</div>
                <h2>Thanks — that reached us.</h2>
                <p>We reply to everything, usually within a working day.</p>
              </div>
            ) : (
              <form onSubmit={submit} className={styles.form} noValidate={false}>
                <label className={styles.field}>
                  <span>Your name</span>
                  <input name="name" required maxLength={120} autoComplete="name" />
                </label>
                <label className={styles.field}>
                  <span>Email</span>
                  <input name="email" type="email" required maxLength={254} autoComplete="email" />
                </label>
                <label className={styles.field}>
                  <span>Company <em>(optional)</em></span>
                  <input name="company" maxLength={120} autoComplete="organization" />
                </label>
                <label className={styles.field}>
                  <span>What can we help with?</span>
                  <textarea name="message" required rows={5} maxLength={4000} />
                </label>

                {/*
                  Honeypot. Named like a real field and hidden from people, never from a bot that
                  fills every input it finds. aria-hidden and tabIndex keep it away from screen
                  readers and keyboard users; the server rejects any submission that fills it.
                */}
                <div className={styles.hp} aria-hidden="true">
                  <label>
                    Website
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                {state === 'error' && <div className={styles.err}>{error}</div>}

                <button className={styles.submit} type="submit" disabled={state === 'sending'}>
                  {state === 'sending' ? 'Sending…' : 'Send message'}
                </button>
                <p className={styles.privacy}>
                  We use your message to reply and nothing else. No list, no sequence.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
