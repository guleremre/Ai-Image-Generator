import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h3>Cloudinary Upload Widget Example</h3>
      <CloudinaryUploadWidget />
      <p>
        <a
          href="https://cloudinary.com/documentation/upload_widget"
          target="_blank"
        >
          Upload Widget User Guide
        </a>
      </p>
      <p>
        <a
          href="https://cloudinary.com/documentation/upload_widget_reference"
          target="_blank"
        >
          Upload Widget Reference
        </a>
      </p>
      <img id="uploadedimage" src=""></img>
    </div>
  );
}
