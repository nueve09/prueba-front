import {SideBarItem} from "./SideBarItem.jsx";

// eslint-disable-next-line react/prop-types
export function SideBar({sideBarItems = []}) {
    return (
            <>
                <div className='sidebar'>
                    <div className='profile'>
                        <div className="row">
                            <div className="col s6 offset-s3">
                                <img
                                    src="https://play-lh.googleusercontent.com/QRCRv6fDxgSKQqBwVgCS5hy_dP_ne3sU2P4EzFUQh_E8vrXvCmZ2YF6ImBMdDcmxXQ=w240-h480-rw"
                                    alt="profile_picture"/>
                            </div>
                            <div className="col s3">
                                <span className='icon toggle'><i className="fa fa-chevron-circle-right"></i></span>
                            </div>
                        </div>
                    </div>
                    <ul>
                        {
                            sideBarItems.map(({icon}, i) => (
                                <SideBarItem key={i} icon={icon}/>
                            ))
                        }
                    </ul>
                </div>
            </>
    )
}