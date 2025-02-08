import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, message, Form, Input, Button } from 'antd';
import axios from 'axios';
import { Showloading, HideLoading, ReloadData } from '../../redux/rootSlice';

const AdminBlog = () => {
    const { portfolioData } = useSelector((state) => state.root);
    const dispatch = useDispatch();

    const [showAddEditModel, setShowAddEditModel] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);

    // If portfolio data or blog is not available, show loading
    if (!portfolioData || !portfolioData.blog) {
        return <div>Loading...</div>;
    }

    const { blog } = portfolioData;

    // Handle Add/Edit Form submission
    const onFinish = async (values) => {
        try {
            dispatch(Showloading());

            const url = selectedItemForEdit
                ? `/api/v1/blog-edit/${selectedItemForEdit._id}`
                : '/api/v1/blog-add';

            const method = selectedItemForEdit ? 'put' : 'post';

            const response = await axios[method](url, values);

            dispatch(HideLoading());

            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModel(false);
                dispatch(ReloadData(true)); // Reload data to reflect changes
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    // Handle Delete functionality
    const onDelete = async (id) => {
        try {
            dispatch(Showloading());
            const response = await axios.delete(`/api/v1/blog-delete/${id}`);
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
        <div className="blog-section py-12 container mx-auto bg-black">
            <div className="container mx-auto px-4">
                <div className="flex justify-end">
                    <button
                        className="bg-slate-500 px-5 py-2 text-white"
                        onClick={() => {
                            setSelectedItemForEdit(null);
                            setShowAddEditModel(true);
                        }}
                    >
                        Add New Blog
                    </button>
                </div>

                <h2 className="text-3xl font-bold text-center text-white mb-8">Latest Blog Posts</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blog.length > 0 ? (
                        blog.map((post) => (
                            <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                                    <p className="text-gray-600 mb-4">{post.description}</p>
                                    <div className="flex justify-end gap-5 mt-3">
                                        <button
                                            className="bg-purple-400 text-white px-5 py-2"
                                            onClick={() => {
                                                setSelectedItemForEdit(post);
                                                setShowAddEditModel(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-700 text-white px-5 py-2"
                                            onClick={() => onDelete(post._id)} // Trigger delete
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-white">No blog posts available.</p>
                    )}
                </div>

                {/* Modal for Add/Edit Blog */}
                <Modal
                    visible={showAddEditModel}
                    title={selectedItemForEdit ? "Edit Blog" : "New Blog"}
                    footer={null}
                    onCancel={() => setShowAddEditModel(false)}
                >
                    <Form layout="vertical" onFinish={onFinish} initialValues={selectedItemForEdit || { title: '', description: '', image: '' }}>
                        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the title' }]}>
                            <Input placeholder="Enter title" />
                        </Form.Item>
                        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter description' }]}>
                            <Input.TextArea placeholder="Enter description" rows={4} />
                        </Form.Item>
                        <Form.Item name="image" label="Image URL" rules={[{ required: true, message: 'Please enter image URL' }]}>
                            <Input placeholder="Enter image URL" />
                        </Form.Item>
                        <div className="flex justify-end gap-3">
                            <Button onClick={() => setShowAddEditModel(false)}>Cancel</Button>
                            <Button htmlType="submit" type="primary">
                                {selectedItemForEdit ? 'Update' : 'Add'}
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default AdminBlog;
