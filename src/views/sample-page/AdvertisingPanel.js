import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box } from '@mui/material';
import AdvertisingPanel from "../../components/container/AdvertisingPanel/AdvertisingPanelCRUD"
const ReviewList = () => {
    return (
        <PageContainer title="Sample Page" description="this is Sample page">

            <DashboardCard title="AdvertisingPanel List">
                <Typography paragraph>
                    <AdvertisingPanel />
                </Typography>
            </DashboardCard>
        </PageContainer>
    );
};
export default ReviewList;
