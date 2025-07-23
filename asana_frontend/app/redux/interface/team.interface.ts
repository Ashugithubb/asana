export interface TeamInfo{
  teamId: number;
  team_name:string
  team_leadId:number
  createdAt: string;
}

export interface TeamState {
  loading: boolean;
  error: string | null;
  teams: TeamInfo[]| null;
}