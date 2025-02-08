import { Form, Input, Button } from 'antd'; 
import { useDispatch, useSelector } from 'react-redux';
import { Showloading, HideLoading } from '../../redux/rootSlice';
import axios from 'axios';
import { message } from 'antd';

const AdminIntro = () => {
    const { portfolioData } = useSelector((state) => state.root);
    const dispatch = useDispatch();

    if (!portfolioData || !portfolioData.intro) {
        return <div>Loading...</div>; // Loading state
    }

    const onFinish = async (values) => {
        try {
            dispatch(Showloading());

            const response = await axios.post('/api/v1/update-intro', {
                ...values,
                _id: portfolioData.intro._id
            });

            dispatch(HideLoading());

            if (response.data.success) {
                message.success(response.data.message); 
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    return (
        <div>
            <Form onFinish={onFinish} layout="vertical" initialValues={portfolioData.intro}>
                <Form.Item name="welcomeText" label="Welcome Text">
                    <Input className="input-field" placeholder="Intro" />
                </Form.Item>
                <Form.Item name="title" label="Title">
                    <Input className="input-field" placeholder="Title" />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea className="text-area" placeholder="Description" />
                </Form.Item>

                <div className="flex justify-end w-full">
                    <Button htmlType="submit" className="px-10 py-2 bg-blue-400">
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AdminIntro;
