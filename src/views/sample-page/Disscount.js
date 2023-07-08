import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box } from '@mui/material';
import Disscount from "../../components/container/Disscount/DisscountCRUD"
import { BackTop } from 'antd';
const ReviewList = () => {
    return (
        <PageContainer title="Sample Page" description="this is Sample page">

            <DashboardCard title="Giảm giá">
                <Typography paragraph>
                    <Disscount />
                </Typography>
            </DashboardCard>  <BackTop />
            <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}>  </strong>
        </PageContainer>
    );
};
export default ReviewList;
