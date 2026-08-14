import React, { useState } from 'react'
import { supabase } from './supabase'

export default function Auth(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading , setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const signup = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signUp({email, password})
        if (error) {
            setMessage(error.message)
        }else{
            setMessage("Check your email for the login link!")
        }
        setLoading(false)
    }

    const login = async (e: React.FormEvent) =>{
        e.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({email, password})
        if (error) {
            setMessage(error.message)
        }else{
            setMessage("Logged in successfully!")
        }
        setLoading(false)
    }

    return(
        <div style = {{padding : '50px' , maxWidth: '400px', margin: '0 auto'}}>
            <h2>Authorization for coming in system</h2>
            <form>
                <div 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '10px' 
                    }}>
                    <label style={{ width: '90px' }}>Email</label>
                    <input type = "email" value = {email} onChange={(e) => setEmail(e.target.value)} /> 
                </div>
                <div 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginTop: '10px' 
                    }}>
                    <label style={{ width: '90px' }}>Password</label>
                    <input type = "password" value = {password} onChange={(e) => setPassword(e.target.value)} /> 
                </div>
                <div 
                style = {{
                    marginTop: '20px', 
                    display: 'flex', 
                    gap: '10px', 
                    marginLeft: '90px',
                    width: '170px'
                    }}>
                    <button style={{ flex: 1 }} onClick = {signup} disabled = {loading}>Sign Up</button>
                    <button style={{ flex: 1 }} onClick = {login} disabled = {loading}>Log In</button>
                </div>
            </form>
            {message && <p style={{ color: 'blue', marginTop: '20px' }}>{message}</p>}
        </div>
    )
}