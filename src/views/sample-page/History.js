import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box } from '@mui/material';
import History from "../History/History"
const ReviewList = () => {
    return (
        <PageContainer title="Lịch sử thao tác " description="this is Sample page">

            <DashboardCard title="Lịch sử thao tác người dùng">
                <Typography paragraph>
                    <History />
                </Typography>
            </DashboardCard>
        </PageContainer>
    );
};
export default ReviewList;
