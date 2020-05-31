import React, { FC, useState } from 'react';
import { Space, Input, Button } from 'antd';

import { ReactComponentEvent } from 'types';

interface IProps {
  onChange: (ppone: string) => void;
}

const AddPhone: FC<IProps> = ({ onChange }) => {
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (event: ReactComponentEvent) => {
    const { value } = event.target;
    setPhone(value);
  };

  const handleAdd = () => {
    onChange(phone);
    setPhone('');
  };
  
  return (
    <Space>
      <Input
        onChange={handlePhoneChange}
        value={phone}
      />

      <Button
        disabled={phone.length === 0}
        size="small"
        onClick={handleAdd}
      >
        Add
      </Button>
    </Space>
  );
};

export default AddPhone;
