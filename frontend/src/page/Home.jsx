import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import asset1 from "../assets/asset1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";
const Home = () => {
  const [file, setFile] = useState("");
  const [format, setFormat] = useState("");
  const [quality, setQuality] = useState(0);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [removeBackground, setRemoveBackground] = useState("no");
  const [rotate, setRotate] = useState(0);
  const [flip, setFlip] = useState("no");
  const [processedImage, setProcessedImage] = useState(null);
  const [extension, setExtension] = useState(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const extension = selectedFile.name.split('.').pop(); // Get file extension
      setFile(selectedFile);
      setFormat(extension)
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("format", format);
    formData.append("quality", quality);
    formData.append("rotate", rotate);
    formData.append("flip", flip);
    formData.append("removeBackground",removeBackground);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/process-image",
        formData,
        { responseType: "blob" }
      );
      console.log(response);
      const url = URL.createObjectURL(response.data);
      setProcessedImage(url);
      setExtension(response.headers["content-type"].split("/")[1]);
      toast.success("Image processed successfully!");
    } catch (err) {
      console.error("Error processing image:", err);
      toast.error("Failed to process the image.");
    }
  };

  const handleDelete = () => {
    setFile(null);
    toast.info("File removed");
  };

  return (
    <div>
      <div className="header h-[10vh] flex justify-between items-center px-4 border-b-gray-300 border-b-2">
        <div className="flex items-center space-x-4">
          <div>
            <img src={logo} className="w-[65px]" alt="logo" />
          </div>
          <div className="font-sans text-5xl">Image</div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="bg-gray-100 m-2 p-3 rounded-2xl border-gray-400">
            Sign Up
          </div>
          <div className="bg-gray-100 m-4 p-3 rounded-2xl border-gray-400">
            Log in
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-[40vw] h-[80vh] flex justify-center items-center">
          <div className="p-4 m-4 border border-gray-300 shadow-lg w-[35vw] h-auto rounded-4xl">
            <h1 className="text-lg font-bold mb-4 flex justify-center">
              Image Upload
            </h1>
            <div className="h-[10vh] mt-10 justify-center flex">
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="mb-4 border p-2 rounded-3xl"
              />
            </div>
            <div className="text-xl text-gray-600 font-serif flex justify-center">
              OR Drop file
            </div>
            <div className="flex flex-col justify-center">
              {file && (
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="h-[80px] rounded-4xl"
                  />
                  <button
                    onClick={handleDelete}
                    className="px-3 py-1 bg-red-500 text-white rounded-4xl cursor-pointer hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}

              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded-4xl cursor-pointer m-10 w-[30vw] hover:bg-blue-600"
              >
                Upload Image
              </button>
            </div>
            <ToastContainer />
          </div>
        </div>
        <div>
          <div className="w-[30vw] h-auto border-2 rounded-3xl border-gray-300 m-4 p-4 shadow-2xl">
            <div className="text-2xl m-2  ">Editor</div>
            <div className="m-2 p-2">
              <div className="flex flex-col">
                <label>Convert to which type:</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="border-2 border-gray-300 rounded-2xl p-2 m-2"
                >
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="webp">WEBP</option>
                </select>
                <label className="mt-[10px]">Compress:</label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="border-2 border-gray-300 rounded-2xl p-2 m-2"
                >
                  <option value="0">0%</option>
                  <option value="10">10%</option>
                  <option value="30">30%</option>
                  <option value="50">50%</option>
                  <option value="70">70%</option>
                  <option value="90">90%</option>
                </select>
                <label className="font-bold mt-[20px]">Resize:</label>
                <div className="flex items-center">
                  <label>Width:</label>
                  <input
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    type="number"
                    className="border-2 border-gray-300 rounded-2xl p-2 m-2 w-[100px]"
                  />
                  <label>Height:</label>
                  <input
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    type="number"
                    className="border-2 border-gray-300 rounded-2xl p-2 m-2 w-[100px]"
                  />
                </div>
                <label>Rotate:</label>
                <input
                  value={rotate}
                  onChange={(e) => setRotate(e.target.value)}
                  type="number"
                  placeholder="degree"
                  className="border-2 border-gray-300 rounded-2xl p-2 m-2 w-[100px]"
                />
                <label>Flip:</label>
                <select
                  value={flip}
                  onChange={(e) => setFlip(e.target.value)}
                  className="border-2 border-gray-300 rounded-2xl p-2 m-2 w-[100px]"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
                <label>Remove Background:</label>
                <select
                  value={removeBackground}
                  onChange={(e) => setRemoveBackground(e.target.value)}
                  className="border-2 border-gray-300 rounded-2xl p-2 m-1"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        { processedImage ? <div className="flex flex-col items-center mt-4">
          <h2 className="text-lg font-bold">Processed Image:</h2>
          <div className="flex ">
          <img
            src={processedImage}
            alt="Processed"
            className="w-[300px] h-auto rounded-lg shadow-lg"
          />
          <button className=" p-2 flex cursor-pointer" onClick={() => setProcessedImage(null)}>< IoMdClose size={23}/></button>
          </div>
          <a
          href={processedImage}
          download={`processed-image.${extension}`}
          className="px-4 py-2 m-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700"
        >
          Download Image
        </a>
        </div>:
         <div className="flex flex-col items-center justify-center">
         <img
           src={asset1}
           alt="asset1"
           className="w-[25vw] m-4 p-4 shadow-2xl rounded-3xl border-2 border-gray-300"
         />
       </div>} 
      </div>
      {/* {processedImage && (
        <div className="flex flex-col items-center mt-4">
          <h2 className="text-lg font-bold">Processed Image:</h2>
          
          <img
            src={processedImage}
            alt="Processed"
            className="w-[300px] h-auto rounded-lg shadow-lg"
          />
          <a
          href={processedImage}
          download={`processed-image.${extension}`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download Image
        </a>
        </div>
      )} */}
    </div>
  );
};

export default Home;
