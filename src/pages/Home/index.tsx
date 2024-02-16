import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { findAllShiftsService } from '../../infra/services/FindAllShiftsService';
import { IQuestionOneShift } from '../../domain/entities/IQuestionOneShift';
import { format } from 'date-fns';

const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shifts, setShifts] = useState<IQuestionOneShift[]>([])
  const [selectedButtons, setSelectedButtons] = useState<IQuestionOneShift['shiftId'][]>([])

  const navigate = useNavigate();

  function handleError(errorMessage: string) {
    toast.error(errorMessage, {
      theme: 'colored'
    });
  }

  function handleSuccess(name: string) {
    toast.success(`Hi, ${name}!`, {
      theme: 'colored'
    });
  }
 
  async function handleGetRepositories() {
    
  }

  useEffect(() => {
    (async () => {
      console.log('🖼️ BEFORE')
      try {

        const _shifts = await findAllShiftsService()
        console.log('🖼️',{_shifts})
        setShifts(_shifts)
      } catch (error){
        console.error('🖼️ ', error)
      }
    })()
  }, [])

  function handleButtonClick(buttonId: IQuestionOneShift['shiftId']) {
    console.log('⚠️🖼️', {buttonId, selectedButtons})
    if (selectedButtons.includes(buttonId)) {
      setSelectedButtons(selectedButtons.filter(id => id !== buttonId));
    } else {
      if (selectedButtons.length < 2) {
        setSelectedButtons([...selectedButtons, buttonId]);
      } else {
        toast.warning('You can only select two at a time.', {
          theme: 'colored'
        });
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="text-center text-blue text-2xl font-black">
        Bravo Test
      </h1>
      <div className="grid grid-cols-3 gap-4 mt-16 pl-8 pr-8">
        {shifts.map(_shift => {
          return <button
            key={_shift.shiftId}
            className={`p-4 rounded-md flex flex-col ease-in transition-all focus:outline-none ${
              selectedButtons.includes(_shift.shiftId) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleButtonClick(_shift.shiftId)}
          >
            <p className="font-bold">{_shift.facilityName}{'\n'}</p>
            <p>{format(new Date(_shift.shiftDate), 'yyyy-mm-dd')}{'\n'}</p>
            <p>{`${_shift.startTime} - ${_shift.endTime}`}</p>
          </button>
        })}
      </div>
    </div>
  )
}

export default Home;