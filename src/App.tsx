import Auth from './Auth' 
import {useState , useEffect} from 'react'
import { supabase } from './supabase'
import User_ofice from './User_ofice'
import { Route , Routes} from 'react-router-dom'
import HistoryIssue from './issues_history'
import { Navigate } from 'react-router-dom'
import AdminPanel from './AdminPanel'
import AdminHistory from './AdminHistory'
import DetailsIssue from './IssueDetails'




export default function App() {
  const [session, setSession] = useState(null)
  const [role, setRole ] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getRole = async (userId) => {
        const { data, error } = await supabase.from('profiles').select('role').eq('id', userId).single()
        if (error || !data) {
            await supabase.auth.signOut(); 
            setSession(null);              
            setRole(null);                 
            setLoading(false);             
            return;                       
        }
        
        setRole(data.role)
        setLoading(false)
    }
    const {data: { subscription }} = supabase.auth.onAuthStateChange(async (event, session) => {
        setSession(session)
        
        if (session) {
            setLoading(true)
            await getRole(session.user.id)
        } else {
            setRole(null)
            setLoading(false)
        }
    })
    
    return () => subscription.unsubscribe()
  }, [])


  if (loading){
    return(
    <div>
      Loading...
    </div>
    )}
  
  return(
    <Routes>
      <Route path = "/" element ={!session ? <Navigate to="/authorization"/> : (role === 'admin' )? <Navigate to="/admin_lobby"/> : <Navigate to="/lobyy"/> } />
      <Route path = "/authorization" element = {session ? <Navigate to="/"/> : <Auth/>} />


      <Route path = "/lobyy" element = {session && (role === 'user' )? <User_ofice/> : <Navigate to = "/authorization"/>} />
      <Route path = "/user_history" element = {session && (role === 'user' )? <HistoryIssue/> : <Navigate to = "/authorization"/>} />

      <Route path = "/issue/:id" element = {<DetailsIssue/>}/>
      <Route path = "/admin_lobby" element ={session && (role === 'admin' )? <AdminPanel/> : <Navigate to="/authorization" />}/>
      <Route path = "/history_for_admin" element ={session && (role === 'admin' )? <AdminHistory/> : <Navigate to="/authorization"/>}/>
    </Routes>
    
  )
}


