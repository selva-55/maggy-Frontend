import { Drawer, Modal } from "antd"
import { UserOutlined } from "@ant-design/icons"
import './profile.css'
import { useState, useEffect } from "react"
import { FetchUserData, PasswordCheck } from "../Login/Loginaxios"
import { useDispatch, useSelector } from "react-redux"
import { ProfileDrawer, ProfileFieldChangeFalse, ProfileFieldChangeTrue, ProfileModel } from "../Login/LoginRedux"
import { useNavigate } from "react-router-dom"


const Profile = () => {
    const UserData = useSelector((state) => state.login.userData)
    const profileFieldChanges = useSelector((state) => state.login.profileFieldChange)
    const profileModel = useSelector((state) => state.login.profilemodel)
    const DrawerOpenClose = useSelector((state) => state.login.profileDrawer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [changeValue, SetChangeValue] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: 'Password'
    })
    
    useEffect(() => {
        FetchUserData(dispatch)
        SetChangeValue({
            name: UserData.name,
            email: UserData.email,
            phoneNumber: UserData.phoneNumber,
            password: 'Password'
        })
    }, [dispatch, UserData]);
    


    const handleChange = (e) => {
        const { name } = e.target
        dispatch(ProfileFieldChangeTrue(name))

    }

    const handleChangeValue = (e) => {
        const { name, value } = e.target
        SetChangeValue(prev => ({ ...prev, [name]: value }))
    }

    const [confirmPasswordValue, setConfirmPasswordValue] = useState()

    const handleConfirmValue = (e) => {
        setConfirmPasswordValue(e.target.value)
    }


    const modalFunction = () => {
        const data = {
            userId: localStorage.getItem('user'),
            password: confirmPasswordValue
        }
        if (changeValue.password !== 'Password' && changeValue.password !== '') {
            const profileUpdatedData = {
                userId: localStorage.getItem('user'),
                name: changeValue.name,
                email: changeValue.email,
                phoneNumber: changeValue.phoneNumber,
                password: changeValue.password

            }
            PasswordCheck(data, profileUpdatedData, dispatch)

        } else {
            const profileUpdatedData = {
                userId: localStorage.getItem('user'),
                name: changeValue.name,
                email: changeValue.email,
                phoneNumber: changeValue.phoneNumber,
            }
            PasswordCheck(data, profileUpdatedData, dispatch)

        }
    }

    const handleUpdate = () => {
        dispatch(ProfileModel(true))

    }

    const handleDraweronclose = () => {
        dispatch(ProfileDrawer(false))
        dispatch(ProfileFieldChangeFalse())

    }

    const handlePathtoNavigate = () =>{
        dispatch(ProfileModel(true))
        dispatch(ProfileDrawer(false))
        navigate('/reset')
    }

    

    return (
        <Drawer
            destroyOnClose
            open={DrawerOpenClose}
            title="PROFILE"
            onClose={() => handleDraweronclose()}
        >
            <div>
                <div className="ProfileIcon">
                    <UserOutlined />
                </div>
                <div className="ProfileContext">
                    <div className="nameDiv">
                        {profileFieldChanges.username ?
                            <>
                                <input className="changeInput" onChange={(e) => handleChangeValue(e)} name='name' placeholder="username" value={changeValue.name} ></input>
                            </>
                            :
                            <>
                                <div>{changeValue.name}</div>
                                <button className="ChangeButton" name="username" onClick={(e) => handleChange(e)}>Change</button>
                            </>

                        }

                    </div>
                    <div className="endLine"></div>
                    <div className="nameDiv">
                        {profileFieldChanges.phoneNumber ?
                            <>
                                <input className="changeInput" onChange={(e) => handleChangeValue(e)} name='phoneNumber' placeholder="PhoneNumber" value={changeValue.phoneNumber} ></input>
                            </>
                            :
                            <>
                                <div>{changeValue.phoneNumber}</div>
                                <button className="ChangeButton" name="phoneNumber" onClick={(e) => handleChange(e)}>Change</button>
                            </>

                        }

                    </div>
                    <div className="endLine"></div>
                    <div className="nameDiv">
                        {profileFieldChanges.email ?
                            <>
                                <input className="changeInput" onChange={(e) => handleChangeValue(e)} name='email' placeholder="email" value={changeValue.email} ></input>
                            </>
                            :
                            <>
                                <div>{changeValue.email}</div>
                                <button className="ChangeButton" name="email" onClick={(e) => handleChange(e)}>Change</button>
                            </>

                        }

                    </div>
                    <div className="endLine"></div>
                    <div className="nameDiv">
                        {profileFieldChanges.password ?
                            <>
                                <input className="changeInput" onChange={(e) => handleChangeValue(e)} name='password' type="password" placeholder="password" value={changeValue.password} ></input>
                            </>
                            :
                            <>
                                <div type='password' style={{ webkitTextSecurity: 'disc' }}>{changeValue.password}</div>
                                <button className="ChangeButton" name="password" onClick={(e) => handleChange(e)}>Change</button>
                            </>

                        }

                    </div>

                </div>
                <button onClick={() => handleUpdate()} className="updateButton">UPDATE</button>
                {profileModel && <div className="modalDiv">
                    <div className="modelSection">
                        <div className="headerText">
                            <p>Confirm Password</p>
                        </div>
                        <div style={{ marginTop: '25px' }}>
                            <div>
                                <input onChange={(e) => handleConfirmValue(e)} className="changeInputModal" type="password" name="password" placeholder="Password"></input>
                                
                            </div>
                            <div className="modalResetDiv" onClick={()=>handlePathtoNavigate()}>Reset Password</div>
                            <div className="ModelButtonDiv">
                                <button className="confirmButton" onClick={() => modalFunction()}>Confirm</button>
                                <button className="cancelButton" onClick={() => dispatch(ProfileModel(false))}>Cancel</button>
                            </div>

                        </div>
                    </div>
                </div>}
            </div>

        </Drawer>
    )
}
export default Profile;