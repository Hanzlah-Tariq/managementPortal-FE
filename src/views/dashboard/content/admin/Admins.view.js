import { Layout } from 'antd';
import React from 'react';

import ProtectedComponent from '../../../../components/ProtectedComponent';
import EmployeesView from './employees/Employees.container';
import EmployeeDetailsContainer from './employees/employeeDetails/EmployeeDetails.container';

const { Content } = Layout;

const Admins = () => {
  return (
    <Content id="admins" className="content-wrapper">
      <ProtectedComponent
        path="/dashboard/admin/employees"
        Component={EmployeesView}
      />
      <ProtectedComponent
        path="/dashboard/admin/employee/:id"
        Component={EmployeeDetailsContainer}
      />
    </Content>
  );
};

export default Admins;
