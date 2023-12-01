import Headers from "./Headers"
import { AiFillStar } from "react-icons/ai";
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
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartAdd, CartItems, CartDelete, HotelsItems, CartRemoveAnotherRestaurants } from "../Login/Loginaxios";
import { Modal } from "antd";
const Hotelitems = () => {
    const dispatch = useDispatch()
    const StateLocation = useLocation()
    const hotelImages = [hotel1, hotel2, hotel3, hotel4, hotel5, hotel6, hotel7, hotel8, hotel9, hotel10, hotel11, hotel12, hotel13, hotel14, hotel15, hotel16, hotel17, hotel18, hotel19, hotel20];
    const { restaurantsItem , city} = StateLocation.state || {}
    const navigate = useNavigate()
    
    const HotelDetails = restaurantsItem
    const cartItems = useSelector((state) => state.login.cartItems)
    const handleCartItems = (items) => {
        const RemoveAnotherRestaurantItems = ()=>{
            CartRemoveAnotherRestaurants(city, dispatch)
            const AddItem = {
                userId: localStorage.getItem('user'),
                item: items.item,
                HotelName: HotelDetails.restaurantName,
                city: city,
                Hotellocation: HotelDetails.cityLocation,
                itemRate: items.rate,
                distance: HotelDetails.distance,
                deliveryTime: HotelDetails.deliveryTime
            }
            CartAdd(AddItem, city, dispatch)
        }
        const hasHotelinList = cartItems.every((cartItem) => cartItem.HotelName === HotelDetails.restaurantName)
        if(cartItems.length === 0){
            const AddItem = {
                userId: localStorage.getItem('user'),
                item: items.item,
                HotelName: HotelDetails.restaurantName,
                city: city,
                Hotellocation: HotelDetails.cityLocation,
                itemRate: items.rate,
                distance: HotelDetails.distance,
                deliveryTime: HotelDetails.deliveryTime
            }
            CartAdd(AddItem, city, dispatch)
        }
        else if(!hasHotelinList){
            Modal.confirm({
                title:'Alert',
                content:'Item in cart have another Restaurant item can you Afresh cart?',
                onOk:()=>RemoveAnotherRestaurantItems()
            })
        }
        else{
            const AddItem = {
                userId: localStorage.getItem('user'),
                item: items.item,
                HotelName: HotelDetails.restaurantName,
                city: city,
                Hotellocation: HotelDetails.cityLocation,
                itemRate: items.rate,
                distance: HotelDetails.distance,
                deliveryTime: HotelDetails.deliveryTime
            }
            CartAdd(AddItem, city, dispatch)
        }
        
    }
    
    const handleCartItemsADD = (items) => {
        const AddItem = {
            userId: localStorage.getItem('user'),
            item: items.item,
            HotelName: HotelDetails.restaurantName,
            city: city,
            Hotellocation: HotelDetails.cityLocation,
            itemRate: items.rate,
            distance: HotelDetails.distance,
            deliveryTime: HotelDetails.deliveryTime
        }
        CartAdd(AddItem, city, dispatch)
    }


    const handleCartItemsReduce = (items) => {
        const filterToDelete = cartItems.filter((data) => items.item === data.item)
        const data = {
            id: filterToDelete[0].id,
            city: city
        }
        CartDelete(data, dispatch)
    }

    const aggregatedItems = {};
    cartItems.forEach((item) => {
        const itemName = item.item;
        if (aggregatedItems[itemName]) {
            aggregatedItems[itemName] = {...item, itemCount:aggregatedItems[itemName].itemCount+1}
            aggregatedItems[itemName].itemCount = aggregatedItems[itemName].itemCount;
        } else {
            aggregatedItems[itemName] = { ...item, itemCount:1};
        }
    });
    const consolidatedItemsArray = Object.values(aggregatedItems);
    const totalAmount = cartItems.reduce((sum, data) => sum + data.itemRate, 0);
    return (
        <>
            <Headers />
            <div className='locationhotelsContainer'>
                <div className="hotelHeader">
                    <div className="headertext">
                        <p className="HotelName">{HotelDetails.restaurantName}</p>
                    </div>
                    <div className="HotelRating">
                    <AiFillStar className="ratingfont" /> {HotelDetails.rating} 
                    </div>
                </div>
                <div className="HotelLocation">
                    {HotelDetails.cityLocation} {HotelDetails.deliveryTime}mints
                </div>
                <hr className="breakBorder"></hr>
                <div className="itemsList">
                    <h3 className="recommandedStyle">Recommanded ({HotelDetails.items.length})</h3>
                    <div className="ItemContainer">
                        {
                            HotelDetails.items.map((items, index) => {
                                return (
                                    <>
                                        <div className="itemCard">
                                            <div>
                                                <p className="itemText">{items.item}</p>
                                                <p className="itemText itemTextAmount">₹{items.rate}</p>
                                            </div>
                                            <div key={index} style={{ width: 'min-content' }}>
                                                <img className="ItemImg" src={hotelImages[index]} />
                                                {

                                                    cartItems.length === 0 ? <button className="AddButton" onClick={() => handleCartItems(items, index)}>
                                                        ADD
                                                    </button>
                                                        :
                                                        cartItems.some((cartItem) => cartItem.item === items.item) ?
                                                            (<>
                                                                <button className="cardItemsButton" onClick={() => handleCartItemsReduce(items)}>-</button>
                                                                <button className="cardItemsCount">{cartItems.filter((data) => items.item === data.item).length}</button>
                                                                <button className="cardItemsButton" onClick={() => handleCartItemsADD(items)}>+</button>
                                                            </>

                                                            )
                                                            :
                                                            (<button className="AddButton" onClick={() => handleCartItems(items)}>
                                                                ADD
                                                            </button>)

                                                }
                                            </div>
                                        </div>
                                        <div className="itemEndLine"></div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                {cartItems.length !== 0 && <div className="cardNotification">
                    <div style={{ marginLeft: '20px' }}>
                        <p>{consolidatedItemsArray.length} Item | ₹{totalAmount} </p>
                    </div>
                    <div onClick={()=>navigate('/checkout',{ state: { cartItems} })} style={{ marginRight: '20px', cursor:'pointer' }}>
                        VIEW CART <img style={{ width: '15px', height: '14px' }} src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/ChatbotAssets/Checkout_Cart"></img>
                    </div>
                </div>}
            </div>

        </>

    )
}

export default Hotelitems;