export default function Login(){
    return (
        <div className="flex bg-base-200 justify-center items-center min-w-screen min-h-screen">
            <form className="fieldset bg-base-100 border-base-300 rounded-box w-xs border p-4">
                <label className="fieldset">
                    <span className="label">Username</span>
                    <input type="text" className="input validator" placeholder="Username" required />
                    <p className="validator-hint hidden">Required</p>
                </label>

                <label className="fieldset">
                    <span className="label">Password</span>
                    <input type="password" className="input validator" placeholder="Password" required />
                    <span className="validator-hint hidden">Required</span>
                </label>

                <button className="btn btn-neutral mt-4" type="submit">Login</button>
                <button className="btn btn-ghost mt-1" type="reset">Reset</button>
            </form>
        </div>
    );
}