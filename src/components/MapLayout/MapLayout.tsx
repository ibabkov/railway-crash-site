import React from 'react';

import classNames from 'classnames';

import { Fallback } from '../Fallback';
import styles from './MapLayout.module.css';

export type MapLayoutProps = {
	children: React.ReactNode;
	containerRef: React.RefObject<HTMLDivElement | null>;
	idle: boolean;
	loadingProgress: number;
};

export const MapLayout: React.FC<MapLayoutProps> = props => {
	const { children, idle, containerRef, loadingProgress } = props;

	return (
		<div className={styles['container']}>
			<div className={classNames(styles['map'], idle && styles['map-show'])} ref={containerRef}>
				{children}
			</div>
			<div className={classNames(styles['fallback'], !idle && styles['fallback-show'])}>
				<Fallback loadingProgress={loadingProgress} />
			</div>
		</div>
	);
};
