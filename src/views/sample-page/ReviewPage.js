import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box } from '@mui/material';
import ReviewCRUD from "../../components/container/Review/ReivewCRUD"
import { BackTop } from 'antd';
const ReviewList = () => {
    return (
        <PageContainer title="Đánh giá sản phẩm" description="this is Sample page">
            <div hidden>
                {document.documentElement.scrollTop = 0}
            </div>
            <DashboardCard title="Danh sách các đánh giá">
                <Typography paragraph>
                    <ReviewCRUD />
                </Typography>
            </DashboardCard>  <BackTop />
            <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}>  </strong>
        </PageContainer>
    );
};
export default ReviewList;
