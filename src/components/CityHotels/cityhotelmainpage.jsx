
import './cityhotels.css'
import logoswiggy from '../../assets/swiggy-logo.svg'
import themeright from '../../assets/dweb_header.webp'
// import kfc from '../../assets/kfc.webp'
import hotel1 from '../../assets/hotel1.avif';
import hotel2 from '../../assets/hotel2.avif';
import hotel3 from '../../assets/hotel3.avif';
import hotel4 from '../../assets/hotel4.avif';
import hotel5 from '../../assets/hotel5.avif';
import hotel6 from '../../assets/hotel6.avif';
import hotel7 from '../../assets/hotel7.avif';
import hotel8 from '../../assets/hotel8.avif';
import hotel9 from '../../assets/hotel9.avif';
import hotel10 from '../../assets/hotel10.avif';
import hotel11 from '../../assets/hotel11.avif';
import hotel12 from '../../assets/hotel12.avif';
import hotel13 from '../../assets/hotel13.avif';
import hotel14 from '../../assets/hotel14.avif';
import hotel15 from '../../assets/hotel15.avif';
import hotel16 from '../../assets/hotel16.avif';
import hotel17 from '../../assets/hotel17.avif';
import hotel18 from '../../assets/hotel18.avif';
import hotel19 from '../../assets/hotel19.avif';
import hotel20 from '../../assets/hotel20.avif';
import { Card } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getHotelItems } from '.././Login/LoginRedux'
import { useEffect, useState } from 'react'
import { CityHotelsAPI,HotelsItems } from '../Login/Loginaxios'


const CityHotels = () => {
    const dispatch = useDispatch()
    const city = useSelector((state) => state.login.city)
    const navigate = useNavigate()
    useEffect(() => {
        CityHotelsAPI(dispatch)
    }, [dispatch])
    const RestaurantsList = useSelector((state) => state.login.Restaurants)
    console.log(RestaurantsList)
    const hotelImages = [hotel1, hotel2, hotel3, hotel4, hotel5, hotel6, hotel7, hotel8, hotel9, hotel10, hotel11, hotel12, hotel13, hotel14, hotel15, hotel16, hotel17, hotel18, hotel19, hotel20];
    return (
        <>
            <div className='cityThemeContainer'>
                <div className='pagetheme'>
                    <div className='themeleft'>
                        <h1 className='themetext'>
                            Order Food Online {city}
                        </h1>

                        <div className='curveSvg'>
                            <svg width="100%" height="100%" viewBox="0 0 78 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5.25939C27 -0.240624 53.5 -0.2406 77 4.25939" stroke="#F15700" stroke-width="1.5"></path></svg>
                        </div>
                    </div>
                    <div className='themeright'>
                        <img className='themeImg' src={themeright} />

                    </div>
                </div>
            </div>
            <div className='locationhotels'>
                <h2 className='locationhotelshead'>
                    Restaurants with online food delivery in {city}
                </h2>
                <div className='cardContainer'>
                    {
                        RestaurantsList.map((restaurantsItem, index) => {
                            return (
                                <Card className='CardStyle' onClick={() =>{ navigate('/hotelItems', { state: { restaurantsItem, city} }) }
                                }
                                >
                                    <div className=''>
                                        <img className='retaurantsCardImg' src={hotelImages[index]} />
                                    </div>
                                    <div className='cardDetailContainer'>
                                        <div className='RestuarantsName'>
                                            {restaurantsItem.restaurantName}
                                        </div>
                                        <div className='ratingANDtiming'>
                                            <div className='ratingSVG'>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)"><circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle><path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path><defs><linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse"><stop stop-color="#21973B"></stop><stop offset="1" stop-color="#128540"></stop></linearGradient></defs></svg>
                                            </div>
                                            <div className='rateDot'>
                                                <span class="rateSpan">{restaurantsItem.rating} • </span>
                                                {restaurantsItem.deliveryTime} mins
                                            </div>
                                        </div>
                                        <div className='itemANDlocation'>
                                            <div className='items'>{restaurantsItem.items.map((data) => data.item)},</div>
                                            <div className='locations'>{restaurantsItem.cityLocation}</div>
                                        </div>
                                    </div>
                                </Card>
                            )

                        })
                    }
                </div>
            </div>

        </>
    )
}
export default CityHotels;