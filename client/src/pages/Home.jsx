import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'; 
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=6`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=6`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=6`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div className=''>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl f'>
          Find your next <span className='text-orange-400'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-600 text-xs sm:text-sm'>
          Nestly is the best place to find your next perfect place to live
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link className='text-xs sm:text-sm text-green-700 font-bold hover:underline' to={`/search`}>
          Let's get started...
        </Link>
      </div>

      <Swiper navigation={true} spaceBetween={50} slidesPerView={1}>
        {offerListings && offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{ 
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover'
                }}
                className='h-[600px]'
              >
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings && offerListings.length>0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-700'>Recent offers</h2>
                <Link  to={`/search?offer=true`} className='text-xs sm:text-sm text-green-700 font-bold hover:underline'>
                show more offers...
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  offerListings.map((listing) =>{

                    return <ListingItem  listing={listing} key={listing._id}/>
                  
                  })
                }
              </div>

            </div>

          )
        }
        {
          rentListings && rentListings.length>0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-700'>Recent houses for rent</h2>
                <Link  to={`/search?type=rent`} className='text-xs sm:text-sm text-green-700 font-bold hover:underline'>
                show more houses for rent...
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  rentListings.map((listing) =>{

                    return <ListingItem  listing={listing} key={listing._id}/>
                  
                  })
                }
              </div>

            </div>

          )
        }
        {
          saleListings && saleListings.length>0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-700'>Recent houses for sale</h2>
                <Link  to={`/search?type=sale`} className='text-xs sm:text-sm text-green-700 font-bold hover:underline'>
                show more houses for sale...
                </Link>
              </div>
              <div className='flex flex-wrap gap-4'>
                {
                  saleListings.map((listing) =>{

                    return <ListingItem  listing={listing} key={listing._id}/>
                  
                  })
                }
              </div>

            </div>

          )
        }
      </div>
    </div>
  );
};

export default Home;
