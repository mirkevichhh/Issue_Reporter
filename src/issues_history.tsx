import { useState , useEffect} from "react"
import {supabase } from './supabase'
import { useNavigate } from "react-router-dom"

export default function HistoryIssue(){
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [history, setHistory ] = useState([])
    const navigate = useNavigate()

    const CellSize = (width) => ({
        border: '2px solid #26354A',
        backgroundColor: '#111827',
        borderRadius: '4px',
        padding: '5px 8px', 
        width: width,
        wordBreak: 'break-all', 
        minWidth: 0,
        boxSizing: 'border-box', 
        wordWrap: 'break-word', 
        color: '#F1F5F9' 
    })

    const rowStyle = {
        display: 'flex',
        gap: '5px', 
        marginBottom: '5px', 
        width: '100%',
        alignItems: 'stretch' 
    }
    useEffect(() => {
        supabase.from('issue_status_history').select('*,issues(title)').order('changed_at', { ascending: false }).then(({data, error}) =>{
        setHistory(data || [])
        setLoading(false)}
    )},[])
    if (loading){
        return(<p>Loading...</p>)
    } 
    if(history.length<1){
        return(<p>You hadn't sent something yet</p>)

    }
    return(
        <div style = {{margin:'0 auto'}}>
            <h2>Welcome in history page</h2>
            <h3>Your report history</h3>
            <button onClick={() => navigate("/lobyy")}
                style = {{
                    top:'20px',
                    left: '20px',
                    position: 'fixed',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    width: '125px'
                }}>
            Back to lobyy</button>
            <div style = {rowStyle}>
                <strong style={CellSize('60px')}>№</strong>
                <div style={CellSize('500px')}>Title</div>
                <strong style={CellSize('120px')}>Status</strong> 
                <div style={CellSize('150px')}>Action</div> 
                <span style={CellSize('190px')}>Data</span>
            </div>
                
                <ul style = {{listStyle: 'none', padding: 0, margin: 0}}>
                    {history.map((request, index) =>(
                    <li key = {request.id} style = {rowStyle}>
                        <strong style={CellSize('60px')}>#{history.length-index} </strong>
                        <div style={CellSize('500px')}>{request.issues?.title}</div>
                        <strong style={CellSize('120px')}>{request.new_status} </strong> 
                        <div style={CellSize('150px')}>{request.comment}</div> 
                        <span style={CellSize('190px')}>{new Date(request.changed_at).toLocaleString()}</span></li>
                ))}
                </ul>
            
        </div>
    )
}