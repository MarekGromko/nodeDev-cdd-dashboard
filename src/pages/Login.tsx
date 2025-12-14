import { useState } from "react";
import { login } from "../api";
import type { AxiosError } from "axios";

interface LoginRes {
    state: 'idle' | 'loading' | 'error' | 'success'; 
    message?: string;
    token?: string;
}

export default function Login(){
    const [loginReq, setLoginReq] = useState<{email: string, password: string}>({email: '', password: ''});
    const [loginRes, setLoginRes] = useState<LoginRes>({state: 'idle'});

    const onSubmit = () => {
        if(loginRes.state !== 'error' && loginRes.state !== 'idle') 
            return;
        setLoginRes({state: 'loading'});
        login(loginReq.email, loginReq.password)
        .then(res=>{
            setLoginRes({state: 'success', token: res.token});
        })
        .catch((err: AxiosError)=>{
            setLoginRes({state: 'error', message: err.message + JSON.stringify(err.response?.data || {})});
        })
    }

    if(loginRes.state === 'success'){
        localStorage.setItem('token', loginRes.token!);
        window.location.href = '/';
    }

    return (
        <div className="flex bg-base-200 justify-center items-center min-w-screen min-h-screen">
            <form 
                className="fieldset bg-base-100 border-base-300 rounded-box w-xs border p-4"
                onSubmit={e=>{e.preventDefault(); onSubmit();}}>
                <label className="fieldset">
                    <span className="label">Email</span>
                    <input 
                        type="text"
                        className="input validator" 
                        placeholder="Email" 
                        required  
                        onChange={e=>setLoginReq({...loginReq, email: e.target.value})}
                        />
                    <p className="validator-hint hidden">Required</p>
                </label>

                <label className="fieldset">
                    <span className="label">Password</span>
                    <input 
                        type="password" 
                        className="input validator" 
                        placeholder="Password" 
                        required 
                        onChange={e=>setLoginReq({...loginReq, password: e.target.value})}
                        />
                    <span className="validator-hint hidden">Required</span>
                </label>

                <button className="btn btn-neutral mt-4" type="submit">Login</button>
                <button className="btn btn-ghost mt-1" type="reset">Reset</button>
                {loginRes.state === 'error' && 
                    <p className="text-error mt-2">Error: {loginRes.message}</p>
                }
            </form>
        </div>
    );
}