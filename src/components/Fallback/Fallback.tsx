import React from 'react';

import classNames from 'classnames';

import styles from './Fallback.module.css';

export interface IFallbackProps {
	load: boolean;
}

export const Fallback: React.FC<IFallbackProps> = props => {
	const { load } = props;

	return (
		<div className={styles.container}>
			<span className={styles.loader}>Loading</span>
			<span className={classNames(styles.progress, load && styles['progress-load'])} />
		</div>
	);
};
