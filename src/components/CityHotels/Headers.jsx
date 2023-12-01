
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { FetchUserData, LocationChange, OrderHistoryData } from "../Login/Loginaxios";
import { useNavigate } from "react-router-dom";
import { SetLocation, SetPhonenumber, SetUsername, SetAddress,ProfileDrawer } from "../Login/LoginRedux";
import { CartItems } from "../Login/Loginaxios";
import { Popover, Drawer } from "antd";
import Profile from "../profile/Profile";
import maggysymbol from './../../assets/Mmaggysymbol.svg'
const Headers = () => {
    const UserData = useSelector((state) => state.login.userData)
    const cartItems = useSelector((state) => state.login.cartItems)
    const ProfileDrawerCondition = useSelector((state) => state.login.profileDrawer)
    const profileFieldChanges = useSelector((state) => state.login.profileFieldChange)
    const profileModel = useSelector((state) => state.login.profilemodel)
    const DrawerOpenClose = useSelector((state) => state.login.profileDrawer)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [username, setUserName] = useState({
        name: 'Loading...',
        location: 'Loading...',
        id: 'Loading...',
        phoneNumber:'',
        email:'',
    })
    const locations = [
        'Ahmedabad',
        'Bangalore',
        'Chennai',
        'Delhi',
        'Gurgaon',
        'Hyderabad',
        'Kolkata',
        'Mumbai',
        'Pune',
    ]

    useEffect(()=>{
        FetchUserData(dispatch)

    },[dispatch])
    
    useEffect(() => {
        setUserName(prev => ({ ...prev, name: UserData.name, location: UserData.location, user_id: UserData.id, phoneNumber:UserData.phoneNumber, email:UserData.email }));
    }, [UserData]);
    const aggregatedItems = {};
    cartItems.forEach((item) => {
        const itemName = item.item;
        if (aggregatedItems[itemName]) {
            aggregatedItems[itemName].itemCount += item.itemCount;
        } else {
            aggregatedItems[itemName] = { ...item };
        }
    });
    const consolidatedItemsArray = Object.values(aggregatedItems);
    

    const handleLocation = (e) => {
        setUserName({ ...username, location: e.target.value })
        const data = {
            user_id: localStorage.getItem('user'),
            location: e.target.value
        }
        LocationChange(data, dispatch)
        dispatch(SetLocation(e.target.value))
        navigate('/')
    }
    const [openPopover, SetopenPopover] = useState(false)
    const handleProfileDrawer = () => {
        SetopenPopover(false)
        dispatch(ProfileDrawer(true))
    }

    const handleorderhistory = () =>{
        SetopenPopover(false)
        OrderHistoryData(dispatch, navigate)
    }

    return (
        <div className='headers'>
            <div style={{ width: '100%' }}>
                <div className='globalForHeader'>
                    <img class="HomeLogo" style={{height:"45px"}} onClick={() => navigate('/')} src={maggysymbol}></img>
                    <div className='locationContainer'>
                        <svg width="100%" height="100%" viewBox="0 0 16 17" fill="#F15700" xmlns="http://www.w3.org/2000/svg"><path d="M11.1828 1.84246C13.7623 0.516285 15.0521 -0.146802 15.6759 0.448004C16.2997 1.04281 15.6986 2.36264 14.4965 5.00231L11.0318 12.6101C9.78188 15.3547 9.15692 16.727 8.28744 16.6338C7.41796 16.5407 7.09629 15.0596 6.45294 12.0973C6.29606 11.375 6.21761 11.0138 5.97533 10.7649C5.73305 10.5161 5.37563 10.4285 4.6608 10.2532L4.29783 10.1642C1.65419 9.51589 0.332363 9.19175 0.234059 8.35677C0.135754 7.52179 1.34615 6.89952 3.76695 5.65497L11.1828 1.84246Z" fill="#73d13d"></path></svg>
                        <select
                            className='GeoLocationName'
                            value={username.location}
                            onChange={(e) => handleLocation(e)}
                        >
                            <option className="selectOption" value={username.location}>{username.location !== null ? username.location : 'Select City'}</option>
                            {locations.map((location, index) => (
                                <option className="selectOption" key={index} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                    </div>
                    <ul className='headerList'>
                        <Popover
                        open={openPopover}
                            content={
                                <div className="PopoverDiv">
                                    <button onClick={() => handleProfileDrawer()} className="PopoverButton">Profile</button>
                                    <button onClick={() =>handleorderhistory()} className="PopoverButton">Order history</button>
                                    <button onClick={() => {navigate('/login');localStorage.clear()}} className="PopoverButton">Logout </button>
                                </div>}
                            trigger="click"
                            placement="bottom"
                        >
                            <li onClick={()=>SetopenPopover(!openPopover)} className='listAlignment'>
                                <svg class="_1GTCc" viewBox="6 0 12 24" height="19" width="18" fill="#686b78"><path d="M11.9923172,11.2463768 C8.81761115,11.2463768 6.24400341,8.72878961 6.24400341,5.62318841 C6.24400341,2.5175872 8.81761115,0 11.9923172,0 C15.1670232,0 17.740631,2.5175872 17.740631,5.62318841 C17.740631,8.72878961 15.1670232,11.2463768 11.9923172,11.2463768 Z M11.9923172,9.27536232 C14.0542397,9.27536232 15.7257581,7.64022836 15.7257581,5.62318841 C15.7257581,3.60614845 14.0542397,1.97101449 11.9923172,1.97101449 C9.93039471,1.97101449 8.25887628,3.60614845 8.25887628,5.62318841 C8.25887628,7.64022836 9.93039471,9.27536232 11.9923172,9.27536232 Z M24,24 L0,24 L1.21786143,19.7101449 L2.38352552,15.6939891 C2.85911209,14.0398226 4.59284263,12.7536232 6.3530098,12.7536232 L17.6316246,12.7536232 C19.3874139,12.7536232 21.1256928,14.0404157 21.6011089,15.6939891 L22.9903494,20.5259906 C23.0204168,20.63057 23.0450458,20.7352884 23.0641579,20.8398867 L24,24 Z M21.1127477,21.3339312 L21.0851024,21.2122487 C21.0772161,21.1630075 21.0658093,21.1120821 21.0507301,21.0596341 L19.6614896,16.2276325 C19.4305871,15.4245164 18.4851476,14.7246377 17.6316246,14.7246377 L6.3530098,14.7246377 C5.4959645,14.7246377 4.55444948,15.4231177 4.32314478,16.2276325 L2.75521062,21.6811594 L2.65068631,22.0289855 L21.3185825,22.0289855 L21.1127477,21.3339312 Z"></path></svg>
                                {username.name}
                            </li>
                        </Popover>

                        <li className='listAlignment' onClick={() => cartItems.length !== 0 ? navigate('/checkout', { state: { cartItems } }) : alert("Your cart is empty Please add item")}>
                            <svg class="CardSvG" viewBox="-1 0 37 32" height="20" width="20" fill="#686b78"><path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path></svg>
                            <span className="headerCartCount">{consolidatedItemsArray.length}</span>
                            <p style={{ margin: '0' }}>Cart</p>
                        </li>
                    </ul>
                </div>
            </div>
            {ProfileDrawerCondition && <Profile UserData = {UserData} profileFieldChanges = {profileFieldChanges} profileModel = {profileModel} DrawerOpenClose = {DrawerOpenClose}  />}
        </div>
    )
}

export default Headers;