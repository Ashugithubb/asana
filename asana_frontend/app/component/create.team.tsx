'use client'
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const teamSchema = z.object({
    team_name: z.string().min(1, { message: "Team Name can't be empty" }),
    team_lead: z.string().min(1, { message: "Assign Team Lead" }),
})
type teamFormSchema = z.infer<typeof teamSchema>
interface User {
    userId: number;
    first_name: string;
    last_name: string;
    Organization: string;
    role: string;
}

export default function Team() {
    const [openTeam, setOpenTeam] = useState(false);
    const [serachLead, setSearchLead] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [leadId,setLeadId] = useState<number>();

    const { register, handleSubmit, formState: { errors } } = useForm<teamFormSchema>({
        resolver: zodResolver(teamSchema)
    })

    const handelClick = () => {
        setOpenTeam(!openTeam)
    }


    useEffect(() => {
        const debounce = setTimeout(async () => {
            if (serachLead.trim() === '') {
                setUsers([]);
                return;
            }
            try {
                const res = await axios.get(`http://localhost:3001/user/search?name=${serachLead}`, {
                    withCredentials: true,
                });
                setUsers(res.data);
                console.log(users)
            } catch (error) {
                console.log("Fetch error:", error);
            }
        }, 2000);

        return () => clearTimeout(debounce);
    }, [serachLead]);



    const onSubmit = async (data: teamFormSchema) => {
        const payload = {
            team_name:data.team_name,
            team_leadId:leadId
        }
        try{
            const res = axios.post('http://localhost:3001/team',payload,
                {
                    withCredentials:true
                }
              
            )
              toast(`${data.team_name} Team Created`)
        }
        catch(error){
            toast.error("Unable to  Create Team");
        }
     }

    return (
        <>
            <Button onClick={handelClick} variant="contained" sx={{width:"6+0px", height:"50px"}}>Create Team<AddIcon /></Button>
            <ToastContainer/>
            {openTeam && (

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Box sx={{
                        mt: 2,
                        display: "flex", flexDirection: "column", gap: 1, width: '400px', border: "2px solid black",
                        borderRadius: "8px",
                        padding: 2,
                    }}>
                        <TextField
                            label="Team Name"
                            {...register('team_name')}
                            error={!!errors.team_name}
                            helperText={errors.team_name?.message}
                            margin="normal"
                        />
                        <TextField
                            label="Search Team Lead"
                            {...register('team_lead')}
                            error={!!errors.team_lead}
                            helperText={errors.team_lead?.message}
                            margin="normal"
                            value={serachLead}
                            onChange={(e) => setSearchLead(e.target.value)}
                        />
                    </Box>
                    {users.map(user => (
                        <Box key={user.userId} sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 1, mt: 2 , width:"400px"}}>
                           
                            <Typography onClick ={()=>{setSearchLead(user.first_name+ user.last_name);setLeadId(user.userId)}} variant="h6">
                                {user.first_name} {user.last_name} Id: {`${user.userId}`}
                            </Typography>
                        </Box>
                    ))}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, ml: 43 }}
                    >
                        Create
                    </Button>

                </form>

            )}
        </>
    )
}