import './App.css'
import BelowHeroSection from './components/BelowHeroSection'
import Blogs from './components/Blogs'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import PopularProducts from './components/PopularProducts'
import Products from './components/Products'
import ShippingSection from './components/ShippingSection'
import SwiperSection from './components/customerSay/SwiperSection'

function App() {

  return (
    <>
      <Navbar/>
      <HeroSection/>
      <BelowHeroSection/>
      <Products/>
      <ShippingSection/>
      <PopularProducts/>
      <SwiperSection/>
      <Blogs/>
    </>
  )
}

export default App
