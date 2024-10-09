import { APP_TITLE } from '../constants/app';

/**
 * Construct the full cdn url
 * @param url {string} Should only contain a path from repository root, starting with '/'
 * @param base {string}
 * @return string
 */
export const constructCdnUrl = (url: string, base = `https://cdn.jsdelivr.net/gh/ibabkov/${APP_TITLE}`) => {
	return base + url;
};
