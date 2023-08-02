import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";

import "./profile.scss";
const Profile = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [userInfo, setUserInfo] = useState([]);
  const [userId, setUserId] = useState("");
  console.log(userInfo.imgUrl);
  //to get user id
  async function auth() {
    const url = "http://localhost:4000/user/verify";
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(url, { token });
      // console.log("response.data", response.data);
      const settedUserInfo = response.data;
      const settedUserId = response.data._id;
      setUserInfo(settedUserInfo);
      setUserId(settedUserId);
      // console.log("userInfo", userInfo);
      // console.log("userId", userId);
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  }
  //to use cloudinary widget for  img upload
  function UploadToWidget(userId) {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "djyfosrda",
        uploadPreset: "airtistic",
        cropping: true,
        folder: "user_profile",
        multiple: false,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          const avatar = result.info.secure_url;
          // post(avatar, userId); // Call the post function with the image data and userId
          put(avatar, userId);
          // getAvatar(avatar, userId);
        } else if (error) {
          console.error("Error uploading image:", error);
        }
      }
    );
  }
  // async function post(avatar, userId) {
  //   // axios.put("http://localhost:4000/user/" + userId , {imgUrl : clouridiray})
  //   const url = "http://localhost:4000/img/";
  //   try {
  //     var response = await axios.post(url, {
  //       avatar,
  //       userId, // Add the userId to the request
  //     });
  //     console.log("Upload successful!", response.data);
  //     console.log("postun ki", userId);
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // }
  async function put(avatar, userId) {
    try {
      var response = await axios.put(`http://localhost:4000/user/${userId}`, {
        imgUrl: avatar,
      });
      var imgs = userInfo.imgUrl;
      setImgs(imgs);
      // getAvatar(avatar, userId);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
  async function getAvatar(userId, avatar) {
    try {
      var response = await axios.get(`http://localhost:4000/user/${userId}`);

      console.log("bune?", response.data);
      // console.log("imgUrl?", imgUrl);
      getAvatar(userId);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  useEffect(() => {
    auth(); // Call the auth function to get the userId
    UploadToWidget(userId);
  }, [userId]);

  return (
    <>
      <h1>{`this is profile of ${userId} `}</h1>

      <img src={"#"} />
      <button onClick={getAvatar} type="button">
        getAvatar
      </button>
      {/* <div>
        <h1>General Img</h1>
        <button onClick={() => widgetRef.current.open()}>Upload img</button>
      </div> */}

      <div>
        <button name="updateAvatar" onClick={() => widgetRef.current.open()}>
          Avatar img
        </button>
      </div>
      <div className="vh-100" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="container py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="12" xl="4">
              <MDBCard style={{ borderRadius: "15px" }}>
                <MDBCardBody className="text-center">
                  <div className="mt-3 mb-4">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      className="rounded-circle"
                      fluid
                      style={{ width: "100px" }}
                    />
                  </div>
                  <MDBTypography tag="h4">Julie L. Arsenault</MDBTypography>
                  <MDBCardText className="text-muted mb-4">
                    @Programmer <span className="mx-2">|</span>{" "}
                    <a href="#!">mdbootstrap.com</a>
                  </MDBCardText>
                  <div className="mb-4 pb-2">
                    <MDBBtn outline floating>
                      <MDBIcon fab icon="facebook" size="lg" />
                    </MDBBtn>
                    <MDBBtn outline floating className="mx-1">
                      <MDBIcon fab icon="twitter" size="lg" />
                    </MDBBtn>
                    <MDBBtn outline floating>
                      <MDBIcon fab icon="skype" size="lg" />
                    </MDBBtn>
                  </div>
                  <MDBBtn rounded size="lg">
                    Message now
                  </MDBBtn>
                  <div className="d-flex justify-content-between text-center mt-5 mb-2">
                    <div>
                      <MDBCardText className="mb-1 h5">8471</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Wallets Balance
                      </MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">8512</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Followers
                      </MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">4751</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">
                        Total Transactions
                      </MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
};

export default Profile;
