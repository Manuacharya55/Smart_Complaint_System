
const Image = ({image,uploadImage,name,setState}) => {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    console.log(e.target.name);
    const lin = await uploadImage(file);
    setState((prev) => {
      return {
        ...prev,
        [name]: lin,
      };
    });

    console.log(e.target.name);
  };

  return (
    <>
        <label htmlFor={name}>
            <div id="image-upload">
                <img src={image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmVq-OmHL5H_5P8b1k306pFddOe3049-il2A&s"} alt="" />
            </div>
        </label>
        <input type="file" accept="image/*" id={name} onChange={handleUpload} name={name} />
    </>
  );
};

export default Image;
