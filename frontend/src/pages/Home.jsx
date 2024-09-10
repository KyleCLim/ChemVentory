// import React from "react";
// import LoginForm from "../components/LoginForm";

// const Home = () => {
//     return (
//         <div className="homeContainer">
//             <div className="homeContent">
//                 <div className="text">
//                     <h1 className="homeSlogan">
//                         Making your lab management simple and easy.
//                     </h1>
//                     <p className="homeDescription">
//                         ChemVentory helps you organize your laboratory's
//                         chemical inventory, cutting the time spent by your group
//                         members searching for compounds, summarize your records,
//                         and letting them get on with their work.
//                     </p>
//                     <p className="homeDescription">
//                         An institutional tool catered for large organizations
//                         with multiple laboratory facilities to organize their
//                         chemical laboratory registries and inventory.
//                     </p>
//                 </div>
//                 <div className="loginBox">
//                     <LoginForm />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;

import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import { Snackbar, Alert } from "@mui/material";

const Home = () => {
    // Snackbar state management
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <div className="homeContainer">
            <div className="homeContent">
                <div className="text">
                    <h1 className="homeSlogan">
                        Making your lab management simple and easy.
                    </h1>
                    <p className="homeDescription">
                        ChemVentory helps you organize your laboratory's
                        chemical inventory, cutting the time spent by your group
                        members searching for compounds, summarize your records,
                        and letting them get on with their work.
                    </p>
                    <p className="homeDescription">
                        An institutional tool catered for large organizations
                        with multiple laboratory facilities to organize their
                        chemical laboratory registries and inventory.
                    </p>
                </div>
                <div className="loginBox">
                    <LoginForm setOpenSnackbar={setOpenSnackbar} />
                </div>
            </div>

            {/* Snackbar component at the home level */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }} // Bottom-left corner
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Logged in successfully!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Home;
