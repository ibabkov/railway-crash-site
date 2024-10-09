import React from 'react';

import styles from './Fallback.module.css';

export type FallbackProps = {
	loadingProgress: number;
};

export const Fallback: React.FC<FallbackProps> = props => {
	const { loadingProgress } = props;

	return (
		<div className={styles.container}>
			<span className={styles.advice}>
				<span className={styles['advice-title']}>Advice</span>
				<span className={styles['advice-text']}>You can ZOOM and ROTATE the map</span>
			</span>
			<span className={styles.loader}>Loading</span>
			{loadingProgress >= 0 && (
				<span className={styles.progress}>
					<span className={styles.bar} style={{ transform: `scaleX(${loadingProgress})` }} />
				</span>
			)}
		</div>
	);
};
