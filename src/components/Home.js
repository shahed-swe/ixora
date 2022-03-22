import {useState, useEffect, useCallback} from 'react';
import Axios from 'axios';

const Home = () => {

    // state for users
    const [data, setData] = useState([])
    const [searchData, setSearchData] = useState([])
    // user details
    const [user, setUser] = useState([])

    const fetchUser = useCallback(async() => {
        try {
            const config = {
                headers: {
                    "Content-Type":"application/json"
                }
            }
            const response = await Axios.get("https://jsonplaceholder.typicode.com/users", config)
            if(response.status === 200){
                setData(response.data)
            }
        } catch (error) {
            if(error){
                console.log("Network Error Occured")
            }
        }
    },[])


    // fetching user
    useEffect(() => {
        fetchUser()
    },[fetchUser])


    // handle Search
    const handleSearch = (value) => {
        setUser(null)
        setSearchData(null)
        console.log(value)
        const newData = data.filter(item => item.username.toLowerCase().match(value))
        setSearchData(newData)

        if(value === ""){
            fetchUser()
        }
    }

    return (
        
        <div className='container mt-4'>
            <div className="row">
                <div className="form-group col-lg-9 mx-auto">
                    <h1 className='text-center'>Search Users</h1>
                    <input type="text" className='form-control' name="" id="" onChange={(event) =>handleSearch(event.target.value)}/>
                </div>
            </div>
            {/* user list */}
            <h1 className='fw-bolder text-center mt-4'>Users</h1>
            <div className='mt-2'>
                <div className='row'>
                    {searchData && searchData.map((item, index) => {
                        return (
                            <div className='col-lg-3 col-md-6 col-sm-12 p-2' onClick={() => setUser(item)} key={index} style={{cursor:"pointer"}}>
                                <div className="card p-2">
                                    <span>Name: {item.name}</span>
                                    <span>Usename: {item.username}</span>
                                    <span>Email: {item.email}</span>
                                </div>
                            </div>
                            
                        )
                    })}
                </div>
            </div>


            {user && Object.keys(user).length ? (
                <div>
                    <p className='fw-bolder text-center fs-5'>User Details</p>
                    <div className='card p-2 col-6'>
                        <div>Name: {user.name}</div>
                        <div>User Name: {user.username}</div>
                        <div>Address: {`${user.address.street} ${user.address.suite} ${user.address.city} ${user.address.zipcode}`}</div>
                        <div>Phone: {user.phone}</div>
                        <div>Website: <a href={`https://${user.website}`}>{user.website}</a></div>
                        <div>Company: {user.company.name}</div>
                    </div>
                    
                </div>
            ) : null}
            
        </div>
    );
};

export default Home;