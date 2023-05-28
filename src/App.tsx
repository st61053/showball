import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from './global';
import { counter } from './players/actions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Layout from './layout/components/Layout';

function App() {

  const test = useSelector((state: GlobalState) => state.players.test);
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();

  return (
    <Box
      sx={{
        height: "100%",
      }}>
      {/* <Button
        variant='contained'
        onClick={() => dispatch(counter())}
      >
        {test}
      </Button> */}
      <Layout />
    </Box>
  );
}

export default App;
