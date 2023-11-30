import axios from "axios";
import { Loggedin, logindrawerClose, logindrawerOpen, Restaurants, LocationBasedRestaurants, cartItems, getHotelItems, SetAddress, orderSuccess, passwordChecks, ProfileModelOpen, ProfileModelclose, ProfileModel, ProfileDrawer, UserData, ProfileFieldChangeFalse, UserDataDetails, UserDataDetailsInitial, SetLocation, SetPhonenumber, SetUsername, OrderHistory, ResetApiResponse, ResetValue } from './LoginRedux';
export const loginapi = (LoginformData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios({
                method: "POST",
                url: "http://127.0.0.1:8000/login",
                data: JSON.stringify(LoginformData)
            })
            if (response.status === 200) {
                localStorage.setItem('access_token', response.data.access)
                dispatch(Loggedin(response.data))
                dispatch(logindrawerClose())
                navigate('/')
            }
        }
        catch (error) {
            console.log(error)
            if (error.response.data.msg === 'Register') {
                dispatch(logindrawerOpen('signup'))
            }
            else {
                alert(error.response.data.msg)
            }
        }
    }
}

export const signupapi = (SignupformData) => {
    return async (dispatch) => {
        try {
            const response = await axios({
                method: "POST",
                url: "http://127.0.0.1:8000/register",
                data: JSON.stringify(SignupformData)
            })
            if (response.status === 200) {
                dispatch(logindrawerOpen('login'))
            }
        }
        catch (error) {
            alert(error.response.data.msg)
        }
    }
}

export const FetchUserData = async (dispatch) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/user/?id=${localStorage.getItem('user')}`, {
            method: 'GET',
        });

        const result = await response.json();
        if (result) {
            dispatch(UserDataDetailsInitial(result))
            CartItems(result.location, dispatch)
            LocationChange({ user_id: localStorage.getItem('user'), location: result.location }, dispatch)
            dispatch(SetLocation(result.location))
            dispatch(SetPhonenumber(result.phoneNumber))
            dispatch(SetUsername(result.name))
            dispatch(SetAddress(result.address))
        }
    } catch (error) {
        console.error('Error in LocationChange:', error);
    }
};

export const LocationChange = async (data, dispatch) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/location', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        const result = await response.json();
        dispatch(LocationBasedRestaurants(result))
    } catch (error) {
        console.error('Error in LocationChange:', error);
    }
};

export const CityHotelsAPI = async (dispatch) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/hotels', {
            method: 'GET',
        });

        const result = await response.json();
        dispatch(Restaurants(result))

    } catch (error) {
        console.error('Error in LocationChange:', error);
    }
};

export const HotelsItems = async (city, restaurantsName, dispatch) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/RestaurantsItem/?city=${city}&restaurantName=${restaurantsName}`, {
            method: 'GET',
        });
        const result = await response.json();
        dispatch(getHotelItems(result[0]))
    } catch (error) {
        console.error('Error in LocationChange:', error);
    }
};

export const CartItems = async (city, dispatch) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/cartItems/?id=${localStorage.getItem('user')}&city=${city}`, {
            method: 'GET'
        });
        const result = await response.json();
        dispatch(cartItems(result))
    } catch (error) {
        console.error('Error in LocationChange:', error);
    }
};

export const CartAdd = async (data, city, dispatch) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/cartAdd', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        await response.json();
        CartItems(city, dispatch)
    } catch (error) {
        console.error('Error in LocationChange:', error);
    }
};

export const CartDelete = async (data, dispatch) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/cartDelete/?id=${data.id}`, {
            method: 'DELETE'
        });
        await response.json();
        CartItems(data.city, dispatch)
    } catch (error) {
        console.error('Error in LocationChange:', error);
    }
};

export const CartRemoveAnotherRestaurants = async (city, dispatch) => {
    try {
        const data = {
            userId: localStorage.getItem('user')
        }
        const response = await fetch('http://127.0.0.1:8000/removeDifferentcartItem', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        await response.json();
        CartItems(city, dispatch)
    } catch (error) {
        console.error('Error in LocationChange:', error);
    }
};

export const AddAddress = async (address, dispatch) => {
    try {
        const data = {
            userId: localStorage.getItem('user'),
            address: address
        }
        const response = await fetch('http://127.0.0.1:8000/updateaddress', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.msg === 'success') {
            dispatch(SetAddress(result.address))
        }
    } catch (error) {
        console.error('Error in LocationChange:', error);
    }
};


export const OrderitemsRemoveCartData = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/orderRemoveCartItem/?id=${localStorage.getItem('user')}`, {
            method: 'GET',
        });

        await response.json();
    } catch (error) {
        console.error('Error in LocationChange:', error);
    }
};

export const OrderItem = async (data, dispatch) => {
    try {

        const response = await fetch('http://127.0.0.1:8000/order', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.msg === 'success') {
            dispatch(orderSuccess(result))
            OrderitemsRemoveCartData()
        }
    } catch (error) {
        console.error('Error in LocationChange:', error);
    }
};



export const ProfileUpdate = async (data, dispatch) => {
    try {

        const response = await fetch('http://127.0.0.1:8000/userUpdate', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        await response.json();
        alert('Profile Updated!!!')
        dispatch(ProfileFieldChangeFalse())

    } catch (error) {
        console.error('Error in LocationChange:', error);
    }
};



export const PasswordCheck = async (data, profileData, dispatch) => {
    try {

        const response = await fetch('http://127.0.0.1:8000/passwordcheck', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.msg === 'success') {
            dispatch(passwordChecks(result.msg))
            dispatch(ProfileModel(false))
            dispatch(ProfileDrawer(false))
            ProfileUpdate(profileData, dispatch)
        } else {
            alert('Password Incorrect!, you can reset password or try again')
        }
    } catch (error) {
        console.error('Error in LocationChange:', error);
    }
};

export const OrderHistoryData = async (dispatch) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/orderHistory/?id=${localStorage.getItem('user')}`, {
            method: 'GET',
        });
        const result = await response.json();
        dispatch(OrderHistory(result))

    } catch (error) {
        console.error('Error in LocationChange:', error);
    }
};



export const OrderRepeat = async (data, dispatch) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/reorder`, {
            method: 'POST',
            body:JSON.stringify(data)
        });
        await response.json();
        CartItems(data.city, dispatch)
    } catch (error) {
        console.error('Error in LocationChange:', error);
    }
};


export const ResetPasswordApi = async (data, dispatch, navigate) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/resetPassword`, {
            method: 'POST',
            body:JSON.stringify(data)
        });
        const result = await response.json();
        if(result.msg === 'success'){
            alert('Password Reset Successfull...')
            dispatch(ResetValue({name:'email',value:''}))
            dispatch(ResetValue({name:'password',value:''}))
            dispatch(ResetValue({name:'confirmPassword',value:''}))
            navigate('/login')
        }else{
            alert(`${result.msg} Please Signup!`)
            dispatch(ResetValue({name:'email',value:''}))
        }

    } catch (error) {
        console.error('Error in LocationChange:', error);
    }
};


