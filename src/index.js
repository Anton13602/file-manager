import { stdin, stdout, exit, nextTick, cwd, chdir, env } from 'node:process';
import { EOL, homedir } from 'os';
import up from '../src/modules/path/up.js';
import cd from './modules/path/cd.js';
import copy from './modules/fs/copy.js';
import create from './modules/fs/createFile.js';
import getFiles from './modules/fs/getFiles.js';
import move from './modules/fs/move.js';
import readFile from './modules/fs/read.js';
import rename from './modules/fs/rename.js';
import remove from './modules/fs/delete.js';
import calculateHash from './modules/hash/calcHash.js';
import getOSInfo from './modules/os/getOSInfo.js';
import compress from './modules/zip/compress.js';
import decompress from './modules/zip/decompress.js';
import { state } from './state.js';

const onExit = () => {
	process.on('SIGINT', () => {
		goodbyeText();
		exit();
	});
};

const getName = () => {
	return process.argv.slice(2)[0].replace('--username=', '');
};

export const goodbyeText = () =>
	console.log(`Thank you for using File Manager, ${state.get('name')}, goodbye!`);

const commandHandlers = {
	'.exit': () => {
		goodbyeText();
		nextTick(exit);
	},
	'up': () => up(),
	'cd': (firstData) => cd(firstData),
	'ls': async () => await getFiles(cwd()),
	'cat': async (firstData) => await readFile(firstData),
	'add': async (firstData) => await create(firstData),
	'rn': async (firstData, secondData) => await rename(firstData, secondData),
	'cp': async (firstData, secondData) => await copy(firstData, secondData),
	'mv': async (firstData, secondData) => await move(firstData, secondData),
	'rm': async (firstData) => await remove(firstData),
	'os': (firstData) => getOSInfo(firstData),
	'hash': async (firstData) => await calculateHash(firstData),
	'compress': async (firstData, secondData) => await compress(firstData, secondData),
	'decompress': async (firstData, secondData) => await decompress(firstData, secondData),
};

const app = () => {
	chdir(homedir());
	state.set('name', getName());
	onExit();
	stdout.write(`Welcome to the File Manager, ${state.get('name')}!${EOL}`);
	stdin.on('data', async (chunk) => {
		const [data, firstData, secondData] = chunk.toString().trim().split(' ');

		const commandHandler = commandHandlers[data];

		if (commandHandler) {
			await commandHandler(firstData, secondData);
		} else {
			stdout.write(`Invalid input${EOL}`);
		}

		stdout.write(`You are currently in ${cwd()}${EOL}`);
	});
	stdout.write(`You are currently in ${cwd()}${EOL}`);
};

app();
