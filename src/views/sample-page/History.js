import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box } from '@mui/material';
import History from "../History/History"
import { BackTop } from 'antd';
const ReviewList = () => {
    return (
        <PageContainer title="Lịch sử thao tác " description="this is Sample page">

            <DashboardCard title="Lịch sử thao tác người dùng">
                <div hidden>
                    {document.documentElement.scrollTop = 0}
                </div>
                <Typography paragraph>
                    <History />
                </Typography>
            </DashboardCard>  <BackTop />
            <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}>  </strong>
        </PageContainer>
    );
};
export default ReviewList;
