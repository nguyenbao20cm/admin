import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { BackTop } from 'antd';
import ReportDay from "../ReportDay/ReportDayCRUD"
const SamplePage = () => {
    return (
        <PageContainer title="Báo cáo theo ngày" description="this is Sample page">
            <div hidden>
                {document.documentElement.scrollTop = 0}
            </div>
            <DashboardCard title="Báo cáo chi tiết">
                <Typography paragraph>
                    <ReportDay />
                </Typography>
            </DashboardCard>  <BackTop />
            <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}>  </strong>
        </PageContainer>
    );
};

export default SamplePage;
