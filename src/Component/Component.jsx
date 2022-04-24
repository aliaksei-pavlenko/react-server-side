import React from 'react';
import style from './style.css';
import { sheets } from '../main';

const Component = () => {

    sheets.storage.push(style['<style>'])

    return (
        <div className={style.redBg}>
            <div className={style.whiteColor}>white</div>
        </div>
    )
}

export default Component;