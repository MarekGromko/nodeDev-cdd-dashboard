import * as Icons  from 'react-icons/io5';
import { Link, useMatch } from 'react-router';

export default function Tabs() {
    const dataPage      = useMatch('/');
    const comparePage   = useMatch('/currency');
    const settingsPage  = useMatch('/settings');

    return (
        <div className="dock dock-xl justify-center bg-base-100">
            <Link to='/' className={dataPage ? "dock-active" : ""}>
                <Icons.IoEarthOutline size="1.5em"/>
                <span className="dock-label">Global</span>
            </Link>
            
            <Link to='/currency' className={comparePage ? "dock-active" : ""}>
                <Icons.IoAnalyticsOutline size="1.5em"/>
                <span className="dock-label">Currency</span>
            </Link>
            
            <Link to='/settings' className={settingsPage ? "dock-active" : ""}>
                <Icons.IoSettingsOutline size="1.5em"/>
                <span className="dock-label">Settings</span>
            </Link>
        </div>
    )
}