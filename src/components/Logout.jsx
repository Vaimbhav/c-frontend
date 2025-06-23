// import { useDispatch, useSelector } from "react-redux";
// import { selectLoggedInUser, signOutAsync } from "../features/auth/AuthSlice";
// import { useEffect } from "react";


// function Logout() {
//     const dispatch = useDispatch();
//     const user = useSelector(selectLoggedInUser);

//     // console.log('user log- -', user);
//     // console.log('userChecked- ', userChecked);

//     useEffect(() => {
//         // console.log('here');
//         dispatch(signOutAsync());
//     }, [dispatch]);

//     // but useEffect runs after render, so we have to delay navigate part
//     return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
// }

// export default Logout;



import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutAsync } from "../features/auth/AuthSlice";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function Logout() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    const [signedOut, setSignedOut] = useState(false);

    useEffect(() => {
        dispatch(signOutAsync()).then(() => {
            setSignedOut(true);
        });
    }, [dispatch]);

    if (!user && signedOut) {
        return <Navigate to="/login" replace />;
    }

    return <p className="text-center p-6 text-lg">Logging out...</p>;
}

export default Logout;
