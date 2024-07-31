import { Redirect } from 'react-router-dom'
import './index.css'

const Dashboard = (props) => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData === null){
        return <Redirect to='/login' />
    }
    
    const userData = JSON.parse(storedUserData);
    const {user_id, user_firstname, user_lastname, user_city, user_phone, user_zipcode} = userData[0]
    console.log(user_zipcode)
    const renderUserDetails = () => (
        <div className='details-card'>
            <h1 className='user-heading'>User Details</h1>
            <div className='details-text-card'>
                <p className='text'>User Id: {user_id}</p>
                <p className='text'>User First Name: {user_firstname}</p>
                <p className='text'>User Last Name: {user_lastname}</p>
                <p className='text'>User City: {user_city}</p>
                <p className='text'>User Phone No: {user_phone}</p>
                <p className='text'>User Zipcode: {user_zipcode}</p>
            </div>
        </div>
    )
    const handleLogout = () => {
        localStorage.removeItem('userData');
        const { history } = props;
        history.replace("/login");
    }
    return(
        <div className="dashboard-card">
            <div className="header-card">
                <h1 className="name">chandrakiran</h1>
                <img className='logo-img'  src='https://www.syoft.com/assets/img/logo-color.png' alt='logo'/>
                <button className='logout-btn' onClick={handleLogout} type="button">Log Out</button>
            </div>
            {renderUserDetails()}
        </div>
    )
}

export default Dashboard