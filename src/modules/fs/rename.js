import { rename as renameFS } from 'fs/promises';
import { cwd } from 'node:process';
import { join } from 'path';

import { errorMessage } from '../../constants/constant.js';

const rename = async (file, newFile) => {
	try {
		const currentDir = cwd();
		const pathToFile = join(currentDir, file);
		const pathToRenameFileName = join(currentDir, newFile);

		await renameFS(pathToFile, pathToRenameFileName);
	} catch (error) {
		console.error(errorMessage);
	}
};

export default rename;
