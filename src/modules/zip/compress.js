import { createReadStream, createWriteStream } from 'fs';
import { cwd } from 'node:process';
import { join, basename, extname } from 'path';
import { pipeline } from 'stream/promises';
import { createBrotliCompress } from 'zlib';

import { errorMessage } from '../../constants/constant.js';
import { state } from '../../state.js';

const compress = async (pathFile, pathZip) => {
	const currentDir = cwd();
	const pathToFile = join(currentDir, pathFile);
	const ext = extname(pathToFile);
	const nameFile = basename(pathToFile, ext);
	const pathToZip = join(currentDir, pathZip, `${nameFile}.br`);

	state.set(nameFile, ext)

	const brotli = createBrotliCompress();
	const readStream = createReadStream(pathToFile);
	const writeStream = createWriteStream(pathToZip);

	await pipeline(
		readStream,
		brotli,
		writeStream,
	).catch(() => console.error(errorMessage));
};

export default compress;
