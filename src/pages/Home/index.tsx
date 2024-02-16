import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { findAllShiftsService } from '../../infra/services/findAllShiftsService';
import { IQuestionOneShift } from '../../domain/entities/IQuestionOneShift';
import { format } from 'date-fns';
import { ICompareTwoShiftsDTOOutput } from '../../domain/dtos/ICompareTwoShiftsDTOOutput';
import { compareTwoShifts } from '../../infra/services/compareTwoShifts';
import { findRemainingJobs } from '../../infra/services/findRemainingJobs';
import { findPossibleJobsForNurses } from '../../infra/services/findPossibleJobsForNurses';
import { findBestFitForJobs } from '../../infra/services/findBestFitForJobs';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shifts, setShifts] = useState<IQuestionOneShift[]>([]);
  const [selectedButtons, setSelectedButtons] = useState<IQuestionOneShift['shiftId'][]>([]);
  const [comparison, setComparison] = useState<ICompareTwoShiftsDTOOutput>();

  function handleError(errorMessage: string) {
    toast.error(errorMessage, {
      theme: 'colored'
    });
  }

  function handleSuccess(message: string) {
    toast.success(message, {
      theme: 'colored'
    });
  }
 
  async function handleCompare() {
    setIsLoading(true);
    try {
      if (selectedButtons.length < 2) return handleError('You need to select two shifts.')

      const [firstShift, secondShift] = selectedButtons;
      const result = await compareTwoShifts({
        firstShift, secondShift
      });

      setComparison(result)
      handleSuccess('Comparison succeeded!')
    } catch (error) {
      handleError('Unexpected error.');
    } finally {
      setIsLoading(false);
    }
  }
  
 
  async function handleRunQuery(queryService: () => Promise<any>, queryIdentifier: number) {
    setIsLoading(true);
    try {
      const result = await queryService();
      console.log(`QUERY ${queryIdentifier} RESULT `, result)
      handleSuccess('Query succeeded!')
    } catch (error) {
      handleError('Unexpected error.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleButtonClick(buttonId: IQuestionOneShift['shiftId']) {
    if (selectedButtons.includes(buttonId)) {
      setSelectedButtons(selectedButtons.filter(id => id !== buttonId));
    } else {
      if (selectedButtons.length < 2) {
        setSelectedButtons([...selectedButtons, buttonId]);
      } else {
        setSelectedButtons([selectedButtons[0], buttonId]);
      }
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const _shifts = await findAllShiftsService()
        setShifts(_shifts)
      } catch (error){
        console.error(error)
      }
    })()
  }, [])

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      {isLoading ?
        <div className="fixed w-screen h-screen bg-opacity-80 bg-black flex items-center justify-center">
          <ReactLoading type="spin" color="white" height={100} width={100} />
        </div>
      : null}
      <header className="mt-16">
        <h1 className="text-center text-blue text-2xl font-black mb-8">
          Bravo Test
        </h1>
        <img src="/nurse.png" alt="App Logo" className="w-32 h-32 mb-5" />
      </header>
      <section className="flex flex-col items-center">
        <h2 className="text-center text-blue text-xl font-semibold">
          Shift Comparison
        </h2>
        <hr className="border-gray-300 my-4 w-64" />
        <div className="flex flex-row w-screen items-center justify-around mt-8">
          <div className="flex flex-col">
            <p>Overlap Minutes: {comparison?.overlapMinutes !== undefined ? comparison.overlapMinutes : '-'}</p>
            <p>Max Overlap Threshold: {comparison?.maximumOverlapThreshold !== undefined ? comparison.maximumOverlapThreshold : '-'}</p>
            <p>Exceeds Overlap Threshold: {comparison?.exceedsOverlapThreshold !== undefined ? String(comparison.exceedsOverlapThreshold) : '-'}</p>
          </div>
          <button 
            className="h-10 px-6  mb-3 flex justify-center items-center font-semibold rounded-md bg-orange-500 hover:bg-orange-600 transition-all ease-in text-white"
            onClick={handleCompare}
          >
            <p>Submit</p>
          </button> 
        </div>
      </section>
      <div className="grid grid-cols-3 gap-4 mt-8 pl-8 pr-8">

        {shifts.map(_shift => {
          return <button
            key={_shift.shiftId}
            className={`p-4 rounded-md flex flex-col ease-in transition-all focus:outline-none ${
              selectedButtons.includes(_shift.shiftId) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleButtonClick(_shift.shiftId)}
          >
            <p className="font-bold">{_shift.facilityName}{'\n'}</p>
            <p>{format(new Date(_shift.shiftDate), 'yyyy-MM-dd')}{'\n'}</p>
            <p>{`${_shift.startTime} - ${_shift.endTime}`}</p>
          </button>
        })}
      </div>
      <section className="flex flex-col items-center mt-8">
        <h2 className="text-center text-blue text-xl font-semibold">
          Queries
        </h2>
        <hr className="border-gray-300 my-4 w-64" />
      </section>
      <button 
        className="h-10 px-8 mb-3 py-6 flex justify-center items-center font-semibold rounded-md bg-orange-500 hover:bg-orange-600 transition-all ease-in text-white"
        onClick={() => handleRunQuery(findRemainingJobs, 4)}
      >
        <p>Query 4</p>
      </button>
      <button 
        className="h-10 px-8  mb-3 py-6 flex justify-center items-center font-semibold rounded-md bg-orange-500 hover:bg-orange-600 transition-all ease-in text-white"
        onClick={() => handleRunQuery(findPossibleJobsForNurses, 5)}
      >
        <p>Query 5</p>
      </button>
      <button 
        className="h-10 px-8  mb-3 py-6 flex justify-center items-center font-semibold rounded-md bg-orange-500 hover:bg-orange-600 transition-all ease-in text-white"
        onClick={() => handleRunQuery(findBestFitForJobs, 6)}
      >
        <p>Query 6</p>
      </button>
    </div>
  )
}

export default Home;