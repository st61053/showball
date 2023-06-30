import { Box } from '@mui/material';
import Layout from './layout/components/Layout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { changeSelectedToken, loadTokens } from './tokens/actions';
import Router from './layout/components/Router';
import { GlobalState } from './global';
import { getResponse } from './settings/functions';
// import { CUSTOM_TOKENS } from './tokens/constants';

function App() {
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
  const TOKENS = useSelector((state: GlobalState) => state.tokens.tokens);
  const SEVER_PREFIX = useSelector((state: GlobalState) => state.settings.serverPrefix);

  useEffect(() => {

  const fetchTokens = async () => {
      const response = await fetch(`${SEVER_PREFIX}/api/v1/tokens`)
      const json = await response.json();

      if (response.ok) {
        dispatch(loadTokens(json.tokens))
      }
    };

    fetchTokens();



    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (TOKENS) {
      dispatch(changeSelectedToken(TOKENS[0]));
    }
    }, [TOKENS])

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
