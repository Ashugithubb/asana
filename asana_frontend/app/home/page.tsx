'use client'
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook"
import { UserInfo } from "../redux/slice/user.slice";
import { Box, Typography } from "@mui/material";
import Navbar from "../component/navbar";
import Team from "../component/create.team";
import ShowAllTeam from "../component/show.team";

export default function Home() {
    const dispatch = useAppDispatch();
    const profile = useAppSelector((state)=>state.user.profile);
    useEffect(()=>{
            setTimeout(()=>{
                dispatch(UserInfo())
            },3000)
    },[]);
return (
    <>
    <Navbar/>
    <Typography sx={{display:"flex", justifyContent:"center"}} variant='h6'>Admin DashBoard {profile?.first_name}</Typography>
      <Box sx={{display:"flex", gap:3}}>
    <Team/>
    <ShowAllTeam/></Box>
    </>
    )
}