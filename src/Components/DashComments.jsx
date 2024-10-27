import React from 'react'
import { Modal, Button, Card, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DIVULGE } from "../serverUrl.js"

function DashComments() {
    const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  //get comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${DIVULGE}/blog/comment/getcomments`, { credentials: 'include'});
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isMod) {
      fetchComments();
    }
  }, [currentUser._id]);

  //showmore
  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `${DIVULGE}/blog/comment/getcomments?startIndex=${startIndex}`,{ credentials: 'include'}
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //delete comment
  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `${DIVULGE}/blog/comment/deleteComment/${commentIdToDelete}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 max-w-[60rem] px-5 font-Montserrat'>
            <div className=" flex items-center justify-between">
        <p className="text-xl font-Montserrat font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-l to-blue-400 from-purple-600">All Comments</p>

      </div>
    {currentUser.isAdmin && comments.length > 0 ? (
      <>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell >Added</Table.HeadCell>
            <Table.HeadCell >Comment</Table.HeadCell>
            <Table.HeadCell >Likes</Table.HeadCell>
            <Table.HeadCell >PostId</Table.HeadCell>
            <Table.HeadCell >UserId</Table.HeadCell>
            <Table.HeadCell >Action</Table.HeadCell>
          </Table.Head>
          {comments.map((comment) => (
            <Table.Body className='divide-y' key={comment._id}>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{comment.content}</Table.Cell>
                <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                <Table.Cell>{comment.postId}</Table.Cell>
                <Table.Cell>{comment.userId}</Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setCommentIdToDelete(comment._id);
                    }}
                    className='font-semibold text-red-500 hover:underline cursor-pointer'
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        {showMore && (
          <button
            onClick={handleShowMore}
            className='w-full text-purple-500  self-center text-sm py-7'
          >
            Show more
          </button>
        )}
</>
         
        ) : (
          <p className='divulge text-center py-12 lg:text-3xl text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-l to-blue-400 from-purple-600 '>No comments to find.</p>
        )}

      
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size='md'
          className="bg-transparent backdrop-blur-sm "
        >
          <Modal.Header className="bg-slate-500 rounded-t-md " />
          <Modal.Body className="bg-slate-500 rounded-b-md " >
            <div className='text-center'>
              <p className='mb-5 text-lg text-gray-100 dark:text-gray-400'>
                Do you want to <span className='text-red-500 font-bold'>Remove</span> this Comment?
              </p>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteComment} 
                className='w-full' >
                  Delete
                </Button>
                <Button color='dark' onClick={() => setShowModal(false)}
                    className='w-full' >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        </div>
  )
}

export default DashComments