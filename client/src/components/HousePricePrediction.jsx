import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListingItem from './ListingItem';

const HousePricePrediction = () => {
  const [formData, setFormData] = useState({
    location: '',
    sqft: '',
    bath: '',
    bhk: '',
  });
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState(null);
  const [houses,setHouses]=useState([]);

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPredictedPrice(null);
    setError(null); 

    try {
      
      const response = await axios.post('/api/get-predicted-price', {
        location: formData.location,
        sqft: formData.sqft,
        bath: formData.bath,
        bhk: formData.bhk,
      });

      
      setPredictedPrice(response.data.predicted_price);
    } catch (err) {
      console.error('Error while fetching predicted price:', err);
      setError('Failed to fetch the predicted price. Please try again.');
    }
  };


  useEffect(() => {
    if (predictedPrice) {
      const fetchHouses = async () => {
        try {
          const res = await fetch(`/api/listing/get?type=sale&limit=6`);
          const data = await res.json();
          setHouses(data);
        } catch (error) {
          console.error('Error fetching houses:', error);
        }
      };

      fetchHouses();
    }
  }, [predictedPrice]);
 console.log(houses)

 const filteredListings=houses.filter((eachListing) =>eachListing.regularPrice <=Math.round(predictedPrice *100000)

 )

 console.log(filteredListings);

 const filteredHouses=filteredListings.filter((eachHouse) =>eachHouse.address.toLocaleLowerCase().includes(formData.location.toLocaleLowerCase()))

 console.log(filteredHouses);

  return (

    <>
    <div className="max-w-md mx-auto mt-5 bg-purple-100 shadow-md rounded-lg p-6">
      <h2 className="text-2xl text-green-700 font-semibold mb-4 text-center">Predict House Price</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Location"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Square Footage (sqft):</label>
          <input
            type="number"
            name="sqft"
            value={formData.sqft}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Square Footage"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Number of Bathrooms:</label>
          <input
            type="number"
            name="bath"
            value={formData.bath}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Number of Bathrooms"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Number of Bedrooms (BHK):</label>
          <input
            type="number"
            name="bhk"
            value={formData.bhk}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Number of Bedrooms"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600"
        >
          Predict Price
        </button>
      </form>

      {predictedPrice && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold">Predicted Price: ₹{predictedPrice} lakhs</h3>
        </div>
      )}

      {error && (
        <p className="mt-6 text-center text-red-600">
          {error}
        </p>
      )}

    </div>
    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
    {
          filteredHouses && filteredHouses.length>0  ? (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-700'>Houses based on predicted price</h2>
              
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  filteredHouses.map((listing) =>{

                    return <ListingItem  listing={listing} key={listing._id}/>
                  
                  })
                }
              </div>

            </div>

          ) : (
              <p>No houses found</p>
          )
        }

    </div>
    </>
    
  );
};

export default HousePricePrediction;
