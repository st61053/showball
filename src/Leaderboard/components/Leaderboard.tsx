import { Box, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { GlobalState } from "../../global";
import { counter } from "../../players/actions";

const Leaderboard = () => {
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

export default Leaderboard;