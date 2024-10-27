import React, { useState } from 'react'
import { Select, Space } from 'antd';
export default function AntSelect() {
    const [selectedLanguage, setSelectedLanguage] = useState('UZ');

    const handleChange = (value) => {
        setSelectedLanguage(value);
        console.log(`selected ${value}`);
    };
    return (
        <Space
            wrap>
            <Select
                defaultValue={selectedLanguage}
                className="custom-select"
                style={{
                    width: 60,
                    borderRadius: "20px"
                }}
                onChange={handleChange}
                options={[
                    {
                        value: 'UZ',
                        label: 'UZ',
                    },
                    {
                        value: 'RU',
                        label: 'RU',
                    },
                ]}
            />
        </Space>
    )
}
