import { useLocation, useNavigate } from "react-router-dom"
import Headers from "../CityHotels/Headers"
import './orderplaced.css'
import { CheckCircleFilled } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"

const OrderPlace = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {orderDetails} = location.state
    const originalUUID = orderDetails.orderId;
    const orderId = originalUUID.replace(/-/g, '');
    return (
        <>
            <Headers />
            <div className="OrederPlacedContent">
                <div style={{ background: '#60b246', borderRadius: '5px' }}>
                    <div className="OrderPlacedCart">
                        <div style={{ margin: '20px', fontSize: '45px' }}>
                            <CheckCircleFilled />
                        </div>
                        <div className="orderText">
                            <div style={{fontSize: '27px', marginBottom: '5px'}}>
                                Order Placed Successfully
                            </div>
                            <div style={{ marginRight: '20px', cursor: 'pointer' }}>
                                #orderID {`${orderId}`} Delivered in {orderDetails.deliveryTime} mins
                            </div>
                        </div>
                    </div>
                    <div className="OrderedPlaceOk">
                        <button onClick={()=>navigate('/')} className="OkButton">
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderPlace;