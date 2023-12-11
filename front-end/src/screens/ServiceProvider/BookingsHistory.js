
import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import { AppointmentCard } from './Bookings';
import { SidebarContext } from '../Residents/SidebarContext';

const BookingHistory = () => {
  const [historyAppointments, setHistoryAppointments] = useState([]);

  const { menuCollapse } = useContext(SidebarContext);

  useEffect(() => {
    fetchHistoryAppointments();
  }, []);

  const fetchHistoryAppointments = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/complaints/appointments');
      const historyAppointments1 = response.data.filter((appointment) => appointment.status !== 'Pending');
      setHistoryAppointments(historyAppointments1);
    } catch (error) {
      console.error('Error fetching history appointments:', error);
    }
  };
  
  return (
    <div className={`${menuCollapse ? 'main-open' : 'main-collapsed'}` }style={{marginTop:"50px",color:"black",zIndex:"0"}}>
      {historyAppointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment}  />
      ))}
    </div>
  );
};

export default BookingHistory;
