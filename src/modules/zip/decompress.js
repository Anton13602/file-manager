import { createReadStream, createWriteStream } from 'fs';
import { createUnzip } from 'zlib';
import { pipeline } from 'stream';
import { callbackError } from '../utils/callbackError.js';

import { getPath } from '../utils/getPath.js';

const decompress = async () => {
	// Write your code here
	const pathToFile = getPath(import.meta, ['files', 'fileToCompress.txt']);
	const pathToZip = getPath(import.meta, ['files', 'archive.gz']);

	const readStream = createReadStream(pathToZip);
	const writeStream = createWriteStream(pathToFile);
	const unzip = createUnzip();

	pipeline(readStream, unzip, writeStream, callbackError);
};

await decompress();
