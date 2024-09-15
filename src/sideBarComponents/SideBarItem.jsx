// eslint-disable-next-line react/prop-types
export function SideBarItem({children, stateClass = '', icon = 'fas fa-home'}) {
    return (
        <>
            <li>
                <a href="#" className={stateClass}>
                    <span className="icon"><i className={icon}></i></span>
                    <span className="item">{children}</span>
                </a>
            </li>
        </>
    )

}