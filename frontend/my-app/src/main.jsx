import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';       // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';     
import './index.css';
import App from './App.jsx';
import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import UserContextProvider from './context/UserContextProvider.jsx';
import CreateBook from './components/CreateBook.jsx';
import ShowBook from './components/ShowBook.jsx';
import CreatePerson from './components/CreatePerson.jsx';
import ShowPerson from './components/ShowPerson.jsx';
import BorrowForm from './components/BorrowForm.jsx';
import SeeBorrow from './components/SeeBorrow.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='home' element={<Home />}/>
      <Route path='register' element={<Register />}/>
      <Route path='login' element={<Login />}/>
      <Route path='createBook' element={<CreateBook />}/>
      <Route path='showBook' element={<ShowBook />}/>
      <Route path='createPerson' element={<CreatePerson />}/>
      <Route path='showPerson' element={<ShowPerson />}/>
      <Route path='BorrowForm' element={<BorrowForm/>}/>
      <Route path='SeeBorrow' element={<SeeBorrow/>}/>

          </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <UserContextProvider>

    <RouterProvider router={router} />
    </UserContextProvider>
  </StrictMode>
);
