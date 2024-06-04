import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import default_img from '../../assets/images/image.png';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

const BeerCard = ({ beer, onAddToBookshelf }) => {
    const handleImageError = (event) => {
        event.target.src = default_img;
    };

    const handleAddToBookshelf = () => {
        onAddToBookshelf(beer);
    };

    return (
        <Box sx={{ justifyContent: 'flex-start' }}>
            <Card orientation="vertical" variant="outlined" sx={{ width: 320 }}>
                <CardOverflow>
                    <AspectRatio ratio="1" sx={{ width: 90 }}>
                        <img
                            src={beer.image || default_img}
                            alt={beer.title}
                            loading="lazy"
                            onError={handleImageError}
                        />
                    </AspectRatio>
                </CardOverflow>

                <CardContent justifyContent="flex-start" textAlign="left" alignItems="left">
                    <Typography fontWeight="900" textColor="success.plainColor">
                        <b>{beer.title}</b></Typography>
                    <Typography level="body-sm">
                        <i>Edition  &nbsp;<b>{beer.edition_count}</b></i></Typography>
                    <Typography level="body-sm">Author: {beer.author_name ? beer.author_name.join(', ') : 'Unknown'}</Typography>
                    <Typography level="body-sm">Published on {beer.first_publish_year}</Typography>
                </CardContent>
                <CardOverflow
                    variant="soft"
                    color="primary"
                    sx={{
                        px: 1,
                        py: 2,
                        writingMode: 'horizontal-rl',
                        justifyContent: 'center',
                        fontSize: 'xs',
                        fontWeight: 'xl',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        borderLeft: '1px solid',
                        borderColor: 'divider',
                        cursor: 'pointer',
                    }}
                    onClick={handleAddToBookshelf}
                >
                    <Button onClick={handleAddToBookshelf}>Add</Button>
                </CardOverflow>
            </Card>
        </Box>
    );
};

export default BeerCard;
