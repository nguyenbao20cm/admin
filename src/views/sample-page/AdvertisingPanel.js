import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box } from '@mui/material';
import AdvertisingPanel from "../../components/container/AdvertisingPanel/AdvertisingPanelCRUD"
import { BackTop } from 'antd';
const ReviewList = () => {
    return (
        <PageContainer title="Banner quảng cáo" description="this is Sample page">

            <DashboardCard title="Banner quảng cáo">
                <Typography paragraph>
                    <AdvertisingPanel />
                </Typography>
              
            </DashboardCard>
        </PageContainer>

    );
};
export default ReviewList;
