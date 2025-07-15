import React from 'react'
import { Select } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store/store';
import { useEffect } from 'react';
import { fetchBreeds, fetchSubBreeds ,setBreed, setSubBreed} from '../../store/features/dogSlicce';




export const HomePage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { breedList, loading, breed , subBreedList , subBreed } = useSelector((state: RootState) => state.dogs);

  const setSelectedBreed = async (value: string) => {
      dispatch(setBreed(value));  
  }

  const setSelectedSubBreed = async (value: string) => {
      dispatch(setSubBreed(value)); 
  }
  useEffect(() => {
    if(breed !='all'){
      dispatch(fetchSubBreeds({breed:breed}));
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
  }))|| {};




  return (
    <div>
        <main id="content">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-10 min-h-screen bg-white">
                        
                <form className="max-w-sm mx-auto bg-gray-200  p-8 rounded-sm">
                  <Select
                    id="breed"
                    label="Dog Breed"
                    options={breedOptions}
                    value={breed}
                    onChange={setSelectedBreed}
                    loading={loading}
                    placeholder="Choose a breed"
                  />
                 { breed && subBreedOptions.length>0 && <Select
                    id="subbreed"
                    label="Dog Sub Breed"
                    options={subBreedOptions}
                    value={subBreed}
                    onChange={setSelectedSubBreed}
                    loading={loading}
                    placeholder="Choose a breed"
                  />}
                


                  <button type="button" className="text-white m-8 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search Dogs</button>
                  <button type="button" className="text-white m-8 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Clear Search</button>

                </form>

            </div>
        </div>
        </main>
    </div>
  )
}
