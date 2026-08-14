
import {supabase} from './supabase'
import { useEffect , useState} from 'react'
import { Routes, useNavigate } from 'react-router-dom'


export default function AdminPanel() {
    const navigate = useNavigate() 
    const [issue , setIssue] = useState([])
    const [selectedFilter , setSelectedFilter] = useState([])
    const [isOpen , setIsOpen] = useState(false)
    
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


    const selectStyle = {
        backgroundColor: '#111827',
        border: '2px solid #14B8A6',
        color: '#F1F5F9',
        borderRadius: '4px',
        padding: '10px 8px' ,
        width: '100%',
        boxSizing: 'border-box',
        cursor: 'pointer',
        outline: 'none',
        fontSize: '16px'
    }


    const rowStyle = {
        display: 'flex',
        gap: '5px', 
        marginBottom: '5px', 
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'center' 
    }


    const logout = async () => {
        await supabase.auth.signOut()
        navigate("/authorization")
        
    }



    const upgrade_status = async(id , newStatus) => {
        setIssue(prev => prev.map(iss => iss.id === id? {...iss , status:newStatus}:iss))
        const{error} = await supabase.from('issues').update({status : newStatus }).eq('id',id)

    }
    const actionList = (filterName) =>{
        if (selectedFilter.includes(filterName)){
            setSelectedFilter(selectedFilter.filter(item => item!=filterName))
        }else{
            setSelectedFilter([...selectedFilter,filterName])
        }
    }

    
    

    useEffect(() => {
            supabase.from('issues').select('*,profiles(email)').order('created_at', { ascending: false }).then(({ data  }) => {
                setIssue(data)               
            })
        }, [])

    let filteredProblems = []
    if (selectedFilter.length === 0 || selectedFilter.includes('All')){
        filteredProblems = issue
    }else{
        filteredProblems = issue.filter(iss=>
            selectedFilter.includes(iss.status) || selectedFilter.includes(iss.category)

        )
    }
    
    
    return(
       <div style={{  width: '95%',position: 'relative', maxWidth: '1400px', margin: '0 auto', color: 'white' }}>
            <h2 style={{ textAlign: 'center', top:'10px' }}>Welcome, Admin 👋</h2>
            
            <button
            onClick = {() => navigate("/history_for_admin")}
            style = {{
                top:'20px',
                left: '20px',
                position: 'fixed',
                padding: '8px 16px',
                cursor: 'pointer',
                width: '125px'
            }}>
                History of user
            </button>
            
            <button 
            onClick={logout} 
            style = {{ 
                position: 'fixed', 
                top: '20px',       
                right: '20px',     
                padding: '8px 16px',
                cursor: 'pointer',
                width: '125px' 
            }}
            >Log out</button>

            
            <div style={{ marginTop: '30px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                flexDirection: 'column',
                width: '15%'
            }}> 
                <strong style = {CellSize('100%')}>Filters</strong>
                
                <strong style={selectStyle} onClick = {() => setIsOpen(!isOpen)} >Select</strong>
                 {isOpen && ( 
                <div style={{
                    position: 'absolute', 
                    marginTop: '100px', 
                    width: '15%',    
                    zIndex: 10,        
                    display: 'flex',
                    flexDirection: 'column',
                    }}>
                    
                    <div style={selectStyle} onClick = {() => actionList('All')}>{selectedFilter.includes('All') ? '✓ ' : ''}All</div>
                    <div style={selectStyle} onClick = {() => actionList('New')}>{selectedFilter.includes('New') ? '✓ ' : ''}New</div>
                    <div style={selectStyle} onClick = {() => actionList('Triaged')}>{selectedFilter.includes('Triaged') ? '✓ ' : ''}Triaged</div>
                    <div style={selectStyle} onClick = {() => actionList('In process')}>{selectedFilter.includes('In process') ? '✓ ' : ''}In process</div>
                    <div style={selectStyle} onClick = {() => actionList('Resolved')}>{selectedFilter.includes('Resolved') ? '✓ ' : ''}Resolved</div>
                    <div style={selectStyle} onClick = {() => actionList('Rejected')}>{selectedFilter.includes('Rejected') ? '✓ ' : ''}Rejected</div>
                    <div style={selectStyle} onClick = {() => actionList('Bug')}>{selectedFilter.includes('Bug') ? '✓ ' : ''}Bug</div>
                    <div style={selectStyle} onClick = {() => actionList('UX')}>{selectedFilter.includes('UX') ? '✓ ' : ''}UX</div>
                    <div style={selectStyle} onClick = {() => actionList('Performance')}>{selectedFilter.includes('Performance') ? '✓ ' : ''}Performance</div>
                    <div style={selectStyle} onClick = {() => actionList('Other')}>{selectedFilter.includes('Other') ? '✓ ' : ''}Other</div>
                </div>
                )}
                    
                
                
            </div>
            

            <div style={{ marginTop: '30px' }}>
                <div style={rowStyle} >
                <strong style={(CellSize('100px'))}>№</strong>
                <strong style={CellSize('400px')}>Title</strong>
                <strong style={CellSize('180px')}>Status</strong> 
                <strong style={CellSize('150px')}>Category</strong> 
                <strong style={CellSize('250px')}>Author</strong> 
                <strong style={CellSize('150px')}>Date</strong>
                <strong style={CellSize('130px')}>Details</strong>
            </div>


            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {filteredProblems.map((iss , index) =>(
                    <li key={iss.id} style={rowStyle}>
                        <div style={CellSize('100px')}><strong>#{iss.public_number}</strong></div>
                        <div style={CellSize('400px')}>{iss.title}</div>
                        

                        <div style={CellSize('180px')}>
                            <select style={selectStyle}
                            value = {iss.status}  
                            onChange={(e) => upgrade_status(iss.id , e.target.value)}>
                                <option value = "New">New</option>
                                <option value = "Triaged">Triaged</option>
                                <option value = "In process" >In process</option>
                                <option value = "Resolved">Resolved</option>
                                <option value = "Rejected">Rejected</option>
                            </select>
                        </div> 

                        <div style={CellSize('150px')}>{iss.category}</div> 
                        <div style={CellSize('250px')}>{iss.profiles?.email }</div>
                        <div style={CellSize('150px')}>{new Date(iss.created_at).toLocaleString()}</div>
                        <div style={CellSize('130px')}>
                            <button style={selectStyle} onClick ={()=> navigate(`/issue/${iss.id}`)}>
                                Details
                            </button>
                        </div>

                    </li>
                ))}

            </ul>
            
            </div>
            
            
        
       </div> 
    )
}



