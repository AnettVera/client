/*Navegar entre componentes por medio de URL*/
import React from 'react'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import SignInPage from '../modules/auth/SignInPage';
import { useContext } from 'react';
import AuthContext from '../config/context/auth-context';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import UserPage from '../modules/admin/user/UserPage';

const AppRouter = () => {
    const { user } = useContext(AuthContext);
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                {user.signed ? (
                    <>
                        <Route path='/' element={<AdminLayout />}>
                            {
                               
                            }
                            <Route path='/' element={<>Dashboard</>} />
                            <Route path='dashboard' element={<>Dashboard</>} />
                            <Route path='users' element={<UserPage />} />
                            <Route path='products' element={<>Dashboard</>} />
                        </Route>
                    </>
                ) : (
                    <Route path="/" element={<SignInPage />} />
                )}
                <Route path='/*' element={<>404 not found</>} />
            </>
        )
    );
    return (
        < RouterProvider router={router} />
    );
}

export default AppRouter