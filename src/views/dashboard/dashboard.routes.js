import { USER_STATE } from '../../common/constants';
import { patientRoutes } from './content/user/patient.routes';
import { adminRoutes } from './content/admin/admin.routes';
import { medicineRoutes } from './content/medicine/medicine.routes';
import { feeRoutes } from './content/fee/fee.routes';

export const getSideBarRoutes = (userTypeId) => {
  let routes = [];

  if (userTypeId === USER_STATE.ADMIN_FULL || userTypeId === USER_STATE.ADMIN_PARTIAL) {
    routes = adminRoutes.concat(patientRoutes).concat(medicineRoutes).concat(feeRoutes);
  } else if (userTypeId === USER_STATE.EMPLOYEE) {
    routes = patientRoutes;
  }

  return routes;
};
