import { useRouter } from 'next/router';


const privateAuth = (WrappedComponent) => {
    return (props) => {
        if (typeof window !== 'undefined'){
            const router = useRouter();
            const accessToken = localStorage.getItem('accessToken')
            if(!accessToken){
                router.push('/login');
                return null
            }

            return <WrappedComponent {...props} />
        }   
        return null
    }
}

export default privateAuth
