import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box } from '@mui/material';
import ReviewCRUD from "../../components/container/Review/ReivewCRUD"
const ReviewList = () => {
    return (
        <PageContainer title="Sample Page" description="this is Sample page">

            <DashboardCard title="Review List">
                <Typography paragraph>
                    <ReviewCRUD />
                </Typography>
            </DashboardCard>
        </PageContainer>
    );
};
export default ReviewList;
