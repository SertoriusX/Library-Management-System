import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import userContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';
export default function Navbar() {
    const {token,logout}=useContext(userContext)
    const navigate=useNavigate()
    const handleLogout=()=>{
        logout()
        navigate('/login')

    }
  return (
    <div className="bg-light  p-3 shadow" style={{ minWidth: '220px' }}>
      <h3 className="text-center mb-4">Library</h3>
      <ul className="list-unstyled">
        {/* Home Link */}
      
        {/* Home Link 
  <li className="mb-2">
          <NavLink
            to="register"
            className={({ isActive }) =>
              isActive ? 'btn btn-primary w-100 text-start' : 'btn btn-outline-primary w-100 text-start'
            }
          >
            Register
          </NavLink>
        </li>
*/}
       {token ? (
  <>
    <li className="mb-2">
      <a className="btn btn-outline-secondary w-100 text-start d-flex justify-content-between align-items-center"
         data-bs-toggle="collapse" href="#booksMenu" role="button" aria-expanded="false" aria-controls="booksMenu">
        Books <span>&#9662;</span>
      </a>
      <ul className="collapse list-unstyled mt-1 ps-3" id="booksMenu">
        <li className="mb-1">
          <NavLink to="createBook" className="btn btn-sm btn-outline-primary w-100 text-start">Create Book</NavLink>
        </li>
        <li>
          <NavLink to="/showBook" className="btn btn-sm btn-outline-primary w-100 text-start">Show Books</NavLink>
        </li>
      </ul>
    </li>










    <li className="mb-2">
      <a className="btn btn-outline-secondary w-100 text-start d-flex justify-content-between align-items-center"
         data-bs-toggle="collapse" href="#borrowMenu" role="button" aria-expanded="false" aria-controls="booksMenu">
        Borrow <span>&#9662;</span>
      </a>
      <ul className="collapse list-unstyled mt-1 ps-3" id="borrowMenu">
        <li className="mb-1">
          <NavLink to="/BorrowForm" className="btn btn-sm btn-outline-primary w-100 text-start">Create Borrow Form</NavLink>
        </li>
        <li>
          <NavLink to="/SeeBorrow" className="btn btn-sm btn-outline-primary w-100 text-start">Show Borrow</NavLink>
        </li>
      </ul>
    </li>


    

    <li className="mb-2">
      <a className="btn btn-outline-secondary w-100 text-start d-flex justify-content-between align-items-center"
         data-bs-toggle="collapse" href="#personsMenu" role="button" aria-expanded="false" aria-controls="personsMenu">
        Persons <span>&#9662;</span>
      </a>
      <ul className="collapse list-unstyled mt-1 ps-3" id="personsMenu">
        <li className="mb-1">
          <NavLink to="createPerson" className="btn btn-sm btn-outline-primary w-100 text-start">Create Person</NavLink>
        </li>
        

          

        <li>
          <NavLink to="/showPerson" className="btn btn-sm btn-outline-primary w-100 text-start">Show Persons</NavLink>
        </li>
      </ul>
    </li>

    <li className="mb-2">
      <button className="btn btn-outline-danger w-100 text-start" onClick={handleLogout}>Logout</button>
    </li>
  </>
) : (
  <li className="mb-2">
    <NavLink to="/login" className={({ isActive }) =>
      isActive ? 'btn btn-primary w-100 text-start' : 'btn btn-outline-primary w-100 text-start'}>
      Login
    </NavLink>
  </li>
)}

        
       

     
      </ul>
    </div>
  );
}
