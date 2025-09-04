import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uiSliceActions } from '../store/ui-slice'


const ThemeModal = () => {

    const dispatch = useDispatch()

    const theme = useSelector(state => state?.ui?.theme)

    const closeThemeModal = e => {
        if (e.target.classList.contains("theme")) {
            dispatch(uiSliceActions.closeThemeModal())
        }
    }

    const ChangeBackgroundColor = (color) => {
        dispatch(uiSliceActions.changeTheme({ ...theme, backgroundColor: color }))
        localStorage.setItem("theme", JSON.stringify({ ...theme, backgroundColor: color }))
    }

    const ChangePrimaryColor = (color) => {
        dispatch(uiSliceActions.changeTheme({ ...theme, primaryColor: color }))
        localStorage.setItem("theme", JSON.stringify({ ...theme, primaryColor: color }))
    }

    return (
        <section className='theme' onClick={e => closeThemeModal(e)}>
            <div className="theme__container">
                <artical className="theme__primary">
                    <h3>Primary colors</h3>
                    <ul>
                        <li onClick={() => ChangePrimaryColor("red")}></li>
                        <li onClick={() => ChangePrimaryColor("blue")}></li>
                        <li onClick={() => ChangePrimaryColor("yellow")}></li>
                        <li onClick={() => ChangePrimaryColor("green")}></li>
                        <li onClick={() => ChangePrimaryColor("purple")}></li>
                    </ul>

                </artical>
                <artical className="theme__background">
                    <h3>Backgound colors</h3>
                    <ul>
                        <li onClick={() => ChangeBackgroundColor("")}></li>
                        <li onClick={() => ChangeBackgroundColor("dark")}></li>
                    </ul>

                </artical>
            </div>
        </section>
    )
}

export default ThemeModal