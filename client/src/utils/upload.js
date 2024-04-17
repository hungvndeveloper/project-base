import newRequest from "./newRequest";

const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "fiverr");

    try {
        const res = await newRequest.post("/upload/image", data);
        const { url } = res.data;
        return url;
    } catch (err) {
        console.log(err);
    }
};

// export const uploadMultipleFile = async (files) => {
//     const data = new FormData();
//     data.append("files", files);
//     data.append("upload_preset", "fiverr");
//     try {
//         const res = await newRequest.post("/upload/images", data);
//         const { url } = res.data;
//         return url;
//     } catch (err) {
//         console.log(err);
//     }
// }

export default upload;
