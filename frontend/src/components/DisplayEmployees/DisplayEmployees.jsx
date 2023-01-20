


const DisplayEmployees = (props) => {
    return ( 
        <table className='prop-tabel'>
          <thead>
            <tr>
              <th className='prop-labels'>Employee ID</th>
              <th className='prop-labels'>First Name</th>
              <th className='prop-labels'>Last Name</th>
              <th className='prop-labels'>DOB</th>
              <th className='prop-labels'>Address</th>
              <th className='prop-labels'>Phone Number</th>
              <th className='prop-labels'>Job Title</th>
              <th className='prop-labels'>Years with Company</th>
              <th className='prop-labels'>Employer</th>
            </tr>
          </thead>
          <tbody>
            {props.employees.map((employee, index) => {
              return (
                <tr key={index + 1}>
                  <td className='prop-values'>{index + 1}</td>
                  <td className='prop-values'>{employee.id}</td>
                  <td className='prop-values'>{employee.firstName}</td>
                  <td className='prop-values'>{employee.lastName}</td>
                  <td className='prop-values'>{employee.dob}</td>
                  <td className='prop-values'>{employee.address}</td>
                  <td className='prop-values'>{employee.phoneNumber}</td>
                  <td className='prop-values'>{employee.jobTitle}</td>
                  <td className='prop-values'>{employee.yearsWithCompany}</td>
                  <td className='prop-values'>{employee.employer}</td>
                  {/* <Delete songId={song.id} getAllSongs = {props.getAllSongs}/> */}
                </tr>
              );
            })}
          </tbody>
        </table>
     );
}
 
export default DisplayEmployees;