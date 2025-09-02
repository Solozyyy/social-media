import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { GoMail } from 'react-icons/go'
import { FaRegBookmark } from 'react-icons/fa'
import { PiPaintBrushBold } from 'react-icons/pi'

const Sidebar = () => {
    return (
        <menu className="sidebar">
            <NavLink to="/" className={`sidebar__item ${({ isActive }) => isActive ? "active" : ""}`}>
                <i className='sidebar__icon'><AiOutlineHome /></i>
                <p>Home</p>
            </NavLink>
            <NavLink to="/messages" className={`sidebar__item ${({ isActive }) => isActive ? "active" : ""}`}>
                <i className='sidebar__icon'><GoMail /></i>
                <p>Messages</p>
            </NavLink>
            <NavLink to="/bookmarks" className={`sidebar__item ${({ isActive }) => isActive ? "active" : ""}`}>
                <i className='sidebar__icon'><FaRegBookmark /></i>
                <p>BookMarks</p>
            </NavLink>
            <a className={` sidebar__item ${({ isActive }) => isActive ? "active" : ""}`} >
                <i className='sidebar__icon'><PiPaintBrushBold /></i>
                <p>Themes</p>
            </a>
        </menu>
    )
}

export default Sidebar