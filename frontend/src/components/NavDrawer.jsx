import * as React from "react";
import "boxicons";
import Drawer from "@mui/material/Drawer";

const NavDrawer = ({ navItems }) => {
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <div className="menuMobile">
            {["right"].map((anchor) => (
                <React.Fragment key={anchor}>
                    <button
                        className="menuMobileButton"
                        onClick={toggleDrawer(anchor, true)}
                    >
                        <box-icon
                            name="menu"
                            size="2rem"
                            color="rgb(131, 88, 141)"
                        />
                    </button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        PaperProps={{
                            style: {
                                width: "250px",
                                padding: "1rem",
                            },
                        }}
                    >
                        <div className="mobileNav">
                            {navItems.map((item) => {
                                return <a href={item.link}>{item.name}</a>;
                            })}
                            <button className="mobileSignupButton">
                                Sign Up
                            </button>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
};

export default NavDrawer;
