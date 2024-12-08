import React from 'react'
import { Select, Space } from 'antd';
import { useLanguage } from '../context/LanguageContext';

export default function AntSelect() {
    const { currentLanguage, changeLanguage } = useLanguage();

    const handleChange = (value) => {
        changeLanguage(value.toLowerCase());
    };

    return (
        <Space wrap>
            <Select
                defaultValue={currentLanguage.toUpperCase()}
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
