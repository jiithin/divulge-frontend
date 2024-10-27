import React from 'react'
import { Alert, Button, FileInput, Select, Spinner, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useState } from 'react';
import { DIVULGE } from '../serverUrl.js'

import { PiPaperPlaneRightFill  } from "react-icons/pi";
import { IoMdCloudUpload } from "react-icons/io";
import { HiInformationCircle } from "react-icons/hi";


import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CreatePost() {
  const { currentUser } = useSelector((state) => state.user);
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
  
    const navigate = useNavigate();

    //console.log(formData);
//  can tput handle image inside handle submit bcoz handle submit async functn , try another way or set if file exist in handle submit
const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL, username: currentUser.username, userProfile: currentUser.profilePicture, });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${DIVULGE}/blog/post/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  
  return (
    <>
    <div className='p-3 max-w-6xl mx-auto min-h-screen font-Montserrat'>
      <p className='text-center lg:text-3xl text-xl  font-semibold my-7 '><span className='text-transparent bg-clip-text bg-gradient-to-l to-blue-300 from-purple-500'>Create a post</span></p>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

        {/*image upload error alerts */}
      {imageUploadError && <Alert color='failure' className='items-center' icon={HiInformationCircle} >{imageUploadError}</Alert>}

      {/* post publist error alert */}
      {publishError && (
          <Alert color='failure' className='items-center mt-1' icon={HiInformationCircle}>
            {publishError}
          </Alert>
        )}

        <div className='flex gap-4 justify-between'>

            {/* small devices */}
            {/* <div className=" lg:hidden md:hidden flex justify-between">
            <input
            type='text'
            placeholder='Post Title'
            required
            id='title'
            className='flex-1 peer block w-full appearance-none border-0 bg-transparent py-1 px-2 text-sm focus:outline-none focus:ring-0 font-semibold dark:text-gray-100'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <button type='submit' className=' mx-3 bg-purple-600 w-auto h-10 px-5 font-semibold text-white rounded-md'>
          Publish
        </button>
            </div> */}

          {/* large devices */}

          <input
            type='text'
            placeholder='Post Title'
            required
            id='title'
            className='flex-1  peer w-full appearance-none border-0 bg-transparent py-1 px-2 text-sm focus:outline-none focus:ring-0 font-bold dark:text-gray-100'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          
          
          {/* <button type='button' className='hover:bg-gray-100 hover:text-gray-700 font-semibold w-auto h-11 px-5 dark:text-white dark:hover:text-gray-800 rounded-md'
          onClick={() => { setFormData({});window.location.reload();}}>
          Cancel
        </button> */}
          <button type='submit' className='  bg-purple-600 w-auto h-11 px-5 font-semibold text-white rounded-md'>
          <span className='flex items-center hover:translate-x-1  transition duration-300'>
            Publish <PiPaperPlaneRightFill className='ms-2' /></span>
        </button>

          
        </div>

        

        {/* post-input */}
        <ReactQuill
          theme='snow'
          placeholder='Write content here...'
          className='h-72 mb-12 shadow-xl'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />


          {/* image preview */}
    {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover rounded-lg'
          />
        )}

        

        <div className="flex gap-4 justify-between">
         {/* category */}
          <Select
          className='w-48'
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            
          >
            <option value='uncategorized' >Add Category</option>
            <option value='Technology'>Technology</option>
            <option value='Travel'>Travel</option>
            <option value='Food'>Food</option>
            <option value='Fashion'>Fashion</option>
            <option value='Sports'>Sports</option>
            <option value='Fitness'>Fitness</option>
            <option value='Eduction'>Eduction</option>
          </Select>


          {/* images upload */}
          <div className='flex gap-4 items-center justify-between'>
          <FileInput
            type='file'
            accept='image/*'
            className='bg-transparent'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            size='sm'
            outline
            color='purple'
            className='h-10'
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
             <Spinner color="purple" aria-label="Purple spinner example" size="md"/>
            ) : (
              <IoMdCloudUpload className=' h-5 w-5 text-purple-800 group-hover:text-white dark:text-white'/>
            )}
            
            
          </Button>
        </div>
        
        {/* {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )} */}

    </div>
  

                  {/* <button type='button' className='hover:bg-gray-100 hover:text-gray-700 font-semibold w-auto h-11 px-5 dark:text-white dark:hover:text-gray-800 rounded-md'
          onClick={() => { setFormData({});window.location.reload();}}>
          Cancel
        </button> */}

        <p className='flex justify-center text-gray-400 mt-12 px-5'><HiInformationCircle className='h-5 w-5 mt-1 me-2 text-blue-300'/>  Upload image to cloud before publishing.</p>
      </form>
    </div>
    </>
  )
}

export default CreatePost