"use client"

import { useEffect } from "react";

export default function ErrorPage({error, reset}: {error: Error &{digest? : string}; reset : ()=> void}) {
    useEffect(()=>{
        //* we can pass this error to a logger
        console.log(error);
    }, [error])
    return (
        <div>
            <h1>this is error page. please try ageayn </h1>
            <button onClick={()=> reset()}>Retry</button>
        </div>
    );
}
