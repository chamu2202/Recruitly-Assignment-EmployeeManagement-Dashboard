import React, { useState, useMemo } from 'react';

function App() {
  const [employees, setEmployees] = useState([]);
  
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    role: '',
    salary: '',
    status: 'Active'
  });
  
  // Filter state
  const [filters, setFilters] = useState({
    name: '',
    department: '',
    activeOnly: false
  });

  // Handle form submit (add new or edit existing)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.department || !formData.role || !formData.salary) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingEmployee) {
      // Update existing employee
      setEmployees(prev =>
        prev.map(emp =>
          emp.id === editingEmployee.id ? { ...emp, ...formData, salary: Number(formData.salary) } : emp
        )
      );
      alert('Employee updated successfully!');
      setEditingEmployee(null);
    } else {
      // Add new employee with unique ID
      const newEmployee = {
        id: employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1,
        ...formData,
        salary: Number(formData.salary)
      };
      setEmployees(prev => [...prev, newEmployee]);
      alert('Employee added successfully!');
    }
    
    // Reset form
    setFormData({
      name: '',
      department: '',
      role: '',
      salary: '',
      status: 'Active'
    });
    setIsModalVisible(false);
  };

  // When clicking Edit
  const onEdit = (record) => {
    setEditingEmployee(record);
    setFormData({
      name: record.name,
      department: record.department,
      role: record.role,
      salary: record.salary.toString(),
      status: record.status
    });
    setIsModalVisible(true);
  };

  // When clicking Delete
  const onDelete = (id) => {
    setShowDeleteConfirm(id);
  };

  // Confirm delete
  const confirmDelete = () => {
    setEmployees(prev => prev.filter(emp => emp.id !== showDeleteConfirm));
    setShowDeleteConfirm(null);
    alert('Employee deleted successfully!');
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingEmployee(null);
    setFormData({
      name: '',
      department: '',
      role: '',
      salary: '',
      status: 'Active'
    });
  };

  // Handle add new employee
  const handleAddNew = () => {
    setEditingEmployee(null);
    setFormData({
      name: '',
      department: '',
      role: '',
      salary: '',
      status: 'Active'
    });
    setIsModalVisible(true);
  };

  // Filter employees based on current filters
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesName = employee.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesDepartment = !filters.department || employee.department === filters.department;
      const matchesStatus = !filters.activeOnly || employee.status === 'Active';
      
      return matchesName && matchesDepartment && matchesStatus;
    });
  }, [employees, filters]);

  const styles = {
    container: {
      padding: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      padding: '16px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px'
    },
    title: {
      margin: 0,
      color: '#333'
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#1890ff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    buttonDanger: {
      backgroundColor: '#ff4d4f'
    },
    buttonSmall: {
      padding: '6px 12px',
      fontSize: '12px',
      marginRight: '8px'
    },
    filtersCard: {
      backgroundColor: '#fff',
      border: '1px solid #d9d9d9',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px'
    },
    filtersTitle: {
      margin: '0 0 16px 0',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    filtersRow: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap'
    },
    filterItem: {
      flex: '1',
      minWidth: '200px'
    },
    input: {
      padding: '8px 12px',
      border: '1px solid #d9d9d9',
      borderRadius: '4px',
      fontSize: '14px',
      width: '100%'
    },
    select: {
      padding: '8px 12px',
      border: '1px solid #d9d9d9',
      borderRadius: '4px',
      fontSize: '14px',
      width: '100%',
      backgroundColor: 'white'
    },
    switchContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    switch: {
      position: 'relative',
      width: '44px',
      height: '22px'
    },
    switchInput: {
      opacity: 0,
      width: 0,
      height: 0
    },
    switchSlider: {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#ccc',
      transition: '.4s',
      borderRadius: '22px'
    },
    switchSliderActive: {
      backgroundColor: '#1890ff'
    },
    switchSliderBefore: {
      position: 'absolute',
      content: '""',
      height: '18px',
      width: '18px',
      left: '2px',
      bottom: '2px',
      backgroundColor: 'white',
      transition: '.4s',
      borderRadius: '50%'
    },
    switchSliderBeforeActive: {
      transform: 'translateX(22px)'
    },
    tableCard: {
      backgroundColor: '#fff',
      border: '1px solid #d9d9d9',
      borderRadius: '8px',
      padding: '16px'
    },
    tableTitle: {
      margin: '0 0 16px 0',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '14px'
    },
    tableHeader: {
      backgroundColor: '#fafafa',
      padding: '12px',
      textAlign: 'left',
      borderBottom: '1px solid #d9d9d9',
      fontWeight: 'bold'
    },
    tableCell: {
      padding: '12px',
      borderBottom: '1px solid #f0f0f0'
    },
    tableRow: {
      cursor: 'pointer'
    },
    tableRowHover: {
      backgroundColor: '#f5f5f5'
    },
    statusActive: {
      color: '#52c41a',
      fontWeight: 'bold'
    },
    statusInactive: {
      color: '#ff4d4f',
      fontWeight: 'bold'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '8px',
      width: '500px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      overflow: 'auto'
    },
    modalHeader: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '16px'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      marginBottom: '4px',
      fontWeight: 'bold'
    },
    modalFooter: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '8px',
      marginTop: '16px'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginTop: '16px'
    },
    paginationButton: {
      padding: '4px 8px',
      border: '1px solid #d9d9d9',
      backgroundColor: 'white',
      cursor: 'pointer',
      borderRadius: '4px'
    },
    paginationButtonActive: {
      backgroundColor: '#1890ff',
      color: 'white',
      border: '1px solid #1890ff'
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(filteredEmployees.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Employee Management System</h1>
        <button style={styles.button} onClick={handleAddNew}>
          + Add Employee
        </button>
      </div>
      
      <div style={styles.filtersCard}>
        <h3 style={styles.filtersTitle}>Filters</h3>
        <div style={styles.filtersRow}>
          <div style={styles.filterItem}>
            <input
              style={styles.input}
              placeholder="Search by name"
              value={filters.name}
              onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div style={styles.filterItem}>
            <select
              style={styles.select}
              value={filters.department}
              onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
            >
              <option value="">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <div style={styles.switchContainer}>
            <span>Active Only:</span>
            <label style={styles.switch}>
              <input
                type="checkbox"
                style={styles.switchInput}
                checked={filters.activeOnly}
                onChange={(e) => setFilters(prev => ({ ...prev, activeOnly: e.target.checked }))}
              />
              <span 
                style={{
                  ...styles.switchSlider,
                  ...(filters.activeOnly ? styles.switchSliderActive : {})
                }}
              >
                <span 
                  style={{
                    ...styles.switchSliderBefore,
                    ...(filters.activeOnly ? styles.switchSliderBeforeActive : {})
                  }}
                />
              </span>
            </label>
          </div>
        </div>
      </div>

      <div style={styles.tableCard}>
        <h3 style={styles.tableTitle}>
          Employee List ({filteredEmployees.length} employees)
        </h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Department</th>
              <th style={styles.tableHeader}>Role</th>
              <th style={styles.tableHeader}>Salary</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map(employee => (
              <tr key={employee.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{employee.id}</td>
                <td style={styles.tableCell}><strong>{employee.name}</strong></td>
                <td style={styles.tableCell}>{employee.department}</td>
                <td style={styles.tableCell}>{employee.role}</td>
                <td style={styles.tableCell}>${employee.salary.toLocaleString()}</td>
                <td style={styles.tableCell}>
                  <span style={employee.status === 'Active' ? styles.statusActive : styles.statusInactive}>
                    {employee.status}
                  </span>
                </td>
                <td style={styles.tableCell}>
                  <button 
                    style={{...styles.button, ...styles.buttonSmall}}
                    onClick={() => onEdit(employee)}
                  >
                    Edit
                  </button>
                  <button 
                    style={{...styles.button, ...styles.buttonSmall, ...styles.buttonDanger}}
                    onClick={() => onDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {totalPages > 1 && (
          <div style={styles.pagination}>
            <button
              style={styles.paginationButton}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                style={{
                  ...styles.paginationButton,
                  ...(currentPage === page ? styles.paginationButtonActive : {})
                }}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              style={styles.paginationButton}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalVisible && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalHeader}>
              {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Department *</label>
                <select
                  style={styles.select}
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  required
                >
                  <option value="">Select department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="HR">HR</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Role/Position *</label>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Enter role or position"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  required
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Annual Salary *</label>
                <input
                  style={styles.input}
                  type="number"
                  placeholder="Enter annual salary"
                  value={formData.salary}
                  onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                  required
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Employment Status *</label>
                <select
                  style={styles.select}
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div style={styles.modalFooter}>
                <button type="button" style={styles.button} onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" style={styles.button}>
                  {editingEmployee ? 'Update Employee' : 'Add Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalHeader}>Delete Employee</h2>
            <p>Are you sure you want to delete this employee? This action cannot be undone.</p>
            <div style={styles.modalFooter}>
              <button style={styles.button} onClick={() => setShowDeleteConfirm(null)}>
                Cancel
              </button>
              <button style={{...styles.button, ...styles.buttonDanger}} onClick={confirmDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
