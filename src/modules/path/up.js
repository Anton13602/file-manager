import { cwd, chdir } from 'node:process';
import { parse } from 'path';

const getWorkDir = (filename) => {
	return parse(filename).root;
};

const up = () => {
	const currentPath = cwd();
	const rootPath = getWorkDir(currentPath);

	if (currentPath === rootPath) {
		return;
	}

	chdir('..');
};

export default up;
