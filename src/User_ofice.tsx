import {supabase} from './supabase'
import { useNavigate } from 'react-router-dom'
import { useEffect , useState} from 'react'
import { browser } from 'react-dom';


export default function User_ofice() {
    const navigate = useNavigate() 
    const [userEmail , setUserEmail] = useState('')
    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')
    const [category , setCategory] = useState('Bug')
    const [loading , setLoading] = useState(false)
    const [message , setMessage] = useState('')
    const username = userEmail.split('@')[0]
    useEffect(() => {
        supabase.auth.getUser().then(({data:{user}}) =>{
            if(user){
                setUserEmail(user.email)
            }})
            
        
    }, [])

    const logout = async () => {
        await supabase.auth.signOut()
        navigate("/authorization")
    }


    const Info_about_report = async(e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try{
            const {data:{ user }} = await supabase.auth.getUser()
            if(!user){
                setMessage('please make authorization')
                return 
            }
            const currentBrowser = navigator.userAgent;
            const currentPage = window.location.href;
            const generatedCorrelationId = crypto.randomUUID();
        
            const {error} = await supabase.from('issues').insert({
                title: title,
                category : category,
                description: description,
                author_id : user.id ,
                browser_info: currentBrowser,
                page_url: currentPage,
                app_version : '1.0.0',
                status: 'New',
                correlation_id: generatedCorrelationId

            })

            

            if (error){
                setMessage("Error:" + error.message)
            }else{
                setMessage("Report was send")
                setTitle('')
                setDescription('')
                setCategory('Bug')
            }
        }catch (error){
            setMessage("Something is going wrong")
        }finally{
            setLoading(false)
        }
    }
    return(
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            <div style={{ padding: '50px', maxWidth: 'clamp(400px, 40vw, 700px)', width: '100%', boxSizing: 'border-box', textAlign: 'center' , whiteSpace: 'nowrap'}}>
                <h2 style={{marginBottom:'30px', fontSize: 'clamp(18px, 2.2vw, 24px)'}}>Welcome to {username}'s office</h2>
                <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 50px)'}}>Report an Issue</h1>

                <button 
                    onClick={logout} 
                    style={{ 
                        position: 'fixed', 
                        top: '20px',       
                        right: '20px',     
                        padding: '8px 16px',
                        cursor: 'pointer',
                        width: '125px'
                    }}
                >Log out</button>
            
                <button
                    onClick={() => navigate("/user_history")}
                    style={{
                        top:'20px',
                        left: '20px',
                        position: 'fixed',
                        padding: '8px 16px',
                        cursor: 'pointer',
                        width: '125px'
                    }}>
                    History
                </button>
                
                <form onSubmit={Info_about_report}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
                        <label style={{ marginBottom: '10px', width: '100%' }}>Short about your problem</label>
                        <input type="text" placeholder="Example: I can't click on buttle of my profile" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }}/> 
                    </div>
                    <div style={{ display:'flex', flexDirection: 'column', marginBottom: '15px' }}>
                        <label style={{ marginBottom: '10px', width: '100%' }}>Chosee category of the problem </label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', boxSizing: 'border-box' }}>
                            <option value="Bug">Bug</option>
                            <option value="UX">UX (bad interface)</option>
                            <option value="Performance">Performance (lags)</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
                        <label style={{ marginBottom: '10px', width: '100%' }}>Detailed description what happened</label>
                        <textarea placeholder='Can you tell for us situation in all details' value={description} style={{ height: '200px', width: '100%', boxSizing: 'border-box' }} onChange={(e) => setDescription(e.target.value)} />  
                    </div>

                    <button type="submit" disabled={loading} style={{ padding: '8px 16px', cursor: 'pointer', width: '150px' }}>
                        {loading ? 'Sending... ' : 'Send Report'}
                    </button>
                </form>
            </div>
        </div>
    )
}



