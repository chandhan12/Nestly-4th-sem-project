import { BrowserRouter,Routes,Route } from "react-router-dom" 
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import PrivatrRoute from "./components/PrivatrRoute"
import CreateListing from "./pages/CreateListing"
import UpdateListing from "./pages/UpdateListing"
import Listing from "./pages/Listing"
import Search from "./pages/Search"
import HousePricePrediction from "./components/HousePricePrediction"


const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/about" element={<About />} />
     <Route path="/search" element={<Search />} />
     <Route path="/Signin" element={<SignIn />} />
     <Route path="/SignUp" element={<SignUp />} />
     <Route path="/Listing/:listingId" element={<Listing />} />
     
      <Route element={<PrivatrRoute />}>
     <Route path="/profile" element={<Profile />} />
     <Route path="/create-listing" element={<CreateListing />} />
     <Route path="/update-listing/:listingId" element={<UpdateListing />} />
     <Route path="/prediction-page" element={<HousePricePrediction />} />
     </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
