import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SubmissionCard from './SubmissionCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissionsByTaskId } from '../ReduxToolkit/SubmissionSlice';
import { useLocation } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  // bgcolor: 'background.paper',
  // border: '2px solid #fff',
  // boxShadow: 24,
  p: 4,
};

const Submission=[1,1,1];
export default function SubmissionList({handleClose, open}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('taskId');
  const { Submissions } = useSelector(store => store); 


  React.useEffect(()=>{
    if(taskId){
      dispatch(fetchSubmissionsByTaskId(taskId))
    }
  },[taskId])


  console.log("submissions ", Submissions);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            {Submission.Submissions.length> 0? (
            <div className='space-y-2'>
              {Submission.Submissions.map((item) => (
              <SubmissionCard item= {item} /> 
            ))}
            </div> 
            ) : ( 
            <div className=''>
            <div className='text-center'> No Submission Found</div>
            </div>
            )}
            
          </div>
          
        </Box>
      </Modal>
    </div>
  );
}
