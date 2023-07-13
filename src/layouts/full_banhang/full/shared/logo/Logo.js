import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
import { useState, useEffect } from "react"
import { variable } from "../../../../../Variable"
const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  const [data, setdata] = useState([])

  useEffect(() => {
    fetch(variable.API_URL + "Footer/GetFooter", {
      method: "GET",

    })
      .then(response => response.json())
      .then(data => {
        setdata(data)
      })
  }, []);
  return (

    data != null ? <LinkStyled to="/">
      <img style={{ marginLeft: "66px", width: "174", height: 40 }} src={'https://localhost:7067/wwwroot/Image/Footer/' + data.avatar} />
      <h3 width="174" height="26" viewBox="0 0 174 26" fill="none" >
        {data.title}
      </h3>
    </LinkStyled> : null
  )
};

export default Logo;
