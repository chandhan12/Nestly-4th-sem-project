# Real Estate Application - Nestly
Home page
![home](https://github.com/chandhan12/Nestly-4th-sem-project/blob/master/projectImages/homepage.png)

Signup page
![signIn](https://github.com/chandhan12/Nestly-4th-sem-project/blob/master/projectImages/signup%20page.png)

signin page
![signup](https://github.com/chandhan12/Nestly-4th-sem-project/blob/master/projectImages/signin%20page.png)

continue with google page
![continue with google]()

profile page
![profile](
https://github.com/chandhan12/Nestly-4th-sem-project/blob/master/projectImages/profile%20page.png)

Create listing page
![listing](
https://github.com/chandhan12/Nestly-4th-sem-project/blob/master/projectImages/create%20listing%20page.png)

Detailed view of listing
![detailed view](https://github.com/chandhan12/Nestly-4th-sem-project/blob/master/projectImages/detiled%20view%20of%20listing.png)

Search page
![search page](
https://github.com/chandhan12/Nestly-4th-sem-project/blob/master/projectImages/searcch%20page.png)

Prediction page
![prediction page](https://github.com/chandhan12/Nestly-4th-sem-project/blob/master/projectImages/prediction.png)


## Overview

Welcome to Nestly, a full-featured real estate application where users can sign up, sign in, or continue with Google using OAuth. Once logged in, users can:

- View and update their profile (profile image, username, email, password)
- Delete their account
- Sign out
- Add, edit, or delete their listings
- View house details and contact owners via email
- Search for houses using filters (sale, rent, offer, parking, furnished)
- Predict house prices based on location, sqft, baths, and bedrooms

## Technologies Used

- **Frontend:** React + Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB
- **State Management:** Redux
- **Authentication and Image Storage:** Firebase
- **Machine Learning Model:** Python, Flask

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nestly.git
cd nestly
```

### 2. Install Dependencies
Navigate to the root folder and install the backend dependencies:
```bash
npm install
```

Then, navigate to the client folder and install the frontend dependencies:
```bash
cd client
npm install
```
### 3. Configure Environment Variables
Create a .env file in the client directory with the following content:

```bash
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Create a .env file in the root directory with the following content:
```bash
MONGO="mongodb url"
JWT_SECRET="secret key"
```

### 4. Running the Application
Start the backend server:
```bash
npm run dev
```

Navigate to the client folder and start the frontend:
```bash
cd client
npm run dev
```
### 5. Setting Up the Machine Learning Model
Create a virtual environment:
```bash
python3 -m venv myenv
```
```bash
source myenv/bin/activate
```

Install the required packages:
```bash
pip install -r requirements.txt
```

Run the Flask application:
```bash
python server.py
```

### Features 
 ## User Authentication
Users can sign up, sign in, or continue with Google using OAuth.


##  Profile Management
Users can update their profile image, username, email, and password. They can also delete their account.


 ## Adding and Managing Listings
Users can add, edit, or delete their listings with details such as name, description, address, number of bedrooms, bathrooms, price, sale or rent status, phone number, and images.


 ## Viewing Listings
Users can view houses for rent or sale. Clicking on a house shows its full details and provides an option to contact the owner via email.


 ## Search and Filters
Users can search for houses by name, description, address, and apply filters like sale, rent, offer, parking, and furnished status.


 ## House Price Prediction
Users can predict house prices by submitting details like location, sqft, baths, and bedrooms. Based on the predicted price, houses within that price range and location are displayed.

