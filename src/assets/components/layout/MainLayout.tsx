import type { ReactNode } from 'react';
import type { Driver, ViewName } from '../../types';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainLayoutProps {
    children: ReactNode;
    activeView: ViewName;
    activeDriver: Driver | null;
    allDrivers: Driver[];
    onNavigate: (view: ViewName) => void;
}

const MainLayout = ({ children, activeView, activeDriver, allDrivers, onNavigate }: MainLayoutProps) => {
    return (
        <div className="app-root">
            <Sidebar activeView={activeView} onNavigate={onNavigate} />
            <div className="main-wrapper">
                <Header activeDriver={activeDriver} allDrivers={allDrivers} />
                <main className="main-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
