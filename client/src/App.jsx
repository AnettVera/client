import { useEffect, useReducer } from 'react';
import AuthContext from './config/context/auth-context';
import { authManager } from './config/context/auth-manager';
import AppRouter from './router/AppRouter';
import './output.css'

//localStorage almacena Strings 
const init = () => {
  return JSON.parse(localStorage.getItem('user')) || {signed:false};
}

function App() {
  const [user, dispatch] = useReducer(authManager, {}, init);
  useEffect(()=>{           
    if(!user) return;
    localStorage.setItem('user', JSON.stringify(user))
  }, [user]);
  //useEffect -> (callback, dependencies)
  //dependencies -> [user]
  //Si hay un cambio en user -> callback se ejecuta nuevamente
  //El useEffect se compone de 2 partes, 
  //un callback, y una lista de dependencias. 
  //Cuando algo cambia en la sesión del usuario, vuelve a ejecutar el callback

  //React.Fragment
  //Provider va a almacenar el objeto en la propiedad value
  return ( 
  <AuthContext.Provider value={{user, dispatch}}>
    <AppRouter />
  </AuthContext.Provider>
  );
}

export default App
