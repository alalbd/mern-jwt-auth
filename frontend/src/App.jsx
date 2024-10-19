import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/template/header';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './components/contexts/AuthContext.jsx';
import Home from './components/pages/home';
import Login from './components/pages/login';
import Register from './components/pages/register';
import Dashboard from './components/pages/admin/dashboard';
import PostList from './components/pages/admin/PostList';
import PrivateRoute from './components/routes/PrivateRoute.jsx';
import NotFound from './components/pages/notFound.jsx';
import PublicRoute from './components/routes/PublicRoute.jsx';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <div className="body-bg">
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route element={<PublicRoute />}>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
              </Route>
              <Route path='/user' element={<PrivateRoute />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='all/post' element={<PostList />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
          <ToastContainer />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
