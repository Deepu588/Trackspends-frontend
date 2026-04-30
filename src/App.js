import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Registration from './components/Registration';
import {ToastContainer} from 'react-toastify'
import Login from './components/Login';
import MasterLayout from './masterlayout/MasterLayout';
import ForgotPassword from './components/ForgotPassword';
import SetPassword from './components/SetPassword';
import EmailVerification from './components/EmailVerification';
import ProtectedRoute from './helper/ProtectedRoute';
// import Dashboard from './components/Dashboard';
import AddExpense from './components/AddExpense';
import MonthlySavings from './components/MonthlySavings';
import AddFeedback from './components/AddFeedback';
import TotalExpensesInRange from './components/TotalExpensesInRange';
import AllExpenses from './components/ViewExpenses';
import EditExpense from './components/EditExpense';
import ChatHistory from './components/ChatHistoryPage';
import ChatPage from './components/ChatPage';
import Dboard from './components/Dbaord';
function App() {
  return (
   <>
   <BrowserRouter>
      <ToastContainer/>

   <Routes>

    <Route path='/register' element={<Registration/>}/>
    <Route path='/verify-email' element={<EmailVerification/>}/>
    <Route path='/' element={<Login/>}/>
    <Route path='/forgot-password' element={<ForgotPassword/>}/>
    <Route path='/reset-password' element={<SetPassword/>}/>
    <Route path='/layout' element={<MasterLayout/>}/>
    <Route path='/dboard' element={<ProtectedRoute><MasterLayout><Dboard/></MasterLayout></ProtectedRoute>}/>
    <Route path='/add-expense' element={<ProtectedRoute><MasterLayout><AddExpense/></MasterLayout></ProtectedRoute>}/>
    <Route path='/monthlysavings' element={<ProtectedRoute><MasterLayout><MonthlySavings/></MasterLayout></ProtectedRoute>}/>
   <Route path='/send-feedback' element={<ProtectedRoute><MasterLayout><AddFeedback/></MasterLayout></ProtectedRoute>}/>
   <Route path='/total-expenses' element={<ProtectedRoute><MasterLayout><TotalExpensesInRange/></MasterLayout></ProtectedRoute>}/>
   <Route path='/expenses' element={<ProtectedRoute><MasterLayout><AllExpenses /></MasterLayout></ProtectedRoute>} />
<Route path='/edit-expense/:id' element={<ProtectedRoute><MasterLayout><EditExpense /></MasterLayout></ProtectedRoute>} />
 
  <Route path="/chat" element={<ProtectedRoute><MasterLayout><ChatPage /></MasterLayout></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><MasterLayout><ChatHistory /></MasterLayout></ProtectedRoute>} />
   {/* <Route path="/dashboard" element={<ProtectedRoute><MasterLayout><Dashboard/></MasterLayout></ProtectedRoute>}/> */}
   
    </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
