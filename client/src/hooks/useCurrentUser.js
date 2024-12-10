import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const useCurrentUser = (id) => {
    const fetchCurrentUser = () => {
        axios
            .get('http://localhost:5000/api/currentUser/' + id)
            .then((res) => res.data);

        return useQuery({
            queryKey: ['currentUser'],
            queryFn: fetchCurrentUser,
        })
    }
}
export default useCurrentUser;