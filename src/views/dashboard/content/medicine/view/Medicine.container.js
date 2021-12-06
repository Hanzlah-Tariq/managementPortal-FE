import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Medicine from './Medicine.view';
import {
  fetchAllMedicines, addMedicine, deleteMedicine, updateMedicine,
} from './medicine.api';

const MedicineContainer = () => {
  const dispatch = useDispatch();

  const props = {
    medicines: useSelector((state) => state.getIn(['dashboard', 'medicine', 'medicines'])),
    statusUpdate: useSelector((state) => state.getIn(['dashboard', 'medicine', 'statusUpdate'])),
    deleteMedicine: (id) => dispatch(deleteMedicine(id)),
    fetchAllMedicines: () => dispatch(fetchAllMedicines()),
    addMedicine: (payload) => dispatch(addMedicine(payload)),
    updateMedicine: (id, payload) => dispatch(updateMedicine(id, payload)),
  };

  return <Medicine {...props} />;
};

export default MedicineContainer;
