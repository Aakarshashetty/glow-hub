export const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "glow-hub");
    data.append("cloud_name", "dbiove79b");
   try {
    const resp = await fetch("https://api.cloudinary.com/v1_1/dbiove79b/image/upload", {
      method: "post",
      body: data,
    });
    const data_1 = await resp.json();
    return data_1;
  } catch (err) {
    return console.log(err);
  }
  };