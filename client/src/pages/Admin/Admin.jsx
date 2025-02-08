import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import AdminHeader from "./AdminHeader";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import AdminBlog from "./AdminBlog";
import AdminTeam from "./AdminTeam";
import AdminService from "./AdminService";

const { TabPane } = Tabs;

const Admin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn !== "true") {
            navigate("/login"); // Redirect to login page if not logged in
        }
    }, [navigate]);

    return (
        <div className="container mx-auto">
            <AdminHeader />
            <div className="mt-5 p-5">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Intro" key="1">
                        <AdminIntro />
                    </TabPane>
                    <TabPane tab="About" key="2">
                        <AdminAbout />
                    </TabPane>
                    <TabPane tab="Blog" key="3">
                        <AdminBlog />
                    </TabPane>
                    <TabPane tab="Team" key="4">
                        <AdminTeam />
                    </TabPane>
                    <TabPane tab="Service" key="5">
                        <AdminService />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default Admin;
