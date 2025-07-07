import React, { useState } from 'react';
import { Input, Select, Switch } from 'antd';

function EmployeeFilter({ onFilterChange }) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [activeOnly, setActiveOnly] = useState(false);

  const handleChange = () => {
    onFilterChange({
      name,
      department,
      status: activeOnly ? 'Active' : ''
    });
  };

  return (
    <div style={{ marginBottom: 16, display: 'flex', gap: '1rem' }}>
      <Input placeholder="Search by name" value={name} onChange={e => { setName(e.target.value); handleChange(); }} />
      <Select
        placeholder="Filter by department"
        value={department}
        onChange={value => { setDepartment(value); handleChange(); }}
        allowClear
        style={{ width: 200 }}
      >
        <Select.Option value="Engineering">Engineering</Select.Option>
        <Select.Option value="HR">HR</Select.Option>
        <Select.Option value="Marketing">Marketing</Select.Option>
      </Select>
      <span>
        Active Only: <Switch checked={activeOnly} onChange={checked => { setActiveOnly(checked); handleChange(); }} />
      </span>
    </div>
  );
}

export default EmployeeFilter;