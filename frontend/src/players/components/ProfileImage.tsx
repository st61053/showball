import { Card } from "@mui/material";

const ProfileImage = ({ img, width }: { img: string, width: number }) => {
    return (
        <Card sx={{
            width: width,
            height: width,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}
        >
            {<img src={img} alt="kozel" width={"100%"} height={"100%"}></img>}
        </Card>
    );
}

export default ProfileImage;