const { readFile } = require("fs");

function readFilesHelper(filePath) {
	return new Promise((res, rej) => {
		readFile(filePath, { encoding: "utf-8" }, (err, data) => {
			if (err) {
				return rej(err);
			}
			return res(data);
		});
	});
}

async function readAllFiles() {
	try {
		const file1Data = await readFilesHelper("./file1.txt");
		const file2Data = await readFilesHelper("./file2.txt");
		const file3Data = await readFilesHelper("./file3.txt");
		console.log("Files Data: ", { file1Data, file2Data, file3Data });
	} catch (err) {
		console.log("Error occured: ", err);
	}
}

readAllFiles();
