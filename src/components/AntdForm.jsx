import React from 'react';
import { Input, Form, Button } from 'antd';

const { TextArea } = Input;

export default function AntdForm() {
    return (
        <div className="max-w-[600px] mx-auto">
            <Form layout="vertical" className='py-10 mx-5 flex flex-col items-start justify-between gap-5'>
                {/* <Form.Item className='w-full'>
                    <Input
                        style={{ fontSize: "18px" }}
                        required
                        placeholder="Ismingizni kiriting"
                        className="w-full"
                    />
                </Form.Item>
                <div className='flex flex-col gap-5 w-full md:flex-row'>
                    <Form.Item className="flex-1"> 
                        <Input
                            style={{ fontSize: "18px" }}
                            required
                            placeholder="Telefon nomeringiz"
                            className="w-full"
                        />
                    </Form.Item>
                    <Form.Item className="flex-1">
                        <Input
                            style={{ fontSize: "18px" }}
                            required
                            placeholder="Email manzilingiz"
                            className="w-full"
                        />
                    </Form.Item>
                </div> */}
                <Form.Item>
                    <Button
                        htmlType="submit"
                        className="w-full md:w-[180px] h-[60px] rounded-[20px] font-medium text-[16px] text-white bg-[#2189FF]"
                    >
                            <a href="https://t.me/Akmal_Bobomurodov">Buyurtma berish</a>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
