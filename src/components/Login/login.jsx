import { useEffect, useState } from 'react';
import maggyLogo from '../../assets/Maggymaggy.svg';
import loginRoll from '../../assets/swp.png';
import { Drawer } from 'antd';
import { logindrawerOpen, logindrawerClose, getcityName } from './LoginRedux';
import { useDispatch, useSelector } from "react-redux";
import { loginapi, signupapi } from './Loginaxios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [text, setText] = useState('Hungry?');
  const [slide, setSlide] = useState(false);
  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState({
    phonenumber: "",
    password: ""
  });
  const [signupformData, setsignupFormData] = useState({
    phonenumber: "",
    password: "",
    email: '',
    name: ''
  });
  const newTexts = [
    'Hungry?',
    'Unexpected guests?',
    'Cooking gone wrong?',
    'Movie marathon?',
    'Game night?',
    'Late night at the office?',
  ];

  const CityList = [
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

  const dispatch = useDispatch()

  const handlecitySelect = (city) => {
    dispatch(getcityName(city))
    navigate(`/city/${city}`)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < newTexts.length) {
        setSlide(true); // Apply the slide animation
        setTimeout(() => {
          // Reset animation state after the animation completes
          setSlide(false);
          setText(newTexts[index]);
          setIndex(index + 1);
        }, 500); // This timeout should match the transition duration in CSS
      } else {
        setIndex(0);
        // If you want to loop the text change, you can reset currentIndex to 0 here.
      }
    }, 3000); // Change text every 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, [newTexts]);

  const DrawerOpen = useSelector((state) => state.login.drawer)
  const Drawertype = useSelector((state) => state.login.title)
  const orOption = useSelector((state) => state.login.orOption)
  const dispatcher = useDispatch()

  const handleDrawer = () => {
    if (Drawertype === 'Login') {
      dispatcher(logindrawerOpen('signup'))

    } else if (Drawertype === 'Sign up') {
      dispatcher(logindrawerOpen('login'))
    }
  }

  const handleLoginInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSignupInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setsignupFormData({
      ...signupformData,
      [name]: value,
    });
  }

  const navigate = useNavigate()

  const handleLoginCredential = (e) => {
    e.preventDefault();
    dispatcher(loginapi(formData, navigate))
  }
  const handleSignupCredential = (e) => {
    e.preventDefault();
    dispatcher(signupapi(signupformData))
  }


  const handlepathtoRest = () => {
    dispatcher(logindrawerClose())
    navigate('/reset')
  }


  return (
    <div className="loginLayer">
      <div className="loginLogoButton">
        <img className='swiggyLogo' src={maggyLogo} alt="Swiggy Logo" />
        <div className="loginButtons">
          <button className='LoginButton' onClick={() => dispatcher(logindrawerOpen('login'))}>Login</button>
          <button className='Signupbutton' onClick={() => dispatcher(logindrawerOpen('signup'))}>Sign up</button>
        </div>
      </div>
      <div>
        <h1 className={`${slide ? 'slideAni' : 'slideText'}`}>{text}</h1>
        <h2 className='slideTextLabel'>Order food from favorite restaurants near you.</h2>
      </div>
      <h3 className='PopularCitieslabel'>Popular cities in India</h3>
      <ul className='cityList'>
        {
          CityList.map((city) => {
            return (
              <li class="list-item" onClick={() => alert('Login Before Select Cities!!!')}>{city}</li>
            )
          })
        }
      </ul>
      <Drawer
        open={DrawerOpen}
        onClose={() => dispatcher(logindrawerClose())}
      >
        <div className='logintitleDiv'>
          <div className='loginTitleImage'>
            <h1 className='logintitle'>{Drawertype}</h1>
            <img className='loginrollImg' src={loginRoll}></img>
          </div>
          <div className='step2signup'>
            <p className='loginOr'>or</p>
            <p className='loginOr logincreatSign' onClick={handleDrawer}>{orOption}</p>
          </div>
          <p className='loginLine'></p>
          {
            Drawertype === 'Login' ?
              <>
                <form onSubmit={handleLoginCredential}>
                  <div className='loginform'>
                    <input
                      onChange={handleLoginInputChange}
                      required
                      className='loginPhoneNumberInput'
                      value={formData.phonenumber}
                      placeholder='Phone number'
                      name='phonenumber'
                    />

                    <input onChange={handleLoginInputChange} type='password' className='loginPasswordInput' value={formData.password} placeholder='Password' name='password'></input>
                    <div onClick={() => handlepathtoRest()} style={{ color: '#73d13d', fontWeight: '500', cursor: 'pointer' }}>Forgot Password?</div>
                    <input className='LoginFormLogin' type='submit' value='Login' />
                  </div>
                </form>
                <p className='loginTerms'>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
              </>
              :
              <>
                <form onSubmit={handleSignupCredential}>
                  <div className='signupform'>
                    <input onChange={handleSignupInputChange} required className='signupformPhonenumber' value={signupformData.name} placeholder='Name' name='name'></input>
                    <input onChange={handleSignupInputChange} required className='signupformPhonenumber' value={signupformData.phonenumber} placeholder='Phone number' name='phonenumber' type='tel'></input>
                    <input onChange={handleSignupInputChange} required className='signupformPhonenumber' value={signupformData.email} placeholder='Email' name='email' type='email'></input>
                    <input onChange={handleSignupInputChange}
                      className='signupformReferral'
                      value={signupformData.password}
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character." 
                      placeholder='Password' 
                      name='password' 
                      type='password'
                      />
                    <input className='LoginFormLogin' type='submit' value='Continue' />
                  </div>
                </form>
                <p className='loginTerms'>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
              </>
          }
        </div>
      </Drawer>
    </div>

  );
}

export default Login;
