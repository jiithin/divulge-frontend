import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaUserTimes } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Alert, Button, Modal, Tooltip } from 'flowbite-react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import {updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutSuccess } from '../redux/user/userSlice.js'
import { FaUserShield } from "react-icons/fa";
import { BiSolidTrashAlt } from "react-icons/bi";
import { HiInformationCircle } from "react-icons/hi";
import { FcOk } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { DIVULGE } from "../serverUrl.js"

function DashProfile() {
    const {currentUser,loading} = useSelector((state) => state.user);
    const [profileImage, setProfileImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    
    const [profileImageUploadProgress, setProfileImageUploadProgress] = useState(null);
    const [profileImageUploadError, setProfileImageUploadError] = useState(null);
    const [profileImageUploading, setProfileImageUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const fileSelector =useRef();
    const dispatch=useDispatch();
    const navigate = useNavigate();

    //console.log(profileImageUploadProgress,profileImageUploadError);

    const handleImage=(e)=>{
        const file=(e.target.files[0]);

        if(file){
            setProfileImage(file);
            setImageUrl(URL.createObjectURL(file));
        } 
    };

    useEffect(() => {
        if (profileImage) {
          uploadImage();
        }
      }, [profileImage]);

// using firebase to upload image
   //set storage and rules in firebase before doing this
      const uploadImage = async () => {
        setProfileImageUploading(true);
        setProfileImageUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + profileImage.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, profileImage);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
            setProfileImageUploadProgress(progress.toFixed(0));
          },
          (error) => {
            setProfileImageUploadError(
              'Upload Failed, Image must be less than 2 MB'
            );
            setProfileImageUploadProgress(null);
            setProfileImage(null);
            setProfileImage(null);
            setProfileImageUploading(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrl(downloadURL);
              setFormData({ ...formData, profilePicture: downloadURL });
              setProfileImageUploading(false);
              console.log(downloadURL)
            });
          }
        );
      };

      //form data
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
       //console.log(formData)

      //form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (Object.keys(formData).length === 0) {
          setUpdateUserError('Zero changes made');
          return;
        }
        if (profileImageUploading) {
          setUpdateUserError('Click Upload for image to upload');
          return;
        }
        try {
          dispatch(updateStart());
          //userId changes with user, url has to be dynamic so use backtics
          const res = await fetch(`${DIVULGE}/blog/user/update/${currentUser._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include',
          });
          const data = await res.json();
          console.log(data)
          if (!res.ok) {
            dispatch(updateFailure(data.message));
            setUpdateUserError(data.message);
          } else {
            dispatch(updateSuccess(data));
            setUpdateUserSuccess("Profile updated successfully");
            //refresh page 3 seconds after updateing
            setTimeout(() => {
              window.location.reload();
          }, 3000);
          }
        } catch (error) {
          dispatch(updateFailure(error.message));
          setUpdateUserError(error.message);
        }
      };


      //delete user
      const handleDeleteUser = async () => {
        setShowModal(false);
        try {
          dispatch(deleteUserStart());
          const res = await fetch(`${DIVULGE}/blog/user/delete/${currentUser._id}`, {
            method: 'DELETE',
            credentials: 'include',
          });
          const data = await res.json();
          if (!res.ok) {
            dispatch(deleteUserFailure(data.message));
          } else {
            dispatch(deleteUserSuccess(data));
            navigate('/');
          }
        } catch (error) {
          dispatch(deleteUserFailure(error.message));
        }
      };
      

      // signout
      const handleSignout = async () => {
        try {
          const res = await fetch(`${DIVULGE}/blog/user/signout`, {
            method: 'POST',
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signoutSuccess());
            navigate('/');
          }
        } catch (error) {
          console.log(error.message);
        }
      };

  return (
    <>
      <div className="h-full bg-transparent p-8  font-Montserrat">
        <div className="bg-gray-100/75 dark:bg-slate-800/50 rounded-2xl shadow-xl border border-gray-500/25 pb-8">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {/* bg gif */}
            <div className=" w-full h-[150px] rounded-t-2xl bg-gradient-to-l to-teal-300/80 via-purple-500/80 from-blue-400/90 "></div>

            <div className="flex flex-col items-center -mt-20">
              {/* dont have to map */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                ref={fileSelector}
                hidden
              />

              <Tooltip
                content="Change profile picture"
                style="light"
                animation="duration-500"
                arrow={false}
              >
                <div
                  onClick={() => fileSelector.current.click()}
                  className="bg-purple-400 rounded-2xl"
                >
                  <img
                    src={
                      (profileImageUploadProgress &&
                        profileImageUploadProgress == 100 &&
                        imageUrl) ||
                      currentUser.profilePicture
                    }
                    className={`w-40 border-4 border-purple-400 rounded-2xl ${
                      profileImageUploadProgress &&
                      profileImageUploadProgress < 100 &&
                      "opacity-60"
                    }`}
                  />
                </div>
              </Tooltip>
              <div className="flex items-center space-x-2 mt-2">
                <p className=" font-ElsieSwash font-semibold text-2xl text-center py-2 lg:block font uppercase">
                <span className='text-transparent bg-clip-text bg-gradient-to-l to-teal-300 via-purple-400 from-blue-400'>{currentUser.username}</span>
                  
                </p>

                {/* bluetick */}
                <RiVerifiedBadgeFill className="text-blue-500" />
              </div>

              <p className="text-gray-800 dark:text-gray-300">Person</p>
            </div>

            <div className="flex-1 flex flex-col items-center lg:items-center justify-center px-8">
              
              {/* create post button */}


              {/* image uplaod message */}
              {profileImageUploadProgress && (
                <Alert color="info" icon={HiInformationCircle} className='mb-2'>Click 'Update' button to finish profile update</Alert>
              )}

              {/* image upload error */}
              {profileImageUploadError && (
                <Alert color="failure" icon={HiInformationCircle} >{profileImageUploadError}</Alert>
              )}

              {/* user update success */}
              {updateUserSuccess && (
                <Alert color="success" icon={FcOk}>{updateUserSuccess}</Alert>
              )}

              {/* user update failed */}
              {updateUserError && (
                <Alert color="warning" icon={HiInformationCircle} >{updateUserError}</Alert>
              )}

            </div>

            {/* personal info */}
            <div className="flex-1 bg-inherit rounded-lg p-8">
              <p className="text-xl text-purple-900 font-bold dark:text-purple-300">
                Personal Info
              </p>

              <ul className="mt-2 text-gray-700">
                <li className="flex border-y py-2 dark:border-gray-800">
                  <span className="font-semibold w-24 dark:text-gray-400">
                    User name:
                  </span>
                  <div className="relative z-0">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="peer block w-full appearance-none border-0 bg-transparent py-1 px-1 text-sm focus:outline-none focus:ring-0 dark:text-gray-200"
                      placeholder="Usernmae"
                      defaultValue={currentUser.username}
                      onChange={handleChange}
                    />
                  </div>
                </li>

                <li className="flex border-b py-2 dark:border-gray-800">
                  <span className="font-semibold w-24 dark:text-gray-400">
                    Email:
                  </span>
                  <div className="relative z-0">
                    <input
                      type="email"
                      id="email"
                      name="name"
                      className="peer block w-full appearance-none border-0 bg-transparent py-1 px-0 text-sm focus:outline-none focus:ring-0 dark:text-gray-200"
                      placeholder="Email"
                      defaultValue={currentUser.email}
                      onChange={handleChange}
                    />
                  </div>
                </li>

                <li className="flex border-b py-2 dark:border-gray-800">
                  <span className="font-semibold w-24 dark:text-gray-400">
                    Password:
                  </span>
                  <div className="relative z-0">
                    <input
                      type="password"
                      id="password"
                      name="name"
                      className="peer block w-full appearance-none border-0 bg-transparent py-1 px-0 text-sm focus:outline-none focus:ring-0 dark:text-gray-300"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                  </div>
                </li>

                <li className="flex border-b py-2 dark:border-gray-800">
                  <span className="font-semibold w-24 dark:text-gray-400 me-2">
                    Languages:
                  </span>
                  <span className="text-gray-700 dark:text-gray-200">
                    English
                  </span>
                </li>

                <li className="flex py-2 w-full">
                  {/* update button */}
                  <Button type="submit" color="purple" className="px-11 mt-4" disabled={loading || profileImageUploading}>
                  {loading ? 'Loading...' : 'Update'}
                  </Button>
                </li>
              </ul>
            </div>
            <div className="flex items-end justify-start ml-9 mt-28">
                {/* delete profile button */}
                <button
                  className="flex items-center hover:bg-red-600 dark:hover:bg-red-600/75 text-red-500 hover:text-gray-100 dark:hover:text-gray-200 px-3 py-2 rounded-lg font-bold text-sm space-x-2 hover:hover:scale-105  transition duration-300"
                  onClick={() => setShowModal(true)}
                >
                  <span>Delete Account</span>
                  <FaUserTimes />
                </button>
              </div>
          </form>

          {/* {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )} */}
        </div>
      </div>

      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(false)}
        popup
        className="bg-transparent backdrop-blur-sm "
      >
        <Modal.Header className="bg-slate-500 rounded-t-md " />
        <Modal.Body className="bg-slate-500 rounded-b-md">
          <div className="text-center bg-transparent">
            <FaUserShield className="mx-auto mb-4 h-16 w-16 text-red-500" />
            <p className="mb-5 text-lg font-normal text-gray-100 dark:text-gary-100">
              Are you sure you want to <span className='font-bold text-red-500'>delete</span> your Account?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={handleDeleteUser}
                className="w-full"
              >
                Delete <BiSolidTrashAlt className="h-5 w-5 mx-2" />
              </Button>
              <Button
                color="dark"
                onClick={() => setShowModal(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DashProfile