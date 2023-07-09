import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box } from '@mui/material';
import GiaoDich from "../Invoice/GiaoDich"
import { BackTop } from 'antd';
const ReviewList = () => {
    return (
        <PageContainer title="Giao Dịch VNPay" description="this is Sample page">

            <DashboardCard title="Giao Dịch VNPay">
                <div hidden>
                    {document.documentElement.scrollTop = 0}
                </div>
                <Typography paragraph>
                    <GiaoDich />
                </Typography>
            </DashboardCard>  <BackTop />
            <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}>  </strong>
        </PageContainer>
    );
};
export default ReviewList;
