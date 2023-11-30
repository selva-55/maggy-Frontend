
import './cityhotels.css'
import logoswiggy from '../../assets/swiggy-logo.svg'
import Cart from '../../assets/shopping-bag-4.svg'
import themeright from '../../assets/dweb_header.webp'
import kfc from '../../assets/kfc.webp'
import { Card } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Headers from './Headers'
import CityHotels from './cityhotelmainpage'

const HomePage = () => {
    return (
        <div className='container'>
            <Headers />
            <CityHotels />
        </div>
    )
}
export default HomePage;