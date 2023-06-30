import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const ReviewList = () => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        <div style={{ marginLeft: 21, marginTop: 20 }}>
            <PageContainer title="TaiKhoan" description="this is Sample page" >
                <DashboardCard title="Thông tin tài khoản">
                    <Box>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <DashboardCard height="670" title="Mật khẩu" >
                                    <div>
                                        <div style={{ borderRadius: "15px", padding: 5, border: "2px solid darkgrey" }}>
                                            <span >
                                                Mật khẩu cũ
                                            </span>
                                            <input type='text' className='form-control'
                                            />
                                            <span >
                                                Mật khẩu mới
                                            </span>
                                            <input type='text' className='form-control'
                                            />
                                            <span >
                                                Xác nhận mật khẩu mới
                                            </span>
                                            <input type='text' className='form-control'
                                            />
                                            <div class="modal-footer">
                                                <button type='button' className='btn btn-primary float-start'>Thay đổi</button>
                                            </div>
                                        </div>
                                    </div>
                                </DashboardCard>
                            </Grid>
                            <Grid item xs={6}>
                                <DashboardCard height="670" title="Thông tin cá nhân" >
                                    <div>
                                        <div style={{ borderRadius: "15px", padding: 5, border: "2px solid darkgrey" }}>
                                            <span >
                                                Email
                                            </span>
                                            <input type='text' className='form-control'
                                            />
                                            <span >
                                                Số điện thoại
                                            </span>
                                            <input type='text' className='form-control'
                                            />
                                            <span >
                                                Địa chỉ
                                            </span>
                                            <input type='text' className='form-control'
                                            />
                                            <span >
                                                Tên người dùng
                                            </span>
                                            <input type='text' className='form-control'
                                            />
                                            <span >
                                                Ảnh đại diện
                                            </span>
                                            <input type='file' className='form-control'
                                            />
                                            <div class="modal-footer">
                                                <button type='button' className='btn btn-primary float-start'>Thay đổi</button>
                                            </div>
                                        </div>
                                    </div>
                                </DashboardCard>
                            </Grid>

                        </Grid>
                    </Box>
                </DashboardCard>
            </PageContainer>
        </div>
    );
};
export default ReviewList;
