import { Box } from '@mui/material';
import Header from '../../components/Header';

const styles = {
  container: {
    m: '10px',
  },
};

const Dashboard = () => {
  return (
    <Box sx={styles.container}>
      <Header title="Dashboard" subtitle="Welcome to your dashboard" />
    </Box>
  );
};

export default Dashboard;
