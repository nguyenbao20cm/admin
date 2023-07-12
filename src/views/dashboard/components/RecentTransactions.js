import React from 'react';
import DashboardCard from '../../../components/shared/DashboardCard1';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { useEffect } from 'react';
import { variable } from '../../../Variable';

import { Link, Typography } from '@mui/material';

const RecentTransactions = () => {
  const getToken = (() => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
  })
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  var [products, setInvoiceTotalMonth] = React.useState([]);
  useEffect(() => {
    const token = getToken();
    fetch(variable.API_URL + "HistoryAccount/GetHistoryAllAccount", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
    })
      .then(response => response.json())
      .then(data => {
        setInvoiceTotalMonth(data)
      })
  }, []);
  const DatetimeFormat = ((e) => {
    const abc = new Date(e)
    var day = abc.getDate() + "/";
    var month = abc.getMonth() + 1 + "/";
    var year = abc.getFullYear()
    let format4 = day + month + year;
    return format4;
  })
  return (
    <DashboardCard title="Các thao tác gần đây">
      <>

        <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: '-40px',
            '& .MuiTimelineConnector-root': {
              width: '1px',
              backgroundColor: '#efefef'
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          <div style={{ marginTop: 20 }}></div>
          {products.slice(0, 2).map((dep) => (
            <>
              <TimelineItem>
                <TimelineOppositeContent>{DatetimeFormat(dep.datetime)}</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="secondary" variant="outlined" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{dep.content}</TimelineContent>
              </TimelineItem>
            </>
          )
          )}
          {products.slice(2, 4).map((dep) => (
            <>
              <TimelineItem>
                <TimelineOppositeContent>{DatetimeFormat(dep.datetime)}</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="success" variant="outlined" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{dep.content}</TimelineContent>
              </TimelineItem>
            </>
          )
          )}
          {products.slice(4, 6).map((dep) => (
            <>
              <TimelineItem>
                <TimelineOppositeContent>{DatetimeFormat(dep.datetime)}</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="warning" variant="outlined" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{dep.content}</TimelineContent>
              </TimelineItem>
            </>
          )
          )}
          {products.slice(6, 8).map((dep) => (
            <>
              <TimelineItem>
                <TimelineOppositeContent>{DatetimeFormat(dep.datetime)}</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="error" variant="outlined" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{dep.content}</TimelineContent>
              </TimelineItem>
            </>
          )
          )}
          {products.slice(8, 10).map((dep) => (
            <>
              <TimelineItem>
                <TimelineOppositeContent>{DatetimeFormat(dep.datetime)}</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="inherit" variant="outlined" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{dep.content}</TimelineContent>
              </TimelineItem>
            </>
          )
          )}
          <TimelineItem>
          </TimelineItem>
          {/* <TimelineItem>
            <TimelineOppositeContent>10:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">New sale recorded</Typography>{' '}
              <Link href="/" underline="none">
                #ML-3467
              </Link>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Payment was made of $64.95 to Michael</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="warning" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">New sale recorded</Typography>{' '}
              <Link href="/" underline="none">
                #ML-3467
              </Link>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="error" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">New arrival recorded</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
            </TimelineSeparator>
            <TimelineContent>Payment Received</TimelineContent>
          </TimelineItem> */}
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentTransactions;
