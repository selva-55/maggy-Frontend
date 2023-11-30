import '../../App.css'
import mainPageFoodSlide from '../../assets/Lunch1_vlksgq.webp'
import bottonSlide from '../../assets/sb.png'
import Login from '../Login/login'
const Swiggy = () => {
  return (
    <div className='container'>
      <div className='layer1'>
        <div className='login'>
          <Login />
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
export default Swiggy;