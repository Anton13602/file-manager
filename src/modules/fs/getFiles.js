import { readdir, stat } from 'node:fs/promises';
import { join } from 'path';

import { errorMessage } from '../../constants/constant.js';

const getFiles = async (path) => {
	try {
		const files = await readdir(path);
		const map = files.map(async file => {
			const pathForFile = join(path, file);
			const stats = await stat(pathForFile);
			const type = stats.isFile() ? 'file' : 'directory';

			return { Name: file, Type: type };
		});

		const sortFile = (await Promise.all(map)).sort((a, b) => {
			if (a.Type === b.Type) {
				return a.Name.localeCompare(b.Name);
			}
			return a.Type === 'directory' ? -1 : 1;
		});

		console.table(sortFile);
		return sortFile;
	} catch (error) {
		console.error(errorMessage);
	}
};

export default getFiles;
