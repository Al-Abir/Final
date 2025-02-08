import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, Button } from 'antd';
import axios from "axios";

const AdminService = () => {
    const { portfolioData } = useSelector((state) => state.root);
    if (!portfolioData || !portfolioData.service) {
        return <div>loading.........</div>
    }
    const { service } = portfolioData;

    const [showAddEditModel, setShowAddEditModel] = useState(false);
    const [seletedItemforEidt, setSeletedItemforEidt] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', image: '' });

    const handleAddEditService = async () => {
        try {
            if (seletedItemforEidt) {
                // Update existing service
                await axios.put(`/api/v1/service-edit/${seletedItemforEidt._id}`, formData);
                alert("Service updated successfully");
            } else {
                // Add new service
                await axios.post("/api/v1/service-add", formData);
                alert("Service added successfully");
            }
            setShowAddEditModel(false);
        } catch (error) {
            alert("Error occurred: " + error.message);
        }
    };

    const handleDeleteService = async (id) => {
        try {
            await axios.delete(`/api/v1/service-delete/${id}`);
            alert("Service deleted successfully");
        } catch (error) {
            alert("Error occurred: " + error.message);
        }
    };

    return (
        <div className="service-section py-12 container mx-auto bg-black">
            <div className="container mx-auto px-4">
                <div className="flex justify-end">
                    <button
                        className="bg-slate-500 px-5 py-2 text-white"
                        onClick={() => {
                            setSeletedItemforEidt(null);
                            setFormData({ title: '', description: '', image: '' });
                            setShowAddEditModel(true);
                        }}
                    >
                        Add New Service
                    </button>
                </div>
                <h2 className="text-3xl font-bold text-center text-white mb-8">Latest Service</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {service.map((post) => (
                        <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-48 h-48 p-5 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                                <p className="text-gray-600 mb-4">{post.description}</p>
                                <div className="flex justify-end gap-5 mt-3">
                                    <button
                                        className="bg-purple-400 text-white px-5 py-2"
                                        onClick={() => {
                                            setSeletedItemforEidt(post);
                                            setFormData({ title: post.title, description: post.description, image: post.image });
                                            setShowAddEditModel(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-700 text-white px-5 py-2"
                                        onClick={() => handleDeleteService(post._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Modal
                    visible={showAddEditModel}
                    title={seletedItemforEidt ? "Edit Service" : "New Service"}
                    footer={null}
                    onCancel={() => setShowAddEditModel(false)}
                >
                    <Form layout="vertical">
                        <Form.Item label="Title">
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item label="Description">
                            <Input.TextArea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item label="Image URL">
                            <Input
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            />
                        </Form.Item>

                        <div className="flex justify-end">
                            <Button onClick={() => setShowAddEditModel(false)}>Cancel</Button>
                            <Button type="primary" onClick={handleAddEditService}>
                                {seletedItemforEidt ? "Update" : "Add"}
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default AdminService;
