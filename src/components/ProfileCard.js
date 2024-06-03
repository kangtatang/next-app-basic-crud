import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ProfileCard = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          John Doe
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: john.doe@example.com
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
