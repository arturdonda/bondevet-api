import fs from 'fs';
import util from 'util';

export const configureLogger = () => {
	if (process.env.NODE_ENV !== 'dev') return;

	const log_file = fs.createWriteStream(__dirname + '../../../../console.log', { flags: 'w' });
	const log_stdout = process.stdout;

	console.log = function (...d) {
		log_file.write(util.format(...d) + '\n');
		log_stdout.write(util.format(...d) + '\n');
	};

	console.error = function (...d) {
		log_file.write(util.format(...d) + '\n');
		log_stdout.write(util.format(...d) + '\n');
	};
};
