export const uploadImage = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "glow-hub");
    data.append("cloud_name", "dbiove79b");
   return fetch("https://api.cloudinary.com/v1_1/dbiove79b/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  };