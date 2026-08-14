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

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '500px',
                margin: '0 auto',
                padding: 'clamp(25px, 8vw, 50px) clamp(15px, 5vw, 30px)',
                boxSizing: 'border-box'}}>
            <h2
                style={{
                    textAlign: 'center',
                    fontSize: 'clamp(20px, 5vw, 26px)',
                    margin: '0 0 25px 0',}}>
                Authorization for coming in system
            </h2>

            <form
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    margin: '0 auto'}}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        marginBottom: '15px'}}>
                    <label style={{
                            width: '90px',
                            flexShrink: 0,
                            textAlign: 'right',
                            marginRight: '10px',}}>
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            flex: 1,
                            minWidth: 0,
                            boxSizing: 'border-box'}}/>
                </div>

                <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        marginBottom: '20px',
                    }}>
                    <label style={{
                            width: '90px',
                            flexShrink: 0,
                            textAlign: 'right',
                            marginRight: '10px',
                        }}>
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            flex: 1,
                            minWidth: 0,
                            boxSizing: 'border-box'}}/>
                </div>

                
                <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px',
                        width: '100%'}}>
                    <button
                        type="button"
                        onClick={signup}
                        disabled={loading}>
                        Sign Up
                    </button>

                    <button
                        type="button"
                        onClick={login}
                        disabled={loading}>
                        Log In
                    </button>
                </div>
            </form>

            {message && (
                <p style={{
                        textAlign: 'center',
                        color: 'blue',
                        marginTop: '20px',
                        overflowWrap: 'anywhere',}}>
                    {message}
                </p>
            )}
        </div>
    )
}