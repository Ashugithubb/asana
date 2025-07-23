'use client';

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
import { AllTeams } from "../redux/slice/team.slice";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ShowAllTeam() {
  const dispatch = useAppDispatch();
  const { teams, loading, error } = useAppSelector((state) => state.team);
  console.log("inside component ", teams)
  const router = useRouter();

  useEffect(() => {
    dispatch(AllTeams());
  }, [dispatch]);

  if (loading) return <Typography>Loading teams...</Typography>;
  // if (error) return <Typography color="error">{error}</Typography>;
  if (!teams) return <Typography ml={70}>no team found</Typography>
  const handelGroupClick=(teamId:number)=>{
    router.push(`home/${teamId}`);
  }
  return (
    <>
      <Box sx={{display:"flex",justifyContent:"center", flexDirection:"column",mt: 2}}>
        <Typography>All Teams</Typography>
        {teams.map((t) => (
          <Box onClick={()=>handelGroupClick(t.teamId)} key={t.teamId} p={2} border={1} borderRadius={2} mb={2} width={400}>
            <Typography variant="h6">{t.team_name}</Typography>
            <Typography variant="body2">
              Created At: {new Date(t.createdAt).toLocaleString()}

            </Typography>
          </Box>

        ))}
      </Box>
    </>
  );
}
