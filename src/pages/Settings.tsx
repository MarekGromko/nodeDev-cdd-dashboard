import { logout } from "../helpers/helpers"


export default function Settings() {
    return (
        <div className="flex p-2 w-full bg-base-100 rounded-lg mt-16 items-center justify-end">
            <button className="btn" onClick={logout}>Logout</button>
        </div>
    );
}