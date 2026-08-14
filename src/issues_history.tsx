import { useState, useEffect } from "react"
import { supabase } from './supabase'
import { useNavigate } from "react-router-dom"

export default function HistoryIssue() {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [history, setHistory] = useState([])
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
        alignItems: 'stretch',
        justifyContent: 'center'
    }

    useEffect(() => {
        supabase.from('issue_status_history').select('*,issues(title)').order('changed_at', { ascending: false }).then(({ data, error }) => {
            setHistory(data || [])
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (<p style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Loading...</p>)
    }
    if (history.length < 1) {
        return (<p style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>You hadn't sent something yet</p>)
    }

    return (
        <div style={{ width: '95%', maxWidth: '1400px', margin: '0 auto', color: 'white' }}>
            <h2 style={{ textAlign: 'center' }}>Welcome in history page</h2>
            <p style={{ textAlign: 'center', marginBottom: '30px',color:'#5f6470' }}>Your report history</p>
            <div style={{borderBottom: '1px solid #24272f', margin: '20px 0' }}></div>
            <button onClick={() => navigate("/lobyy")}
                style={{
                    top: '20px',
                    left: '20px',
                    position: 'fixed',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    width: '125px'
                }}>
                Back to lobyy</button>

            <div style={{ overflow: 'hidden', width: '100%' }}>
                <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <div style={{ minWidth: '1000px' }}>
                        <div style={rowStyle}>
                            <strong style={CellSize('100px')}>№</strong>
                            <strong style={CellSize('400px')}>Title</strong>
                            <strong style={CellSize('130px')}>Status</strong>
                            <strong style={CellSize('160px')}>Action</strong>
                            <strong style={CellSize('200px')}>Date</strong>
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {history.map((request, index) => (
                                <li key={request.id} style={rowStyle}>
                                    <div style={CellSize('100px')}><strong>#{history.length - index}</strong></div>
                                    <div style={CellSize('400px')}>{request.issues?.title}</div>
                                    <div style={CellSize('130px')}><strong>{request.new_status}</strong></div>
                                    <div style={CellSize('160px')}>{request.comment}</div>
                                    <div style={CellSize('200px')}>{new Date(request.changed_at).toLocaleString()}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}