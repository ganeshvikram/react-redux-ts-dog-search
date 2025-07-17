import axios from "axios";

const headers = {
    "Content-Type": "application/json",
  };

export const fetchDogsBreeds = async() =>{
    try{
        const res = await axios.get(`https://dog.ceo/api/breeds/list/all`);
        console.log(res)
        return res?.data.message;

    }catch(err){
        if(err instanceof Error){
            console.log(err, "error message");

        }else{
            console.log("unexpected Error", err);
        }

    }
}

export const fetchDogsSubBreeds = async( breed:string ) =>{
    try{
        const res = await axios.get(`https://dog.ceo/api/breed/${breed}/list`);
        return res?.data.message;

    }catch(err){
        if(err instanceof Error){
            console.log(err, "error message");

        }else{
            console.log("unexpected Error", err);
        }

    }
}

export const fetchDogBreedimages = async(breed:string,subbreed:string,number:number) =>{
    try{

        let Url = (subbreed!='all')?breed+'/'+subbreed:breed;
        
        const res = await axios.get(`https://dog.ceo/api/breed/${Url}/images/random/${number}`,{headers});
        return res?.data.message;

    }catch(err){
        if(err instanceof Error){
            console.log(err, "error message");

        }else{
            console.log("unexpected Error", err);
        }

    }
}