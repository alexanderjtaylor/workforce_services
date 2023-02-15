import  React, { useState , useEffect } from 'react'

export const DateTime = () => {

    var [date, setDate] = useState(new Date());
    
    useEffect(() => {
        let timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }   
    });

    return(
        <div className='live-clock'>
            <p className='active-date'> Date : {date.toLocaleDateString()}</p>
            <p className='active-clock'> Time : {date.toLocaleTimeString()}</p>
        </div>
    )
}

export default DateTime