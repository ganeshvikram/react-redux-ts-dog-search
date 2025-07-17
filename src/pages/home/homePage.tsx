import React, { useState } from 'react'
import { Select } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store/store';
import { useEffect, useRef } from 'react';
import { fetchBreeds, fetchSubBreeds, setBreed, setSubBreed, setNumber, fetchDogswithImages,resetState } from '../../store/features/dogSlicce';




export const HomePage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [breedName,setBreedname] = useState('')
  const inputNumber = useRef<HTMLInputElement>(null);
  const { breedList, loading, breed, subBreedList, subBreed, number, imageResults } = useSelector((state: RootState) => state.dogs);

  const setSelectedBreed = async (value: string) => {
    dispatch(setBreed(value));
  }

  const setSelectedSubBreed = async (value: string) => {
    dispatch(setSubBreed(value));
  }

  const setChangeNumber = async () => {
    if (inputNumber.current) {
      dispatch(setNumber((Number(inputNumber.current.value))));
    }
  }

  const clearSearch = async () => {
    if (inputNumber.current) {
      dispatch(resetState());
    }
  }

  const capitalizeFirstLetter = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  useEffect(() => {
    if (breed != 'all') {
      dispatch(fetchSubBreeds({ breed: breed }));
    }
    dispatch(setSubBreed('all'));
  }, [breed]);

  useEffect(() => {
    dispatch(fetchBreeds());
  }, [dispatch]);

  const breedOptions = Object.keys(breedList).map((breed) => ({
    value: breed,
    label: breed,
  }));

  const subBreedOptions = subBreedList?.map((Subbreed) => ({
    value: Subbreed,
    label: Subbreed,
  })) || {};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload
    
    dispatch(fetchDogswithImages()) || [];
    setBreedname(breed)

  };




  return (
    <div>
      <main id="content">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-100 p-6 rounded-lg text-center max-w-xl mx-auto mt-10 shadow">
          <p className="text-lg font-semibold   mb-4 italic ">
            This is a Dog App built with React JS using the Dog API. 
          </p>
          <ul className="text-base space-y-1 font-mono ">
            <li>The app uses:</li>
            <li>ReactJS & TypeScript</li>
            <li>Redux for State Management</li>
            <li>Axios for fetching Data</li>
            <li>Tailwind Components</li>
            <li>Unit Tests With Jest & React Testing Library</li>
          </ul>
        </div>
          <div className={`py-10 min-h-screen min-w-[300px] bg-white ${imageResults.length ? 'float-left' : ''}`}>



            <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-gray-200  p-8 rounded-sm">
              <Select
                id="breed"
                label="Dog Breed"
                options={breedOptions}
                value={breed}
                onChange={setSelectedBreed}
                loading={loading}
                placeholder="Choose Breed"
              />
              {breed && subBreedOptions.length > 0 && <Select
                id="subbreed"
                label="Dog Sub Breed"
                options={subBreedOptions}
                value={subBreed}
                onChange={setSelectedSubBreed}
                loading={loading}
                placeholder="All"
              />}


              <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Photo Number
              </label>



              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                id="number"
                value={number}
                onChange={setChangeNumber}
                ref={inputNumber}
                min={0}
                max={20}
                step={1}
              />


              <div>
                <button
                  type="submit"
                  disabled={!(breed && breed !== 'all' && number)} // disable button if condition fails
                  className={`text-white m-8 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 
                  ${breed && breed !== 'all' && number
                      ? 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                      : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                  Search Dogs
                </button>
                <button type="button" onClick = {clearSearch} className="text-white m-8 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Clear Search</button>
              </div>

            </form>


          </div>
          { (imageResults.length>0)  && <div className="py-10 min-h-screen bg-white pl-24 ">
              <h1 className="text-3xl font-bold text-left mb-8 text-cyan-200-50 ">
                <div className=" bg-pink-300 p-4">
                  <span > 🐶 {capitalizeFirstLetter(breedName)} Dogs Gallery</span> <span className="text-xl font-bold text-right md:float-right">Total pictures: <span className="font-semibold">{12}</span></span>
                </div>
              </h1>

              <div>
                <div className="flex flex-wrap gap-4 justify-center">
                  {loading && `Finding Dogs Images...`}
                  {!loading && imageResults.map((result, index) => (
                    <div
                      key={index}
                      className="w-40 h-40 rounded overflow-hidden shadow-lg bg-white"
                    >
                      <img
                        className="w-full h-full object-cover object-center"
                        src={result}
                        alt={`Dog ${index + 1}`}
                      />
                    </div>
                  ))}


                </div>

              </div>
            </div>}

          </div>
          
      </main>
    </div>
  )
}
