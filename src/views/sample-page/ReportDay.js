import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import ReportDay from "../ReportDay/ReportDayCRUD"
const SamplePage = () => {
    return (
        <PageContainer title="Sample Page" description="this is Sample page">

            <DashboardCard title="Danh sách sản phẩm ">
                <Typography paragraph>
                    <ReportDay />
                </Typography>
            </DashboardCard>
        </PageContainer>
    );
};

export default SamplePage;
