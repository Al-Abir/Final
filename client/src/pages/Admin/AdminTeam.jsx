import { Form, Input, Button, message, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Showloading, HideLoading, ReloadData } from '../../redux/rootSlice';
import axios from 'axios';
import { useState } from 'react';

const AdminTeam = () => {
    const { portfolioData } = useSelector((state) => state.root);
    const dispatch = useDispatch();

    const [showAddEditModal, setShowAddEditModal] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);

    // If portfolio data or team is not available, show loading
    if (!portfolioData || !portfolioData.team) {
        return <div>Loading...</div>;
    }

    const { team } = portfolioData;

    // Handle the Add/Edit Form submission
    const onFinish = async (values) => {
        try {
            dispatch(Showloading());

            const url = selectedItemForEdit
                ? `/api/v1/team-edit/${selectedItemForEdit._id}`
                : '/api/v1/team-add';

            const method = selectedItemForEdit ? 'put' : 'post';

            const response = await axios[method](url, values);

            dispatch(HideLoading());

            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModal(false);
                dispatch(ReloadData(true)); // Reload data to reflect changes
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    // Handle the Delete functionality
    const onDelete = async (id) => {
        try {
            dispatch(Showloading());
            const response = await axios.delete(`/api/v1/team-delete/${id}`);
            dispatch(HideLoading());

            if (response.data.success) {
                message.success(response.data.message);
                dispatch(ReloadData(true)); // Reload data to reflect changes
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    return (
        <section className="py-12 text-white">
            <div className="container mx-auto text-center">
                <div className="flex justify-end">
                    <button
                        className="bg-slate-500 px-5 py-2 text-white"
                        onClick={() => {
                            setSelectedItemForEdit(null);
                            setShowAddEditModal(true);
                        }}
                    >
                        Add Team Member
                    </button>
                </div>
                <h2 className="text-4xl font-bold mb-8">Meet Our Team</h2>

                <div className="grid px-5 md:grid-cols-3 gap-8">
                    {team.length > 0 ? (
                        team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 mx-auto rounded-full mb-4"
                                />
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                                <p className="text-gray-400">{member.role}</p>

                                <div className="flex justify-end gap-5 mt-3">
                                    <button
                                        className="bg-purple-400 text-white px-5 py-2"
                                        onClick={() => {
                                            setSelectedItemForEdit(member);
                                            setShowAddEditModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-700 text-white px-5 py-2"
                                        onClick={() => onDelete(member._id)} // Trigger delete
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No team members available.</p>
                    )}
                </div>

                {/* Modal for Add/Edit Team Member */}
                <Modal
                    open={showAddEditModal}
                    title={selectedItemForEdit ? 'Edit Team Member' : 'Add Team Member'}
                    footer={null}
                    onCancel={() => setShowAddEditModal(false)}
                >
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={selectedItemForEdit || { name: '', role: '', image: '' }}
                    >
                        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter name' }]}>
                            <Input placeholder="Enter name" />
                        </Form.Item>
                        <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please enter role' }]}>
                            <Input placeholder="Enter role" />
                        </Form.Item>
                        <Form.Item name="image" label="Image URL" rules={[{ required: true, message: 'Please enter image URL' }]}>
                            <Input placeholder="Enter image URL" />
                        </Form.Item>

                        <div className="flex justify-end gap-3">
                            <Button onClick={() => setShowAddEditModal(false)}>Cancel</Button>
                            <Button htmlType="submit" type="primary">
                                {selectedItemForEdit ? 'Update' : 'Add'}
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        </section>
    );
};

export default AdminTeam;
