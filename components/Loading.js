import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';


function Loading() {

    return (
        <center style={{display: "grid", placeItems: "center", height: '100vh'}}>
            <div>
                <CircularProgress />
            </div>
        </center>
    )
}

export default Loading;
