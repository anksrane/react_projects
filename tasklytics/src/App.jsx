import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TaskListPage from './pages/TaskListPage';
import DeletedListPage from './pages/DeletedListPage';
import DashboardPage from './pages/DashboardPage';
import { AppLayout } from './components';
import  ProtectedRoutes  from './routes/ProtectedRoutes'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './features/auth/authActions';
import { Loader } from './components';
import { toggleSidebar } from "./features/ui/uiSlice";

function App() {
    const dispatch=useDispatch();
    const { loading } = useSelector((state)=>state.auth);

    useEffect(()=>{
      dispatch(checkAuth());
      dispatch(toggleSidebar());
    },[dispatch])

    if(loading){
      return <Loader />
    }

    return (
      <Routes>
        {/* Public Route */}
        <Route path='/login' element={<LoginPage />}></Route>

        {/* Private Route */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<AppLayout />}>
            <Route path='/tasks' element={<TaskListPage />}/>
            <Route path='/deleted' element={<DeletedListPage />}/>
            <Route path='/dashboard' element={<DashboardPage />}/>
          </Route>
        </Route>

        <Route path='*' element={<Navigate to="/dashboard" replace />} />
      </Routes>
    )
}

export default App
