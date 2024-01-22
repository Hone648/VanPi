import { Box } from '@mui/material';
import BarChart from '../../components/BarChart';
import Header from '../../components/Header';
import Chip from '@mui/material/Chip';

const data = [
  {
    Battery: 'Lead Acid 1',
    Voltage: 12.4,
  },
  {
    Battery: 'Lead Acid 2',
    Voltage: 12.4,
  },
  {
    Battery: 'Lithium',
    Voltage: 13.8,
  },
];

const Batteries = ({ isCollapsed, alternator }) => {
  const alternatorStatus = true;
  const styles = {
    container: {
      m: '10px',
    },
    wrapper: {
      height: '79vh',
      width: isCollapsed ? '92vw' : '77vw',
    },
    headerWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    headerText: {
      flex: 1,
    },
    headerChips: {
      flex: 1,
      mt: '15px',
      mr: '10px',
      textAlign: 'end',
    },
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.headerWrapper}>
        <Box sx={styles.headerText}>
          <Header title="Batteries" subtitle="Charge Values and Status" />
        </Box>
        <Box sx={styles.headerChips}>
          {alternator ? (
            <Chip
              color="success"
              label={alternatorStatus ? 'Alternator ON' : 'Alternator OFF'}
              variant={alternatorStatus ? undefined : 'outlined'}
            />
          ) : undefined}
        </Box>
      </Box>
      <Box sx={styles.wrapper}>
        <BarChart
          data={data}
          keys={['Voltage']}
          indexBy="Battery"
          maxValue={16}
          colorScheme={{ scheme: 'dark2' }}
          format=" >-"
        />
      </Box>
    </Box>
  );
};
export default Batteries;
