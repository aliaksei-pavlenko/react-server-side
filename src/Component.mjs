import React from 'react';
import {createUseStyles} from 'react-jss';

const Component = () => {

    const style = createUseStyles({
        div:{
            backgroundColor: 'yellow'
        }
    },{name:Component.name})();

    return (
        <div className={style.div}>some text</div>
    )
}

export default Component;