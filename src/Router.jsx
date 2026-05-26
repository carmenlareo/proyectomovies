import { Routes, Route } from 'react-router-dom'
import {Home} from './pages/Home/Home'
import {Explore} from './pages/Explore/Explore'
import {Likes} from './pages/Likes/Likes'
import {Profile} from './pages/Profile/Profile'
import {NavigationFooter} from './components/templates/NavigationFooter/NavigationFooter'


function Router() {
  return (
   <>
    
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Explore' element={<Explore />} />
        <Route path='/Likes' element={<Likes />} />
        <Route path='/Profile' element={<Profile />} />
      </Routes>
      <NavigationFooter />
    </>
  )
}

export default Router