import { Card } from "@mui/material";
import { useEffect } from "react";

const ProfileImage = ({ img, width }: { img: string, width: number }) => {


    useEffect(() => {
        console.log(img);
    }, [])

    return (
        <Card sx={{
            width: width,
            height: width,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red"
        }}
        >
            {<img src={img} alt="kozel" width={"100%"} height={"100%"}></img>}
        </Card>
    );
}

export default ProfileImage;