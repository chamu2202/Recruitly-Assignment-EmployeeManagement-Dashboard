import React, { useState } from 'react';
import { Modal, Input, Select } from 'antd';

function AddEmployeeModal({ visible, onAdd, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    department: '',
    role: '',
    salary: 0,
    status: 'Active'
  });

  return (
    <Modal
      visible={visible}
      title="Add New Employee"
      onOk={() => onAdd(form)}
      onCancel={onCancel}
    >
      <Input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        style={{ marginBottom: 8 }}
      />
      <Select
        placeholder="Department"
        value={form.department}
        onChange={value => setForm({ ...form, department: value })}
        style={{ width: '100%', marginBottom: 8 }}
      >
        <Select.Option value="Engineering">Engineering</Select.Option>
        <Select.Option value="HR">HR</Select.Option>
        <Select.Option value="Marketing">Marketing</Select.Option>
      </Select>
      <Input
        placeholder="Role"
        value={form.role}
        onChange={e => setForm({ ...form, role: e.target.value })}
        style={{ marginBottom: 8 }}
      />
      <Input
        placeholder="Salary"
        type="number"
        value={form.salary}
        onChange={e => setForm({ ...form, salary: Number(e.target.value) })}
        style={{ marginBottom: 8 }}
      />
      <Select
        value={form.status}
        onChange={value => setForm({ ...form, status: value })}
        style={{ width: '100%' }}
      >
        <Select.Option value="Active">Active</Select.Option>
        <Select.Option value="Inactive">Inactive</Select.Option>
      </Select>
    </Modal>
  );
}

export default AddEmployeeModal;