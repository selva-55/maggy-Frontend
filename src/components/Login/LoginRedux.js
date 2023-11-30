import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        drawer: false,
        title: '',
        orOption: '',
        referral: false,
        logginStatus: localStorage.getItem('is_athenticated'),
        name: localStorage.getItem('name'),
        city: null,
        hotels: {},
        Restaurants: [],
        cartItems: [],
        itemCount:0,
        phoneNumber:null,
        Username:'',
        address:'',
        OrderResponse:[],
        passwordCheck:'',
        ProfileModel:false,
        profileDrawer:false,
        userData:{
            name: '',
            email: '',
            phoneNumber: '',
            password: 'Password'
        },
        profileFieldChange:{
            username: false,
            phoneNumber: false,
            email: false,
            password: false
        },
        Ordereddata:[],
        resetValue:{
            email:'',
            password:'',
            confirmPassword:''
        }
    },

    reducers: {
        logindrawerOpen: (state, action) => {
            if (action.payload === 'login') {
                state.title = 'Login'
                state.drawer = true
                state.orOption = 'create an account'
            }
            else if (action.payload === 'signup') {
                state.title = 'Sign up'
                state.drawer = true
                state.orOption = 'login to your account'
            }
        },

        logindrawerClose: (state) => {
            state.drawer = false
            state.referral = false
        },

        referral: (state) => {
            state.referral = true
        },

        Loggedin: (state, action) => {
            state.name = action.payload.name
            state.city = action.payload.location
            state.logginStatus = true
            localStorage.setItem('is_athenticated', true)
            localStorage.setItem('user', action.payload.id)

        },
        getcityName: (state, action) => {
            state.city = action.payload
            localStorage.setItem('city', action.payload)
        },
        getHotelItems: (state, action) => {
            state.hotels = action.payload
        },
        user: (state, action) => {
            state.name = action.payload.name
            state.city = action.payload.location
        },
        Restaurants: (state, action) => {
            if (state.city === null) {
                state.Restaurants = []
                state.Restaurants = action.payload
            }
        },
        LocationBasedRestaurants: (state, action) => {
            state.Restaurants = []
            state.Restaurants = action.payload
        },
        SetLocation: (state, action) => {
            state.city = action.payload
        },
        SetPhonenumber:(state, action)=>{
            state.phoneNumber = action.payload
        },
        SetUsername:(state, action)=>{
            state.Username = action.payload
        },
        SetAddress:(state,action)=>{
            state.address = action.payload
        },
        cartItems: (state,action)=>{
            state.cartItems = action.payload
        },
        CartItemCount: (state,action) => {
            state.itemCount = action.payload
        },
        orderSuccess:(state,action)=>{
            state.cartItems = []
            state.OrderResponse = action.payload
        },
        passwordChecks:(state,action)=>{
            state.passwordCheck = action.payload
        },
        ProfileModel:(state,action)=>{
            state.profilemodel = action.payload
        },
        ProfileDrawer:(state,action) =>{
            state.profileDrawer = action.payload
            console.log(state.profileDrawer)
        },
        UserDataDetailsInitial:(state,action) => {
            state.userData.name = action.payload.name
            state.userData.email = action.payload.email
            state.userData.phoneNumber = action.payload.phoneNumber
            state.userData.location = action.payload.location
            state.userData.address = action.payload.address
        },
        UserDataDetails:(state,action) => {
            state.userData[action.payload.field] = action.payload.value
        },
        ProfileFieldChangeTrue:(state, action) => {
            state.profileFieldChange[action.payload] = true
        },
        ProfileFieldChangeFalse:(state) => {
            state.profileFieldChange.username = false
            state.profileFieldChange.email = false
            state.profileFieldChange.phoneNumber = false
            state.profileFieldChange.password = false
        },
        OrderHistory:(state, action)=>{
            state.Ordereddata = action.payload
        },
        ResetValue:(state,action)=>{
            state.resetValue[action.payload.name] = action.payload.value
        }
    }
})
export const { 
    logindrawerOpen,
    logindrawerClose,
    referral, Loggedin,
    getcityName,
    getHotelItems,
    user,
    Restaurants,
    LocationBasedRestaurants,
    SetLocation,
    cartItems,
    CartItemCount,
    SetPhonenumber,
    SetUsername,
    SetAddress,
    orderSuccess,
    passwordChecks,
    ProfileModel,
    ProfileDrawer,
    UserDataDetails,
    ProfileFieldChangeTrue,
    ProfileFieldChangeFalse,
    UserDataDetailsInitial,
    OrderHistory,
    ResetValue

} = LoginSlice.actions
export default LoginSlice.reducer