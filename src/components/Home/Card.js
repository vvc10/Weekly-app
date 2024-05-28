import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import default_img from '../../assets/images/image.png';

const BeerCard = ({ beer }) => {
    // Function to handle image loading error
    const handleImageError = (event) => {
        event.target.src = default_img; // Provide the path to your default image here
    };

    return (
        <Card orientation="horizontal" variant="outlined" sx={{ width: 320 }}>
            <CardOverflow>
                <AspectRatio ratio="1" sx={{ width: 90 }}>
                    <img
                        src={beer.image || default_img}
                        alt={beer.name}
                        loading="lazy"
                        onError={handleImageError} // Handle image loading error
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent >
                <Typography fontWeight="700" textColor="success.plainColor">
                    {beer.name}
                </Typography>
                <Typography level="body-sm">Price: {beer.price}</Typography>
                <Typography level="body-sm">Rating: {beer.rating.average} ({beer.rating.reviews} reviews)</Typography>
            </CardContent>
            <CardOverflow
                variant="soft"
                color="primary"
                sx={{
                    px: 0.2,
                    writingMode: 'vertical-rl',
                    justifyContent: 'center',
                    fontSize: 'xs',
                    fontWeight: 'xl',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                }}
            >
                Beer
            </CardOverflow>
        </Card>
    );
};

export default BeerCard;
