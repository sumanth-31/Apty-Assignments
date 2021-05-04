const { readFile } = require("fs");
function readFilesHelper() {
	return new Promise((res, rej) => {
		readFile("./file1.txt", { encoding: "utf-8" }, (err1, data1) => {
			if (err1) {
				return rej(err1);
			}
			readFile("./file2.txt", { encoding: "utf-8" }, (err2, data2) => {
				if (err2) {
					return rej(err2);
				}
				readFile("./file3.txt", { encoding: "utf-8" }, (err3, data3) => {
					if (err3) {
						return rej(err3);
					}
					return res({ data1, data2, data3 });
				});
			});
		});
	});
}
readFilesHelper()
	.then((data) => {
		console.log("Files Data: ", data);
	})
	.catch((err) => {
		console.log("Error Occured: ", err);
	});
