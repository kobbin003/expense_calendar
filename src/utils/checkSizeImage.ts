/** file should not be greater than 200MB i.e 200000bytes */
export const checkSizeImage = (file: File) => {
	if (file.size > 200000) {
		return false;
	} else {
		return true;
	}
};
