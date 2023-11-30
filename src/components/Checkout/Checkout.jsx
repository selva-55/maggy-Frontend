import { useDispatch, useSelector } from "react-redux"
import Headers from "../CityHotels/Headers"
import './checkout.css'
import './../CityHotels/cityhotels.css'
import { CheckCircleFilled } from "@ant-design/icons"
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { AddAddress } from "../Login/Loginaxios"
import kfc from '../../assets/kfc.webp'
import { CartDelete, CartAdd, CartItems, OrderItem } from "../Login/Loginaxios"
import { Modal } from "antd"



const CheckoutPage = () => {
    const PhoneNumber = useSelector((state) => state.login.phoneNumber)
    const Username = useSelector((state) => state.login.Username)
    const address = useSelector((state) => state.login.address)
    const orderResponse = useSelector((state) => state.login.OrderResponse)
    const dispatch = useDispatch()
    const [Address, setAddress] = useState('')
    const [update, setupdate] = useState(false)
    const city = useSelector((state) => state.login.city)
    const location = useLocation()
    const cartItem = useSelector((state) => state.login.cartItems)
    const { cartItems } = location.state || {}
    const navigate = useNavigate()


    useEffect(()=>{
        CartItems(city, dispatch)
    },[dispatch])
    
    const handleAddress = (e) => {
        setAddress(e.target.value)
    }
    const HandleApiAddress = () => {
        AddAddress(Address, dispatch)
        setAddress('')
        setupdate(false)
    }


    const handlecartItemsReduce = (items) => {

        const emptyCart = () => {
            const filterToDelete = cartItem.filter((data) => items.item === data.item)
            const data = {
                id: filterToDelete[0].id,
                city: city
            }
            CartDelete(data, dispatch)
            navigate('/')
        }

        if (cartItem.length === 1) {
            Modal.confirm({
                title: 'Alert',
                content: 'Cart getting empty want redirect to main page?',
                onOk: () => emptyCart()
            })
        } else {
            const filterToDelete = cartItem.filter((data) => items.item === data.item)
            const data = {
                id: filterToDelete[0].id,
                city: city
            }
            CartDelete(data, dispatch)
        }

    }
    const handlecartItemsADD = (items) => {
        const AddItem = {
            userId: localStorage.getItem('user'),
            item: items.item,
            HotelName: cartItems[0].HotelName,
            city: city,
            Hotellocation: cartItems[0].Hotellocation,
            itemRate: items.itemRate,
            distance: cartItems[0].distance,
            deliveryTime: cartItems[0].deliveryTime
        }
        CartAdd(AddItem, city, dispatch, navigate)
    }

    const aggregatedItems = {};
    cartItem.forEach((item) => {
        const itemName = item.item;
        if (aggregatedItems[itemName]) {
            aggregatedItems[itemName] = { ...item, itemCount: aggregatedItems[itemName].itemCount + 1 }
            aggregatedItems[itemName].itemCount = aggregatedItems[itemName].itemCount;
        } else {
            aggregatedItems[itemName] = { ...item, itemCount: 1 };
        }
    });
    const consolidatedItemsArray = Object.values(aggregatedItems);
    const totalAmount = cartItem.reduce((sum, data) => sum + data.itemRate, 0);
    const totalPay = totalAmount + (cartItems[0].distance) * 11.4 + 3 + totalAmount * 10.7 / 100
    const roundoffTotalPay = Math.floor(totalPay);
    const DeliveryAgentName = [
        'Aarav',
        'Aryan',
        'Rohan',
        'Kabir',
        'Arjun',
        'Vedant',
        'Advait',
        'Ishaan',
        'Virat',
        'Yuvan',
    ];
    const getRandomNumber = (deliveryBoy) => {
        return Math.floor(Math.random() * deliveryBoy);
    };

    const handlePlaceOrder = () => {
        const random = getRandomNumber(DeliveryAgentName.length)
        const data = [{
            userId:localStorage.getItem('user'),
            HotelName:cartItem[0].HotelName,
            city:city,
            Hotellocation:cartItem[0].Hotellocation,
            item: consolidatedItemsArray.map((data) => ({
                item: data.item,
                itemCount: data.itemCount,
                rate: data.itemRate
            })),
            deliveryTime:cartItem[0].deliveryTime,
            totalItems:consolidatedItemsArray.length,
            deliveryPerson:DeliveryAgentName[random],
            TotalItemAmount:totalAmount,
            TotalPay:roundoffTotalPay,
            orderStatus:'success'
        }]
        OrderItem(data,dispatch)
    }
    console.log(cartItem, cartItems)
    return (
        <div className="checkoutpage">
            <Headers />
            <div className="checkoutcontent">
                <div className="screenSplit">
                    <div className="leftScreen">
                        <div >
                            <div className="leftContent1">
                                <div className="accountCart">
                                    <div className="LogginCart">
                                        <div>Logged in</div>
                                        <CheckCircleFilled className="LoggedInIcon" />
                                    </div>
                                    <div className="loggedUser">
                                        <div>{Username}</div>
                                        <div>|</div>
                                        <div>{PhoneNumber}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="leftContent2">
                                <div className="accountCart">
                                    <div className="LogginCart">
                                        <div>Add Delivery Address</div>
                                    </div>
                                    {!address ?
                                        <>
                                            <div className="loggedUser">
                                                <input onChange={(e) => handleAddress(e)} value={Address} className="addressInputBox" placeholder="Enter delivery Location"></input>
                                            </div>
                                            <div className="loggedUser">
                                                <button onClick={() => HandleApiAddress()} className="AddAddressButton">ADD ADDRESS</button>
                                            </div>
                                        </>

                                        :
                                        <>
                                            <div style={{ width: '50%', marginBottom: '30px', overflowWrap: 'anywhere' }}>{address}</div>
                                            {
                                                update ?
                                                    <>
                                                        <div className="loggedUser">
                                                            <input onChange={(e) => handleAddress(e)} value={Address} className="addressInputBox" placeholder="Enter delivery Location"></input>
                                                        </div>
                                                        <div className="loggedUser">
                                                            <button onClick={() => HandleApiAddress()} className="AddAddressButton">UPDATE</button>
                                                        </div>
                                                    </>
                                                    :
                                                    <div className="loggedUser">
                                                        <button onClick={() => setupdate(true)} className="AddAddressButton">UPDATE ADDRESS</button>
                                                    </div>
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rightScreen">
                        <div className="rightContent">
                            <div className="Rightheader">
                                <span className="headerImgSpan">
                                    <img className="ImgSpan" src={kfc}></img>
                                </span>
                                <span className="headerSpan">
                                    <div className="RestaurantText">{cartItems[0].HotelName}</div>
                                    <div className="LocationText">{cartItems[0].Hotellocation}</div>
                                </span>
                            </div>
                            <div className="RightContext">
                                <div className="contextItem">
                                    {
                                        consolidatedItemsArray.map((item) => {
                                            return (
                                                <div className="itemdiv">
                                                    <div className="itemName">{item.item}</div>
                                                    <div className="cartAddDecrease">
                                                        <button onClick={() => handlecartItemsReduce(item)} className="ItemCartButton">-</button>
                                                        <div>{cartItem.filter((data) => item.item === data.item).length}</div>
                                                        <button onClick={() => handlecartItemsADD(item)} className="ItemCartButton">+</button>

                                                    </div>
                                                    <div className="itemAmount">₹{(cartItem.filter((data) => item.item === data.item).length) * item.itemRate}</div>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="BillpayText">
                                        Bill pay
                                    </div>
                                    <div className="itemTotalDiv">
                                        <div>Items Total</div>
                                        <div>₹{totalAmount}</div>
                                    </div>
                                    <div className="itemTotalDiv">
                                        <div>Delivery Fee | {cartItems[0].distance} kms</div>
                                        <div>₹{Math.floor((cartItems[0].distance) * 11.4)}</div>
                                    </div>
                                    <div className="EndLine"></div>
                                    <div className="itemTotalDiv">
                                        <div>Platform Fee</div>
                                        <div>₹3</div>
                                    </div>
                                    <div className="itemTotalDiv">
                                        <div>GST and Restaurant Charges</div>
                                        <div>₹{Math.floor(totalAmount * 10.7 / 100)}</div>
                                    </div>
                                    <div className="toPayEndline"></div>
                                    <div className="TotalPay">
                                        <div>Total Pay</div>
                                        <div>₹{roundoffTotalPay}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {cartItem.length !== 0 && address && <div className="Ordercheckout">
                <div style={{ marginLeft: '20px' }}>
                    <p>{consolidatedItemsArray.length} Item | ₹{roundoffTotalPay} </p>
                </div>
                <div onClick={handlePlaceOrder} style={{ marginRight: '20px', cursor: 'pointer' }}>
                    PLACE ORDER
                </div>
            </div>}
        </div>
    )
}

export default CheckoutPage;