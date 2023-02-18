import React, { useState } from 'react';

const SearchBar = (props) => {
    const [searchEmployee, setsearchEmployee] = useState('')

    function goGetEmployees(event){
        event.preventDefault();
        let response = props.employees.filter((employee) => {
            if (employee.firstName.includes(searchEmployee) || employee.lastName.includes(searchEmployee) || employee.jobTitle.includes(searchEmployee) || employee.first_name.includes(searchEmployee) || employee.last_name.includes(searchEmployee)){
                return true;
            }
            else{
                return false;
            }});
        props.setEmployees(response)
    }

    return ( 
        <form className='entire-search-bar' onSubmit={goGetEmployees}>
            <input className='search-box' type='text' value={searchEmployee} onChange={(event) => setsearchEmployee(event.target.value)}/>
            <button className='search-btn' type='submit'>Search</button>
        </form>
    );
}

export default SearchBar;