import { useDispatch, useSelector } from "react-redux";
import Headers from "../CityHotels/Headers";
import { ResetValue } from "./LoginRedux";
import { ResetPasswordApi } from "./Loginaxios";
import { useNavigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"
import { useState } from "react";




const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [passwordShow, setPasswordShow] = useState(false)
    const [ConfirmpasswordShow, setConfirmPasswordShow] = useState(false)
    const handleinputValue = (e) => {
        const { name, value } = e.target
        dispatch(ResetValue({ name: name, value: value }))
    }
    const restdataValue = useSelector((state) => state.login.resetValue)
    const handleUpdatePassword = (event) => {
        event.preventDefault()
        if (restdataValue.password === restdataValue.confirmPassword) {
            const data = {
                email: restdataValue.email,
                password: restdataValue.confirmPassword
            }
            ResetPasswordApi(data, dispatch, navigate)
        }
        else {
            alert('Password and Confirm Password is mismatching')
            dispatch(ResetValue({ name: "password", value: '' }))
            dispatch(ResetValue({ name: "confirmPassword", value: '' }))
        }
    }

    const handlepasswordShow = () =>{
        setPasswordShow(!passwordShow)
    }

    const handleConfirmpasswordShow = () =>{
        setConfirmPasswordShow(!ConfirmpasswordShow)
    }

    console.log(restdataValue)


    return (
        <>
            <div className="contentDiv">
                <div style={{ border: '1px solid #73d13d' }}>
                    <div className="contentHeader">Reset Password</div>
                    <form className="formDiv" onSubmit={(e) => handleUpdatePassword(e)}>
                        <p className="formLabel">Email</p>
                        <input onChange={(e) => handleinputValue(e)} className="formInput" value={restdataValue.email} placeholder="email" name='email'></input>
                        <p className="formLabel">Password</p>
                        <div className="passwordsDiv">
                            <div>
                                <input onChange={(e) => handleinputValue(e)} className= { passwordShow ? "passwordShow" : "passwordField" } value={restdataValue.password} placeholder="password" name='password'></input>
                            </div>
                            <div className="eyeIcon" onClick={()=>handlepasswordShow()}>
                                {
                                    passwordShow ? <EyeFilled /> : <EyeInvisibleFilled />
                                }
                            </div>
                        </div>
                        <p className="formLabel">Confirm Password</p>
                        <div className="passwordsDiv">
                            <div>
                                <input onChange={(e) => handleinputValue(e)} className= { ConfirmpasswordShow ? "passwordShow" : "passwordField" } value={restdataValue.confirmPassword} placeholder="password" name='confirmPassword'></input>
                            </div>
                            <div className="eyeIcon" onClick={()=>handleConfirmpasswordShow()}>
                                {
                                    ConfirmpasswordShow ? <EyeFilled /> : <EyeInvisibleFilled />
                                }
                            </div>
                        </div>
                        <p onClick={()=>navigate('/login')} style={{color:'#73d13d', cursor:'pointer',margin: '15px 15px 0px 15px', fontWeight:'500'}}>To Login & Signup</p>
                        <button type="submit" className="formButton">Reset</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;
