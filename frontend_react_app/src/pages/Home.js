import React, { useEffect, useState } from 'react'
import axios from "axios";
import Listing from './Listing';
import Item1 from './Item1'

const Home = () => {

    const [status, setStatus] = useState(false)

    useEffect(() => {
        console.log(status)
    }, [status])
 
    const getStatus = async () => {
        const response = await fetch('http://172.20.10.2:80/checkBoxStatus')
        const data = await response.json()
        setStatus(data);
        console.log('this is data: ', data)
    }

    getStatus()
    if(status == false){
        console.log('status detected as false')
        return(
            <Listing/>
        )
    }
    else{
        console.log('status detected as true')
        return(
            <Item1/>
        )
    }
}

export default Home