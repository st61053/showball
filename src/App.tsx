import { Box } from '@mui/material';
import Layout from './layout/components/Layout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { changeSelectedToken } from './tokens/actions';
import { TOKENS } from './tokens/constants';

function App() {
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();

  useEffect(() => {
    dispatch(changeSelectedToken(TOKENS[0]))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      sx={{
        height: "100%",
      }}>
      <Layout />
    </Box>
  );
}

export default App;
