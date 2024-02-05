import { createReadStream, createWriteStream } from 'fs';
import { cwd } from 'node:process';
import { basename, extname, join } from 'path';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { errorMessage } from '../../constants/constant.js';
import { state } from '../../state.js';

const decompress = async (pathZip, pathFile) => {
	const currentDir = cwd();

	const pathToZip = join(currentDir, pathZip);
	const nameZip = basename(pathToZip, extname(pathToZip));
	const ext = state.get(nameZip) || 'txt';
	const pathToFile = join(currentDir, pathFile, `${nameZip}.${ext}`);


	const brotli = createBrotliDecompress();
	const readStream = createReadStream(pathToZip);
	const writeStream = createWriteStream(pathToFile);

	await pipeline(
		readStream,
		brotli,
		writeStream,
	).catch(() => console.error(errorMessage));
};

export default decompress;
