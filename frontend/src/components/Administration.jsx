import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import InvSummary from "./subcomponents/InvSummary";
// import InvPerContainer from "./subcomponents/InvPerContainer";
import AdminUserAccnts from "./subcomponents/AdminUserAccnts";
import AdminAddUser from "./subcomponents/AdminAddUser";
import AdminActHistory from "./subcomponents/AdminActHistory";

const Administration = () => {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="administrationContainer">
            <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="lab API tabs example"
                        >
                            <Tab label="User Accounts" value="1" />
                            <Tab label="Add New User" value="2" />
                            <Tab label="Activity History" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <AdminUserAccnts />
                    </TabPanel>
                    <TabPanel value="2">
                        <AdminAddUser />
                    </TabPanel>
                    <TabPanel value="3">
                        <AdminActHistory />
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    );
};

export default Administration;
