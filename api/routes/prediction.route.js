import express from 'express'
import axios from 'axios'
const router =express.Router();


router.post('/get-predicted-price', async (req, res) => {
    try {
        
        const { location, sqft, bath, bhk } = req.body;

        
        const response = await axios.post('http://127.0.0.1:8000/predict_price', {
            location,
            sqft,
            bath,
            bhk
        });

       
        const predictedPrice = response.data.predicted_price;

      
        res.json({ predicted_price: predictedPrice });
    } catch (error) {
        console.error('Error fetching predicted price:', error);
        res.status(500).json({ error: 'Failed to fetch predicted price' });
    }
});


export default router