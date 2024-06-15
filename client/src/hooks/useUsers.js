import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUsers = () => {
    const fetchUsers = () =>
        axios
            .get('http://192.168.1.19:5000/user')
            .then((res) => res.data);

    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers
    })
}
export default useUsers;