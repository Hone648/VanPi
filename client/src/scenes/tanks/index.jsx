import { Box, Button, Typography } from '@mui/material';
import BarChart from '../../components/BarChart';
import Header from '../../components/Header';
import { useState } from 'react';

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
  const [automatic, setAutomatic] = useState(true);
  const styles = {
    container: {
      m: '10px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      mx: 5,
    },
    contentWrapper: {
      height: '79vh',
      width: isCollapsed ? '92vw' : '77vw',
    }

  };
  const AutoButton = () => {
    if (automatic) {
      return (
        <Button onClick={() => setAutomatic(!automatic)} variant='contained' color='secondary'>
          <Typography>Auto On</Typography>
        </Button>
      )
    } else {
      return (
        <Button onClick={() => setAutomatic(!automatic)} variant='filled' color='secondary'>
          <Typography>Auto Off</Typography>
        </Button>
      )
    }

  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Header title="Tanks" subtitle="Fresh Water & Waste Tanks" />
        <AutoButton />
      </Box>
      <Box sx={styles.contentWrapper}>
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
