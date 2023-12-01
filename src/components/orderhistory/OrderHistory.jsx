import { useEffect } from "react"
import Headers from "../CityHotels/Headers"
import './orderhistory.css'
import { CartRemoveAnotherRestaurants, OrderHistoryData, OrderRepeat } from "../Login/Loginaxios"
import { useDispatch, useSelector } from "react-redux"
import loginRoll from './../../assets/swp.png'
import { Modal } from "antd"

const OrderHistory = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        OrderHistoryData(dispatch)
    }, [dispatch])
    const orderedData = useSelector((state) => state.login.Ordereddata)
    const cartItem = useSelector((state) => state.login.cartItems)
    const city = useSelector((state) => state.login.city)
    const formatTimestamp = (timestamp) => {
        const dateObject = new Date(timestamp);
        const options = {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };
        return dateObject.toLocaleString("en-US", options);
    };

    const handleRepeatOrder = (orders) => {        
        const hasHotelinList = cartItem.every((cartItems) => cartItems.HotelName === orders.HotelName)
        const data = {
            userId: orders.userId,
            items: orders.items,
            HotelName: orders.HotelName,
            city: orders.city,
            Hotellocation: orders.Hotellocation
        }

        const RemoveAnotherRestaurantItems = ()=>{
            CartRemoveAnotherRestaurants(orders.city, dispatch)
            OrderRepeat(data, dispatch)
        }

        if(orders.city===city){
            if(hasHotelinList){
                OrderRepeat(data, dispatch)
            }
            else{
                Modal.confirm({
                    title:'Alert',
                    content:'Item in cart have another Restaurant item can you Afresh cart?',
                    onOk:()=>RemoveAnotherRestaurantItems()
                })
            }
        }
        else{
            alert('City location is different...')
        }

       
    }

    return (
        <>
            <Headers />
            <div className="OrederPlacedContent">
                <div className="headersText">
                    Past Orders
                </div>
                {
                    orderedData.slice().reverse().map((orders) => {
                        return (
                            <>
                                <div className="ordersContainer">

                                    <div className="ContentSection1">
                                        <div className="section1ContentStart">
                                            <div>
                                                <img src={loginRoll}></img>
                                            </div>
                                            <div>
                                                <div className="RestaurantName">{orders.HotelName}</div>
                                                <div className="RestaurantLocation">{orders.Hotellocation}</div>
                                                <div className="orderIdTime">{`ORDER #${orders.id}`} | {formatTimestamp(orders.orderTime)}</div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="ContentSection2">
                                        <div className="itemList">{orders.items.map((item) => `${item.item} x ${item.itemCount} `)}</div>
                                        <div className="reorderDiv">
                                            <button className="reorderButton" onClick={() => handleRepeatOrder(orders)}>REORDER</button>
                                        </div>
                                    </div>
                                </div>

                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default OrderHistory;