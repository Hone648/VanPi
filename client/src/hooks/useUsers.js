import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUsers = () => {
    const fetchUsers = () =>
        axios
            .get('http://localhost:5000/api/user')
            .then((res) => res.data);

    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 2000,
        refetchInterval: 2000,

    })
}
export default useUsers;