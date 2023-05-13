import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from './global';
import { counter } from './players/actions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

function App() {

  const test = useSelector((state: GlobalState) => state.players.test);
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();

  return (
    <Box>
      <Button
        variant='contained'
        onClick={() => dispatch(counter())}
      >
        {test}
      </Button>
    </Box>
  );
}

export default App;
