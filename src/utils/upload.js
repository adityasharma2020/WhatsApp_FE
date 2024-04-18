import axios from 'axios';

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;

export const uploadFiles = async (files) => {
	let formData = new FormData();
	formData.append('upload_preset', cloud_secret);
	let uploaded = [];

	// put all the files to cloudinary
	for (const f of files) {
		const { file, type } = f;
		formData.append('file', file);
	
		let res = await uploadToCloudinary(formData);
		uploaded.push({
			file: res,
			type: type,
		});
	}
	return uploaded;
};

const uploadToCloudinary = async (formData) => {
	try {
		const { data } = await axios.post(
			`https://api.cloudinary.com/v1_1/${cloud_name}/raw/upload`,
			formData
		);
		return data;
	} catch (err) {
		console.log(err);
	}
};
