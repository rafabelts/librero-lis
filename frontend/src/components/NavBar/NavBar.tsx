import { NavItemType } from '../../types';
import { useMediaQuery } from '../../hooks/useMediaQuery';

import styles from './NavBar.module.css';
import { getOrderedNavItems } from '../../utils/getOrderedNavItems';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({
    text,
    path,
    icon,
    className = styles.navButtons,
}: NavItemType) => {
    const inPhone = useMediaQuery('(max-width: 1200px)');
    return (
        <Link to={path} className={className}>
            <p>{inPhone ? icon : text}</p>
        </Link>
    );
};

export const NavBar = ({ title }: { title: string }) => {
    const inPhone = useMediaQuery('(max-width: 1200px)');
    const path = useLocation().pathname;

    const orderedNavItems = getOrderedNavItems(inPhone, path);

    return (
        <div>
            <div className={styles.navBarDiv}>
                <h1>{title}</h1>
                <div className={styles.routesDiv}>
                    {orderedNavItems.map((item: NavItemType, index) => (
                        <NavItem {...item} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};
