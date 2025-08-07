import React, { useRef, useEffect, useState } from 'react'
import { Loader } from '../index';
import { IoMdCloseCircle } from "react-icons/io";
import { useSelector } from 'react-redux';
import { getCodersList } from '../../firebase/codersService';
import { addTaskFirebase } from '../../firebase/addTaskService';
import { updateTaskFirebase } from '../../firebase/updateTaskService';
import { toast } from 'react-toastify';

function ViewTask({onClose, viewData }) {
    const {user}=useSelector((state)=>state.auth);
    const [loading,setLoading] = useState(true); 
    const [codersList, setCodersList] = useState([]);

    const backdropRef = useRef(null);

    const handleMouseDown = (e) => {
      setTimeout(() => {
        backdropRef.current.clickedOnBackdrop = e.target === backdropRef.current;
      }, 0);
    };

    const handleMouseUp = (e) => {
      if (backdropRef.current.clickedOnBackdrop && e.target === backdropRef.current) {
        onClose(); 
      }
    };

    useEffect(() => {
      if(viewData && viewData.coders.length > 0){
        const namesString = viewData?.coders
          ?.map(coder => coder.name?.toString?.() || '')
          .join(', ') || '';
        setCodersList(namesString);
      }
      setLoading(false);
    },[])
    

    return (
      <div ref={backdropRef} className='absolute bg-black bg-opacity-50 z-20 w-full h-full cursor-pointer'  onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <div className='absolute bg-white top-0 right-0 h-full w-96 p-4 overflow-y-auto cursor-auto' onMouseDown={(e) => e.stopPropagation()} onMouseUp={(e) => e.stopPropagation()} >
          <div className='flex justify-end mb-2'>
            <button onClick={onClose}><IoMdCloseCircle className='text-2xl'/></button>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">View Task</h2>

          {loading?(
            <>
              <div>
                <Loader color='text-blue' height='h-64'/>
              </div>
            </>
          ):(
            <>
              <div className='container mx-auto pt-5 pb-4 relative'> 

                <div className='mb-2'>
                  <h5 className='px-1 font-semibold'>Client Name : </h5>
                  <p className='px-1'>{viewData.clientLabel}</p>
                </div>

                <div className='mb-2'>
                  <h5 className='px-1 font-semibold'>Task Title : </h5>
                  <p className='px-1'>{viewData.title}</p>
                </div>

                <div className='mb-2'>
                  <h5 className='px-1 font-semibold'>Task Description : </h5>
                  <p className='px-1'>{viewData.description}</p>
                </div>

                <div className='mb-2'>
                  <h5 className='px-1 font-semibold'>Task Phase : </h5>
                  <p className='px-1'>{viewData.taskPhaseLabel}</p>
                </div>

                <div className='mb-2'>
                  <h5 className='px-1 font-semibold'>Task Status : </h5>
                  <p className='px-1'>{viewData.taskStatusLabel}</p>
                </div>

                <div className='mb-2'>
                  <h5 className='px-1 font-semibold'>Task Priority : </h5>
                  <p className='px-1'>{viewData.priorityLabel}</p>
                </div>

                <div className='mb-2'>
                  <h5 className='px-1 font-semibold'>Task Start Date : </h5>
                  <p className='px-1'>{viewData.startDate}</p>
                </div>

                <div className='mb-2'>
                  <h5 className='px-1 font-semibold'>Task End Date : </h5>
                  <p className='px-1'>{viewData.endDate}</p>
                </div>

                <div className='mb-2'>
                  <h5 className='px-1 font-semibold'>Coders : </h5>
                  {codersList && codersList.length > 0 && (
                    <>
                      <p className='px-1'>{codersList}</p>
                    </>
                  )}
                </div>
              </div>            
            </>
          )}
        </div>
      </div>
    )
}

export default ViewTask
