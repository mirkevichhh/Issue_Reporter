import { useEffect, useState } from "react"
import { useParams , useNavigate } from "react-router-dom"
import { supabase } from "./supabase"


export default function DetailsIssue(){
    const [loading , setLoading] = useState(true)
    const [data, setData] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()

    const CellSize = (width,backgroundColor , color) => ({
        border: '2px solid #26354A',
        backgroundColor: backgroundColor,
        borderRadius: '4px',
        padding: '5px 8px', 
        width: width,
        wordBreak: 'break-all', 
        minWidth: 0,
        boxSizing: 'border-box', 
        wordWrap: 'break-word', 
        color:color,
        textAlign: 'left' 
    })
    useEffect(()=> {
        const getId = async()=>{
            const {data, error} = await supabase.from('issues').select('*, profiles(email)').eq('id',id).single()
            setData(data)
            setLoading(false)
        }
        getId()
        
    },[id]) 

    if(loading){
        return(
            <div>Loadiing...</div>
        )
    }
    if (data===null){
        return(
            <div>Issue not found</div>
        )
    }
    let textColorStatus = '#85B7EB'
    let BGcolorStatus ='#0C2A45'
    if (data.status==='New'){
    BGcolorStatus = '#0C2A45'
    textColorStatus = '#85B7EB'
    }
    if (data.status==='Triaged'){
    BGcolorStatus= '#3C3489'
    textColorStatus = '#AFA9EC'
    }
    if (data.status==='In process'){
    BGcolorStatus = '#412402'
    textColorStatus = '#FAC775'
    }
    if (data.status==='Resolved'){
    BGcolorStatus= '#173404'
    textColorStatus = '#97C459'
    }
    if (data.status==='Rejected'){
    BGcolorStatus = '#501313'
    textColorStatus = '#F09595'
    }



    return(
        <div style={{ margin:'0 auto' ,width:'95%'}}>
            <div  style ={{  display: 'flex', justifyContent: 'space-between' ,alignItems: 'flex-start', marginTop:'30px'}}>
                <p style={{textAlign: 'left',margin: 0, fontSize: '20px'}}>Issue #{data.public_number}      · {data.category} </p> 
                <h3 style={{...CellSize('15%',BGcolorStatus,textColorStatus),margin: 0,textAlign:'center'}}>{data.status}</h3>
            </div>
            <div style={{textAlign: 'left',wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                <h1 style={{ marginBottom: '8px',fontSize: '40px',lineHeight: '1.2'}}>{data.title}</h1>
            </div>
            <div style={{display: 'flex', justifyContent:'flex-start',marginTop: '15px',marginBottom:'15px'}}>
                <p style={{ marginBottom: '8px' , fontSize: '16px'}}>Date: {new Date(data.created_at).toLocaleString()}</p>
            </div>
            <div style={{...CellSize('100%','#171a21','white'),marginBottom:'15px'}}>
                <p style={{ marginBottom: '8px' ,color:'#5f6470', fontSize: '16px'}}>Description</p>
                <p style={{ marginBottom: '15px', marginTop: 0 , fontSize: '26px'}}>{data.description}</p>
            </div>
            <div style={CellSize('100%','#171a21','white')}>
                <p style={{ marginBottom: '8px',color:'#5f6470' , fontSize: '16px'}}>Author</p>
                <p style={{ marginBottom: '15px', marginTop: 0, fontSize: '22px' }}>{data?.profiles.email}</p>
            </div>
            <div style={{borderBottom: '1px solid #24272f', margin: '20px 0' }}></div>
            <div style={{justifyContent:'flex-start',display: 'flex', marginTop:'30px', marginBottom:'15px', fontSize: '20px'}}><p>Technical context</p></div>
            <div style ={{  display: 'flex', justifyContent: 'space-between' ,alignItems: 'flex-start'}}>
                <div style={{...CellSize('47%','#171a21','white')}}>
                    <p style={{ marginBottom: '8px',color:'#5f6470', fontSize: '16px' }}>Page URL</p>
                    <p style={{ marginBottom: '15px', marginTop: 0 , color:'#85b7eb'}}>{data.page_url}</p>
                </div>

                <div style={CellSize('47%','#171a21','white')}>
                    <p style={{ marginBottom: '8px',color:'#5f6470', fontSize: '16px' }}>App Version</p>
                    <p style={{ marginBottom: '15px', marginTop: 0 }}>{data.app_version}</p>
                </div>
                
            </div>

            <div style={{...CellSize('100%','#171a21','white'),marginTop:'15px'}}>
                <p style={{ marginBottom: '8px',color:'#5f6470' , fontSize: '16px'}}>Browser Information</p>
                <p style={{ marginBottom: '15px', marginTop: 0 }}>{data.browser_info}</p>
            </div>

            <div style={{...CellSize('100%','#171a21','white'),marginTop:'15px'}}>
                <p style={{ marginBottom: '8px' , color:'#5f6470', fontSize: '16px'}}>Correlation ID</p>
                <p style={{ marginBottom: '15px', marginTop: 0 ,color:'#5f6470'}}>{data.correlation_id}</p>
            </div>
            
           
           <button
            onClick = {() => navigate("/admin_lobby")}
            style = {{
                top:'20px',
                left: '20px',
                position: 'fixed',
                padding: '8px 16px',
                cursor: 'pointer',
                width: '125px'
            }}>
                Return
            </button>


        </div>
    )
    
}