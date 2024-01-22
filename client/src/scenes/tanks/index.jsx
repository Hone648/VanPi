import { Box } from '@mui/material';
import BarChart from '../../components/BarChart';
import Header from '../../components/Header';

const data = [
  {
    Tank: 'Fresh Water',
    '%': 0.92,
  },
  {
    Tank: 'Grey Water',
    '%': 0.47,
  },
  {
    Tank: 'Black Water',
    '%': 0.23,
  },
];

const Tanks = ({ isCollapsed }) => {
  const styles = {
    container: {
      m: '10px',
    },
    wrapper: {
      height: '79vh',
      width: isCollapsed ? '92vw' : '77vw',
    },
  };
  return (
    <Box sx={styles.container}>
      <Header title="Tanks" subtitle="Fresh Water & Waste Tanks" />
      <Box sx={styles.wrapper}>
        <BarChart
          data={data}
          keys={['%']}
          indexBy="Tank"
          maxValue={1}
          colorScheme={{ scheme: 'category10' }}
          format=">-.0%"
        />
      </Box>
    </Box>
  );
};
export default Tanks;
