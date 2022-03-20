import React, { Component } from 'react'

import styles from '../../styles/components/loadingAnimation_1.module.css'

export default function LoadingAnimation () {
    return(
        <>
            <div className={styles.loader}>
                <div className={styles.outer}></div>
                <div className={styles.middle}></div>
                <div className={styles.inner}></div>
            </div>
            {/* <h2>Loading ...</h2> */}
        </>
    )
}