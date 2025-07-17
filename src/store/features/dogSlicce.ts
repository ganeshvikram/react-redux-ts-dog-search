/*steps

1. initial state interface
2. async trunks for reducers
3. create createSlice
   -- namespacee
   -- initial state 
   -- reducers 
   -- extra reducer 
      --  Pending
      -- fillfilled 
      -- rejected  

      */
import type { RootState } from '../store'; 
import { createSlice, type PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { registerThunks } from "../../utils/registerThunks";
import { fetchDogBreedimages,fetchDogsSubBreeds,fetchDogsBreeds } from "../../services/dogService";




export interface ReducerState{
  breedList: string[];
  subBreedList: string[];
  breed: string;
  subBreed: string;
  number: number;
  imageResults: string[];
  error: boolean;
  loading: boolean;

}

const initialState: ReducerState = {
    breedList: [],
    subBreedList: [],
    breed: 'all',
    subBreed: 'all',
    number: 1,
    imageResults: [],
    error: false,
    loading: false,
  };

  export const fetchBreeds = createAsyncThunk(
    'dogs/fetchDogs',
    async () => {
      ///const params = new URLSearchParams(filters as any).toString();
      const res = await fetchDogsBreeds();

      return res;
    }
  );

  export const fetchSubBreeds  = createAsyncThunk(
    'dogs/fetchSubBreeds',
    async ( filters: { breed : string}) => {
        console.log(filters.breed);
      ///const params = new URLSearchParams(filters as any).toString();
      const res = await fetchDogsSubBreeds(filters.breed);
      return res;
    }
  );

  export const fetchDogswithImages = createAsyncThunk(
    'dogs/fetchDogswithImages',
    async (_,thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
      ///const params = new URLSearchParams(filters as any).toString();
      const res = await fetchDogBreedimages(state.dogs.breed,state.dogs.subBreed,state.dogs.number);

      return res;
    }
  );

  const dogSplice = createSlice({
      name:"dog",
      initialState,
      reducers:{
        setBreedList(state, action: PayloadAction<string>) {
            
            state.breed = action.payload;
          },
          setSubBreedList(state, action: PayloadAction<string>) {
            state.subBreed = action.payload;
          },
          setBreed(state, action: PayloadAction<string>) {
            state.breed = action.payload;
          },
          setSubBreed(state, action: PayloadAction<string>) {
            state.subBreed = action.payload;
          },
          setNumber(state, action: PayloadAction<number>) {
            state.number = action.payload;
          },
          setImageResults(state, action: PayloadAction<string[]>) {
            state.imageResults = action.payload;
          },
          setError(state, action: PayloadAction<boolean>) {
            state.error = action.payload;
          },
          resetState(state) {
            state = {
              breedList: state.breedList,
              subBreedList: [],
              breed: 'all',
              subBreed: 'all',
              number: 1,
              imageResults: [],
              error: false,
              loading: false,
            }
            return state;
          },

      },
      extraReducers: (builder) => {
        registerThunks(builder, [
          {
            thunk: fetchBreeds,
            handlers: {
              pending: (state) => {
                state.loading = true;
              },
              fulfilled: (state, action) => {
                console.log('Payload:', action.payload);
                state.breedList = action.payload;
                state.loading = false;
              },
              rejected: (state, action) => {
                state.error = action.error.message || 'Fetch failed';
                state.loading = false;
              },
            },
          },
          {
            thunk: fetchSubBreeds,
            handlers: {
              pending: (state) => {
                state.loading = true;
              },
              fulfilled: (state, action) => {
                state.subBreedList = action.payload;
                state.loading = false;
              },
              rejected: (state, action) => {
                state.error = action.error.message || 'Fetch failed';
                state.loading = false;
              },
            },
          },
          {
            thunk: fetchDogswithImages,
            handlers: {
              pending: (state) => {
                state.loading = true;
              },
              fulfilled: (state, action) => {
                state.imageResults = action.payload;
                state.loading = false;
              },
              rejected: (state, action) => {
                state.error = action.error.message || 'Fetch failed';
                state.loading = false;
              },
            },
          }
          
        ]);
      },

  })


  export const {
    setBreedList,
    setSubBreedList,
    setBreed,
    setSubBreed,
    setNumber,
    setImageResults,
    setError,
    resetState,
  } = dogSplice.actions;
  
  export default dogSplice.reducer;
