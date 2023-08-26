import { useState, useEffect } from 'react';
import supabase from "../Database/supabase"


const useFetchData = (table) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from(table)
                    .select();

                if (error) {
                    throw new Error(error.message);
                }

                setData(data);
                setError(null);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                console.log(error)
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [table]);

    return { data, loading, error };
};


export default useFetchData