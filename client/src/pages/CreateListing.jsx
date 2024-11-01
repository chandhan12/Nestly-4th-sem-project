import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import  { useState } from 'react'
import { app } from '../firebase';
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const CreateListing = () => {
    const {currentUser}=useSelector(state => state.user)
    const [files, setFiles]=useState([]);
    const [formData,setFormData]=useState({
        imageUrls:[],
        name:"",
        description:"",
        address:" ",
        type:"rent",
        bedRooms:1,
        bathrooms:1,
        regularPrice:3500,
        discountPrice:0,
        offer:false,
        parking:false,
        furnished:false,
        phoneNo:91,
    });
    const [imageUploadError,setImageUploadError]=useState(false);
    const [uploading,setUploading]=useState(false);
    const[error,setError]=useState(false);
    const [loading,setLoading]=useState(false);

    const navigate=useNavigate();
    

    const handleImageSubmit=(e) =>{
       if(files.length>0 && files.length + formData.imageUrls.length <7){
        setUploading(true);
        setImageUploadError(false)
            const promises =[] ;

            for (let i=0; i<files.length; i++){
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) =>{
                setFormData({ ...formData,imageUrls: formData.imageUrls.concat(urls)});
                setImageUploadError(false);
                setUploading(false)
               
            }).catch((err) =>{
                setImageUploadError('image upload failed (2mb max per image');
                setUploading(false)
            });
       }
       else{
        setImageUploadError("you can only upload 6 images per listing")
        setUploading(false)
       }
    };

    const storeImage=async (file) =>{
        return new Promise((resolve,reject) =>{
            const storage =getStorage(app);
            const fileName=new Date().getTime() +file.name;
            const storageRef=ref(storage,fileName);
            const uploadTask=uploadBytesResumable(storageRef,file);
            uploadTask.on(
                "state_changed",
                (snapshot) =>{
                    const progress=
                    Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                    console.log(`upload is ${progress}% done`)
                },
                (error) =>{
                    reject(error);
                },
                () =>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        resolve(downloadURL)
                    });
                }
            )
        });
    }

    const handleRemoveImage=(index) =>{
        setFormData({
            ...formData,
            imageUrls:formData.imageUrls.filter((_,i) => i !== index),
        })
    }

    const handleChange =(e) =>{

       
        if(e.target.id === 'sale' || e.target.id==='rent'){
           
            setFormData({
                ...formData,
                type:e.target.id
            })
        }

        if(e.target.id=== 'parking' || e.target.id==='furnished' || e.target.id==='offer'){
            setFormData({
                ...formData,
                [e.target.id]:e.target.checked
            })
        }
        if(e.target.type === 'number' || e.target.type==='text' ||e.target.type==='textarea'){
            setFormData({
                ...formData,
                [e.target.id]:e.target.value
            })
        }
       

    }

    const handleSubmit= async (e) =>{
        e.preventDefault();
       try {
        if(formData.imageUrls<1) return setError('you must upload at least one image');
        if(+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower than regular price')
        setLoading(true)
        setError(false)
        const res=await fetch('/api/listing/create',{
            method:'POST',
            headers:{
                'content-Type':'application/json',
            },
            body:JSON.stringify({
                ...formData,

                useRef:currentUser._id,
            }),
        });
        const data=await res.json();
        setLoading(false)
        if(data.success=== false){
            setError(data.message);
        }

        navigate(`/listing/${data._id}`)
       } catch (error) {
        setError(error.message);
        setLoading(false);
       }

    }
  return (
    <main className='p-3 max-w-4xl mx-auto'>
     <h1 className='text-3xl font-semibold text-center my-7'>create a listing</h1>
     <form className='flex flex-col sm:flex-row gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 flex-1'>
            <input onChange={handleChange} value={formData.name} type="text" placeholder='Name' className='border p-3 rounded-lg' maxLength='62' minLength='10' id='name' required /> 
            <input onChange={handleChange} value={formData.description} type="text" placeholder='Description' className='border p-3 rounded-lg'  id='description' required /> 
            <input onChange={handleChange} value={formData.address} type="text"  className='border p-3 rounded-lg' id='address' required  placeholder='Address'/> 


            <div className='flex gap-6 flex-wrap'>
               <div className='flex gap-2'>
               <input  className='w-5' type="checkbox" id="sale" name="type" checked={formData.type === 'sale'} onChange={handleChange} />
               <span>sell</span>
               </div>

               <div className='flex gap-2'>
               <input  className='w-5 'type="checkbox" id="rent" name="type" checked={formData.type === 'rent'} onChange={handleChange} />
               <span>Rent</span>
               </div>

               <div className='flex gap-2'>
               <input type="checkbox" id='parking' className='w-5' onChange={handleChange} checked={formData.parking}/>
               <span>parking spot</span>
               </div>

               <div className='flex gap-2'>
               <input type="checkbox" id='furnished' className='w-5' onChange={handleChange} checked={formData.furnished} />
               <span>Furnished</span>
               </div>

               <div className='flex gap-2'>
               <input type="checkbox" id='offer' className='w-5' onChange={handleChange} checked={formData.offer} />
               <span>offer</span>
               </div>
            </div>
            <div className='flex flex-wrap gap-6' >
                <div className=' flex items-center gap-2'>
                    <input type='Number' id='bedRooms' min='1' max='10' required
                    className='p-3 border border-gray-300 rounded-lg ' onChange={handleChange} value={formData.bedRooms}  />
                    <p>Bedrooms</p>
                </div>

                <div className=' flex items-center gap-2'>
                    <input type='Number' id='bathrooms' min='1' max='10' required
                    className='p-3 border border-gray-300 rounded-lg ' onChange={handleChange} value={formData.bathrooms} />
                    <p>Bathrooms</p>
                </div>

                <div className=' flex items-center gap-2'>
                    <input type='Number' id='regularPrice' min='3500' max='1000000000' required
                    className='p-3 border border-gray-300 rounded-lg ' onChange={handleChange} value={formData.regularPrice} />
                   <div className='flex flex-col items-center'>
                   <p>RegularPrice </p>
                   <span className='text-xs'>(Rs/month)</span>
                   </div>
                </div>
                {formData.offer && (

                    <div className=' flex items-(center gap-2'>
                    <input type='Number' id='discountPrice' min='0' max='1000000000' required
                    className='p-3 border border-gray-300 rounded-lg ' onChange={handleChange} value={formData.discountPrice} />
                    <div className='flex flex-col items-center'>
                    <p>Discounted price </p>
                    <span className='text-xs'>(Rs/month)</span>
                    </div>
                    </div>
                )}
                

                <div className=' flex items-center gap-2'>
                    <input type='Number' id='phoneNo' required placeholder='+91...'
                    className='p-3 border border-gray-300 rounded-lg ' onChange={handleChange} value={formData.phoneNo} />
                    <p>Phone No.</p>
                </div>
            </div>

            <div className='flex flex-col flex-1 gap-4'>
            <p className='font-semibold'>Images:
            <span className='font-normal text-gray-600 ml-2'>
                The first image will be cover (max 6)
            </span>
            </p>
            <div className='flex gap-4'>
                <input onChange={(e) =>setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' 
                type="file" id='images' accept='images/*' multiple  />
                <button onClick={handleImageSubmit} disabled={uploading}  type="button" className='p-3 text-green-700 border border-green-700 ronded-lg uppercase 
                hover:shadow-xl disabled:opaacity-80'>
                   {uploading ? 'uploading...' : 'upload'}
                </button>

            </div>
            <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError }</p>

            {
                formData.imageUrls.length> 0 && formData.imageUrls.map((url,index) =>{
                    return <div key={url} className='flex justify-between p-3 border items-center'>
                     <img key={url}  src={url} alt='listing image' className='w-20 h-20 object-contain rounded-lg'/>
                     <button type="button"  onClick={() =>handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>delete</button>
                    </div>  
                  

                })
            }
            </div>
            <button disabled={loading || uploading } className='p-3 bg-slate-700 rounded-lg uppercase
             hover:opacity-95 disabled:opacity-80'>{loading ? 'creating ...' : 'creating listing'} </button>
             {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
       
     </form>
    </main>
  )
}

export default CreateListing 