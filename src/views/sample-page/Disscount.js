import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box } from '@mui/material';
import Disscount from "../../components/container/Disscount/DisscountCRUD"
const ReviewList = () => {
    return (
        <PageContainer title="Sample Page" description="this is Sample page">

            <DashboardCard title="Disscount List">
                <Typography paragraph>
                    <Disscount />
                </Typography>
            </DashboardCard>
        </PageContainer>
    );
};
export default ReviewList;
