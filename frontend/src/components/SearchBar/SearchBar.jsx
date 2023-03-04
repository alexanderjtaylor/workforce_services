import React, { useState } from 'react';

const SearchBar = (props) => {
    const [searchEmployee, setsearchEmployee] = useState('')

    function goGetEmployees(event){
        event.preventDefault();
        let response = props.employees.filter((employee) => {
            if (searchEmployee.includes(employee.firstName) || searchEmployee.includes(employee.lastName) || searchEmployee.includes(employee.firstName + " " + employee.lastName) || searchEmployee.includes(employee.jobTitle) || employee.payRate.includes(searchEmployee)  || employee.OTPayRate.includes(searchEmployee)  || employee.sickTime.includes(searchEmployee) || employee.vacationTime.includes(searchEmployee) || searchEmployee.includes(employee.first_name)){
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