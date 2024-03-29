// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import {
  Box,
  Card,
  CardContent,
  Container,
  CardMedia,
  Divider,
  Grid,
  Hidden,
  Skeleton,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Material-UI Icons Imports
import PaymentIcon from '@mui/icons-material/Payment'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

// ** Material Design Icons Imports
import Truck from 'mdi-material-ui/Truck'
import ClockTimeFour from 'mdi-material-ui/ClockTimeFour'

// ** Axios Import
import axios from 'axios'

// React Multi Carousel
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const ImagesBillboard = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  }
]

// ** Styled components
const BoxAdvert = styled(Box)(theme => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100px',
  cursor: 'grab',
  '&:hover': {
    transform: 'scale(1.1)',
    transition: 'all 0.3s ease'
  }
}))

const Billboard = () => {
  const [slidedata, setSlideData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.home_page.allbillboards`)
        setSlideData(response.data.message.Data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // React Multi Carousel Responsive
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 1
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 1
    }
  }

  return (
    <Container maxWidth='xl'>
      {/* ---------- Billboard ---------- */}
      <Box sx={{ width: '100%', marginBottom: '40px' }}>
        <Grid container spacing={4}>
          {/* ---------- Main Billboard ---------- */}
          <Grid item xs={12} md={9}>
            {isLoading ? ( // ตรวจสอบสถานะ isLoading เพื่อแสดงรูปโหลดหรือข้อความแสดงการโหลด
              <Skeleton variant='rectangular' width='100%' height='350px' sx={{ borderRadius: '6px' }} />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '350px',
                  maxHeight: '350px',
                  borderRadius: '6px'
                }}
              >
                <Carousel arrows={false} autoPlaySpeed={3000} infinite showDots responsive={responsive}>
                  {/* ##### Image ##### */}
                  {slidedata && slidedata.length > 0 ? (
                    slidedata.map((billboard, index) => (
                      <CardMedia
                        key={index}
                        component='img'
                        height='350px'
                        image={`imgBillboard/${billboard.bill_name}`}
                        alt={billboard.bill_name}
                        sx={{
                          width: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          borderRadius: '6px'
                        }}
                      />
                    ))
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: '350px',
                        maxHeight: '350px',
                        borderRadius: '6px',
                        backgroundColor: '#3A46A7',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant='h6' color='#fff'>
                        No Image
                      </Typography>
                    </Box>
                  )}
                </Carousel>
              </Box>
            )}
          </Grid>
          {/* ---------- Sub Billboard ---------- */}
          <Grid item xs={12} md={3}>
            <Grid container spacing={2}>
              {/* ---------- Sub Billboard No 1 ---------- */}
              <Grid item xs={12} sm={6} md={12}>
                {isLoading ? ( // ตรวจสอบสถานะ isLoading เพื่อแสดงรูปโหลดหรือข้อความแสดงการโหลด
                  <Skeleton variant='rectangular' width='100%' height='170px' sx={{ borderRadius: '6px' }} />
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      height: '170px',
                      maxHeight: '170px',
                      borderRadius: '6px',
                      backgroundColor: '#3A46A7'
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '170px',
                        maxHeight: '170px',
                        borderRadius: '6px',
                        backgroundImage: 'url(/imgBillboard/Nodata2.png)',
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      {/* <Typography variant='h6' color='#fff'>
                        No Image
                      </Typography> */}
                    </Box>
                  </Box>
                )}
              </Grid>
              {/* ---------- Sub Billboard No 2 ---------- */}
              <Grid item xs={12} sm={6} md={12}>
                {isLoading ? ( // ตรวจสอบสถานะ isLoading เพื่อแสดงรูปโหลดหรือข้อความแสดงการโหลด
                  <Skeleton variant='rectangular' width='100%' height='170px' sx={{ borderRadius: '6px' }} />
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      height: '170px',
                      maxHeight: '170px',
                      borderRadius: '6px',
                      backgroundColor: '#3A46A7'
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '170px',
                        maxHeight: '170px',
                        borderRadius: '6px',
                        backgroundImage: 'url(/imgBillboard/Nodata2.png)',
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      {/* <Typography variant='h6' color='#fff'>
                        No Image
                      </Typography> */}
                    </Box>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* ---------- Advert ---------- */}
      <Hidden mdDown>
        <Box sx={{ width: '100%', height: '100%' }}>
          <Card variant='outlined' sx={{ height: '100px' }}>
            <Grid container direction='row' justifyContent='space-around'>
              <Grid item>
                <BoxAdvert>
                  <Truck sx={{ fontSize: '50px', color: '#000', marginRight: 3 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h6' color='#000'>
                      Fast Delivery
                    </Typography>
                    <Typography variant='body1'>Start from $ 10</Typography>
                  </Box>
                </BoxAdvert>
              </Grid>
              <Divider orientation='vertical' flexItem sx={{ border: 1 }} />
              <Grid item>
                <BoxAdvert>
                  <MonetizationOnIcon sx={{ fontSize: '50px', color: '#000', marginRight: 3 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h6' color='#000'>
                      Money Guarantee
                    </Typography>
                    <Typography variant='body1'>7 Days Back</Typography>
                  </Box>
                </BoxAdvert>
              </Grid>
              <Divider orientation='vertical' flexItem sx={{ border: 1 }} />
              <Grid item>
                <BoxAdvert>
                  <ClockTimeFour sx={{ fontSize: '50px', color: '#000', marginRight: 3 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h6' color='#000'>
                      365 Days
                    </Typography>
                    <Typography variant='body1'>For free return</Typography>
                  </Box>
                </BoxAdvert>
              </Grid>
              <Divider orientation='vertical' flexItem sx={{ border: 1 }} />
              <Grid item>
                <BoxAdvert>
                  <PaymentIcon sx={{ fontSize: '50px', color: '#000', marginRight: 3 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h6' color='#000'>
                      Payment
                    </Typography>
                    <Typography variant='body1'>Secure system</Typography>
                  </Box>
                </BoxAdvert>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Hidden>
    </Container>
  )
}

export default Billboard
