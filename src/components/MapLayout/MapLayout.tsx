import React from 'react';

import classNames from 'classnames';

import { Fallback } from '../Fallback';
import styles from './MapLayout.module.css';

export interface IMapLayoutProps {
	children: React.ReactNode;
	containerRef: React.RefObject<HTMLDivElement>;
	load: boolean;
}

export const MapLayout: React.FC<IMapLayoutProps> = props => {
	const { children, load, containerRef } = props;

	return (
		<div className={styles['container']}>
			<div className={classNames(styles['map'], load && styles['map-show'])} ref={containerRef}>
				{children}
			</div>
			<div className={classNames(styles['fallback'], !load && styles['fallback-show'])}>
				<Fallback load={load} />
			</div>
		</div>
	);
};
