import { useRouter } from "next/router";

import React, { Component } from "react"

const Post = () => {
    const router = useRouter()
    const { post } = router.query

    return <p>Post: {post} </p>
}

export default Post