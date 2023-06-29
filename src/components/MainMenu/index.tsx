import React from 'react';
import {ContainerOutlined, DesktopOutlined, MailOutlined, MenuOutlined, PieChartOutlined,} from '@ant-design/icons';
import {Button, Dropdown, Menu, MenuProps} from 'antd';
import styles from "./index.module.css";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Menu 1', '1', <DesktopOutlined/>),
    getItem('WorksDOI', 'WorksDOI', <PieChartOutlined/>),
    getItem('Menu 3', '3', <ContainerOutlined/>),

    getItem('Navigation One', 'sub1', <MailOutlined/>, [
        getItem('Menu 4', '4'),
        getItem('Menu 5', '5'),
        getItem('Menu 6', '6'),
    ]),
];


/**
 * 主菜单组件
 * @param props.activeKey 当前应当处理选中态的key
 * @constructor Graig
 */
export function MainMenu(props: {
    activeKey?: string
}) {
    return (
        <div>
            <div className={styles.menuFloat}>
                <Dropdown menu={{ items, defaultSelectedKeys: [props.activeKey || "1"] }} placement="bottom">
                    <Button><MenuOutlined/></Button>
                </Dropdown>
            </div>
            <div className={styles.menuLeft}>
                <Menu
                    defaultSelectedKeys={[props.activeKey || "1"]}
                    mode="inline"
                    items={items}
                />
            </div>
        </div>
    );
}
