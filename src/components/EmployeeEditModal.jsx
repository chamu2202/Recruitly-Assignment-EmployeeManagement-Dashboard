import React, { useState } from 'react';
import { Modal, Input, Select } from 'antd';

function EmployeeEditModal({ visible, employee, onSave, onCancel }) {
  const [form, setForm] = useState({ ...employee });

  return (
    <Modal
      visible={visible}
      title="Edit Employee"
      onOk={() => onSave(form)}
      onCancel={onCancel}
    >
      <Input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        style={{ marginBottom: 8 }}
      />
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

export default EmployeeEditModal;