import { Outlet } from 'react-router';
import Tabs from './components/Tabs';

export default function App() {
    return (
        <div className='bg-base-200 w-screen h-screen'>
            <div className='max-w-2xl mx-auto'>
                <Outlet/>
            </div>
            <Tabs/>
        </div>
    )
}