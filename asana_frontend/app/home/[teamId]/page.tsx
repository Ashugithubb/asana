'use client'
import Navbar from "@/app/component/navbar";
import { fetchTeamMebers } from "@/app/redux/async/team.members";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook";
import { Box, Button, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";
import { number } from "zod";

export default function TeamDetails() {
    const team = useAppSelector((state) => state.team.teams)
    const param = useParams();
    const teamId = param.teamId;
    const num = Number(teamId);
    const teamDetails = team?.find((t) => t.teamId === num);
    const leadId = teamDetails?.team_leadId;

    const dispatch = useAppDispatch();

    const [openMember, setOpenMember] = useState(false)
    const [members, setMembers] = useState<any>([])

    const handleMemberClick = async () => {
        const result = await dispatch(fetchTeamMebers(num));
        console.log(result.payload);
        setMembers(result.payload);
        setOpenMember(true); // show members
    };

    return (
        <>
            <Navbar />

            <Typography ml={90} variant="h4">Team: {teamDetails?.team_name}</Typography>
            <Button onClick={handleMemberClick} variant="contained">See All Members</Button>
            {
                openMember && (
                    members.map((m: any) => (
                        <Box key={m.member_Id} p={2} border={1} borderRadius={2} m={1} width={200}>
                            <Typography variant="h6">
                                {m.user.first_name} {m.user.last_name}
                            </Typography>
                           {m.user.userId===leadId&&(<Typography>Team Lead</Typography>)}
                        </Box>
                    ))
                )
            }

        </>
    )
}