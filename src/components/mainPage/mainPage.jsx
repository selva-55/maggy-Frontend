import { useEffect, useState } from 'react';
import swiggyLogo from '../../assets/swiggy-logo.svg';
import { useDispatch, useSelector } from "react-redux";
import '../../App.css'
import mainPageFoodSlide from '../../assets/Lunch1_vlksgq.webp'
import bottonSlide from '../../assets/sb.png'
import { useNavigate } from 'react-router-dom';
import { getcityName } from '../Login/LoginRedux';
const Mainpage = () => {
    const [username, setUserName] = useState('Loading...')
    const name = useSelector((state) => state.login.name)
    setTimeout(() => {
        setUserName(name)
    }, 500)

    const [slide, setSlide] = useState(false);
    const [text, setText] = useState('Hungry?');
    const [index, setIndex] = useState(0);
    const dispatch = useDispatch()

    const newTexts = [
        'Hungry?',
        'Unexpected guests?',
        'Cooking gone wrong?',
        'Movie marathon?',
        'Game night?',
        'Late night at the office?',
    ];
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

    const navigate = useNavigate()

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

    const handlecitySelect = (city) => {
        dispatch(getcityName(city))
        navigate(`/city/${city}`)
    }
    return (
        <div className='container'>
            <div className='layer1'>
                <div className='login'>
                    <div className="loginLayer">
                        <div className="loginLogoButton">
                            <img className='swiggyLogo' src={swiggyLogo} alt="Swiggy Logo" />
                            <div className="loginButtons">
                                <div className='UserName'>{username}</div>
                            </div>
                        </div>
                        <div>
                            <h1 className={`${slide ? 'slideAni' : 'slideText'}`}>{text}</h1>
                            <h2 className='slideTextLabel'>Order food from favorite restaurants near you.</h2>
                        </div>
                        <div className='searchLocation'>
                            <input className='searchInput' placeholder='Enter your delivery location'></input>
                            <button className='findFood'>FIND FOOD</button>
                        </div>
                        <h3 className='PopularCitieslabel'>Popular cities in India</h3>
                        <ul className='cityList'>
                            {
                                CityList.map((city)=>{
                                    return(
                                        <li class="list-item" onClick={()=>handlecitySelect(city)}>{city}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className='foodSlide'>
                    <img className='foodSlideImg' src={mainPageFoodSlide}></img>
                </div>
            </div>
            <div className='layer2'>
                <img className='bottomSlide' src={bottonSlide}></img>
            </div>
        </div>

    )
}

export default Mainpage;