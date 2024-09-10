import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InvSummary from "./subcomponents/InvSummary";
import InvPerContainer from "./subcomponents/InvPerContainer";

const MyInventory = () => {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="myInventoryContainer">
            <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="lab API tabs example"
                        >
                            <Tab label="Inventory Summary" value="1" />
                            <Tab label="Inventory Per Container" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <InvSummary />
                    </TabPanel>
                    <TabPanel value="2">
                        <InvPerContainer />
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    );
};

export default MyInventory;
