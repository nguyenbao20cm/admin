import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box } from '@mui/material';
import GiaoDich from "../Invoice/GiaoDich"
const ReviewList = () => {
    return (
        <PageContainer title="Sample Page" description="this is Sample page">

            <DashboardCard title="Giảm giá">
                <Typography paragraph>
                    <GiaoDich />
                </Typography>
            </DashboardCard>
        </PageContainer>
    );
};
export default ReviewList;
