import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import SignUp from "./SignUp";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright ©"}
            fsoftwareengineer, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
class AppRouter extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Routes>
                            <Route path="/login" element={<Login />}>

                            </Route>
                            <Route path="/signup" element={<SignUp />}>

                            </Route>
                            <Route path="/" element={<App />}>

                            </Route>
                        </Routes>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Router>
            </div>
        );
    }
}

export default AppRouter;
/*
    지금까지는 index.js->ReactDom.render()에 바로 App 컴포넌트를 넘겼지만,
    이제는 경로에 따라 다른 컴포넌트를 표시하므로 그 정보를 가지고 있는 AppRouter를
    가장 먼저 렌더링하도록 설정한다.
*/ 