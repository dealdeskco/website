import React from 'react';
import {translate} from '@docusaurus/Translate';
import {agentClients, statusLabel} from '@site/src/data/agentClients';
import styles from './styles.module.css';

/**
 * The clients Deal Desk works with, as a ruled table: name, how it connects, and whether it
 * works today. The data (and each client's status) lives in src/data/agentClients.tsx.
 * `compact` drops the "how" column, for the home page.
 */
export default function ClientTable({compact = false}: {compact?: boolean}): React.ReactElement {
  const rows = agentClients();
  return (
    <table className={styles.table} data-compact={compact}>
      <thead>
        <tr>
          <th scope="col">{translate({id: 'clients.col.client', message: 'Client'})}</th>
          {!compact && <th scope="col">{translate({id: 'clients.col.how', message: 'How it connects'})}</th>}
          <th scope="col" className={styles.right}>
            {translate({id: 'clients.col.status', message: 'Today'})}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((c) => (
          <tr key={c.id}>
            <th scope="row">{c.name}</th>
            {!compact && <td>{c.how}</td>}
            <td className={`${styles.right} ${styles.status}`} data-st={c.status}>
              {statusLabel(c.status)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
