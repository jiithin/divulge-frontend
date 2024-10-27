import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoSendSharp } from "react-icons/io5";
import { BiSolidCommentX, BiSolidLike } from "react-icons/bi";
import { BiSolidCommentEdit } from "react-icons/bi";
import { DIVULGE } from "../serverUrl.js"

  function Comments({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);

  //get user
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${DIVULGE}/blog/user/${comment.userId}`,{ credentials: 'include'});
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }

      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);


  //handle edit
  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${DIVULGE}/blog/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent,
        }),
        credentials: 'include',
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (

    <div className='flex p-4 border-b dark:border-gray-600 text-sm font-Montserrat'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className='w-10 h-10 rounded-full bg-gray-200 shadow-md'
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
          <span className='font-semibold mr-1 text-xs truncate'>
            {user ? `${user.username}` : 'deleted'}
          </span>
          <span className='text-gray-500 text-xs'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>



        {isEditing ? (
          <>
            <input
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            className="peer block w-full appearance-none border-0 bg-transparent py-1 px-0 text-sm focus:outline-none focus:ring-0 dark:text-gray-300 mb-2"
            />
            <div className='flex justify-end gap-2 text-xs'>
            <button
                type='button'
                size='sm'
                onClick={() => setIsEditing(false)}
                className=' text-purple-600 dark:text-purple-400 font-bold text-md'
              >
                Cancel
              </button>
              <button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                onClick={handleSave}
                className='px-4'
              >
                <IoSendSharp className='h-5 w-5 text-purple-600 dark:text-purple-400'/>
              </button>

            </div>
          </>
        ) : (
          <>
            <p className='text-gray-600 dark:text-gray-300 pb-2'>{comment.content}</p>
            <div className='flex items-center pt-2 text-xs max-w-fit gap-2'>
              <button
                type='button'
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-600 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  '!text-blue-600'
                }`}
              >
                <BiSolidLike className='text-sm' />
              </button>
              <p className='text-gray-400'>
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    ' ' +
                    (comment.numberOfLikes === 1 ? 'like' : 'likes')}
              </p>



              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isMod) && (
                  <>
                    <button
                      type='button'
                      onClick={handleEdit}
                      className='text-gray-400  hover:text-purple-600 px-1'
                    >
                      <BiSolidCommentEdit className='text-sm'/>
                    </button>
                    <button
                      type='button'
                      onClick={() => onDelete(comment._id)}
                      className='text-gray-400  hover:text-red-700 px-1'
                    >
                      <BiSolidCommentX className='text-sm'/>
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Comments