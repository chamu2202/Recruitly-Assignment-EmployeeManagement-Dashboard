import React, { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button, Modal } from 'antd';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function EmployeeTable({ employees, onEdit, onDelete }) {
  const gridRef = useRef();

  const columns = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Department', field: 'department', sortable: true, filter: true },
    { headerName: 'Role', field: 'role', sortable: true, filter: true },
    { headerName: 'Salary', field: 'salary', sortable: true, filter: true },
    { headerName: 'Status', field: 'status', sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRendererFramework: (params) => (
        <>
          <Button size="small" onClick={() => onEdit(params.data)}>Edit</Button>
          <Button danger size="small" onClick={() => {
            Modal.confirm({
              title: 'Delete Employee?',
              onOk: () => onDelete(params.data.id)
            });
          }}>Delete</Button>
        </>
      )
    }
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400 }}>
      <AgGridReact
        ref={gridRef}
        rowData={employees}
        columnDefs={columns}
        rowSelection="multiple"
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}

export default EmployeeTable;