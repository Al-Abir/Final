
import { Form, Input, Button } from 'antd'; 
import { useDispatch, useSelector } from 'react-redux';
import { Showloading, HideLoading } from '../../redux/rootSlice';
import axios from 'axios';
import { message } from 'antd';


const AdminAbout = () => {
    const { portfolioData } = useSelector((state) => state.root);
    const dispatch = useDispatch();

    if (!portfolioData || !portfolioData.about) {
        return <div>Loading...</div>; 
    }

    const onFinish = async (values) => {
        try {
            dispatch(Showloading());

            const response = await axios.post('/api/v1/update-about', {
                ...values,
                _id: portfolioData.about._id
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
            <Form 
                onFinish={onFinish} 
                layout="vertical" 
                initialValues={portfolioData.about}
            >
                <Form.Item name="title" label="Title">
                    <Input placeholder="Title" />
                </Form.Item>

                <Form.Item name="description" label="Description">
                    <Input.TextArea placeholder="Description" />
                </Form.Item>

                <div className="flex justify-end w-full">
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AdminAbout;
