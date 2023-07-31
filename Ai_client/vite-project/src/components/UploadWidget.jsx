import { useEffect, useRef } from "react";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "djyfosrda",
        uploadPreset: "airtistic",
        cropping: true
      },
      function (error, result) {
        console.log(result);
      }
    );
  }, []);
  return (
    <div>
      <h1> hi</h1>
      <button onClick={() => widgetRef.current.open()}>Upload</button>
    </div>
  );
};
export default UploadWidget;
