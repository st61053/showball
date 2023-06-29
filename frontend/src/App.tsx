import { Box } from '@mui/material';
import Layout from './layout/components/Layout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { changeSelectedToken, loadTokens } from './tokens/actions';
import Router from './layout/components/Router';
import { CUSTOM_TOKENS } from './tokens/constants';

function App() {
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();

  useEffect(() => {
    dispatch(loadTokens(CUSTOM_TOKENS));
    dispatch(changeSelectedToken(CUSTOM_TOKENS[0]));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      sx={{
        height: "100%",
      }}>
        <Layout >
          <Router />
        </Layout>
    </Box>
  );
}

export default App;
