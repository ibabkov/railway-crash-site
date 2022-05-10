import React from 'react';

import styles from './Fallback.module.css';

export const Fallback: React.FC = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loader}>Loading</span>
    </div>
  );
};
